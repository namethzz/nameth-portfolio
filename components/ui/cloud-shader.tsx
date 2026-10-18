"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type CloudShaderProps = {
  className?: string;
  children?: React.ReactNode;
  /** Animation speed multiplier. 1 = default drift. */
  speed?: number;
  /** Number of clouds (1-6). */
  count?: number;
  /** Cloud tint color (hex or rgb string). */
  cloudColor?: string;
  /** Sky color at the top (hex or rgb string). */
  skyTopColor?: string;
  /** Sky color at the bottom (hex or rgb string). */
  skyBottomColor?: string;
  /**
   * Optional scroll position in screen heights, read every frame. Clouds rise
   * with it at a speed set by their depth (near clouds move faster), so
   * scrolling feels like moving down through the sky.
   */
  scroll?: () => number;
  /**
   * Optional time of day, read every frame: 0 = the colours above, 0.45 =
   * dusk, 0.7 = twilight, 1 = night in space. The sun sinks toward the edge, clouds fade,
   * stars come out and the glow of Earth's limb rises at the bottom.
   */
  phase?: () => number;
};

const DUSK = { top: "#2c3a6e", bottom: "#e58f5c", cloud: "#f6c8a8" };
// Deep blue between dusk and night, so orange never mixes into brown.
const TWILIGHT = { top: "#0d1838", bottom: "#33447e", cloud: "#8d8fb4" };
const NIGHT = { top: "#03060f", bottom: "#0a1530", cloud: "#2a3550" };

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

// Original cloud shader for Aceternity UI.
// Each cloud is an asymmetric envelope (dome top, flat base) filled with
// domain-warped billow noise. A second density sample above the pixel
// approximates self-shadowing. Clouds drift horizontally and wrap around.
const FRAG = `
precision highp float;

varying vec2 v_uv;

uniform vec2 u_res;
uniform float u_time;
uniform float u_count;
uniform float u_scroll;
uniform float u_night;
uniform vec3 u_cloud;
uniform vec3 u_skyTop;
uniform vec3 u_skyBottom;

const mat2 R = mat2(0.80, 0.60, -0.60, 0.80);

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(41.31, 289.17))) * 26737.367);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    sum += amp * vnoise(p);
    p = R * p * 2.03 + 19.19;
    amp *= 0.5;
  }
  return sum;
}

// billow noise: sharp puffy ridges, like cauliflower cloud tops
float billow(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    sum += amp * (1.0 - abs(2.0 * vnoise(p) - 1.0));
    p = R * p * 2.11 + 13.37;
    amp *= 0.5;
  }
  return sum;
}

// raw density for one cloud at point p
float cloudDensity(vec2 p, vec2 c, vec2 r, float seed, float t) {
  vec2 q = p - c;

  // envelope: dome above the center, flat base below
  float ry = q.y > 0.0 ? r.y : r.y * 0.42;
  float env = 1.0 - length(vec2(q.x / r.x, q.y / ry));
  if (env < -0.35) return 0.0;

  // domain-warped billow detail, moves with the cloud, evolves slowly
  vec2 dp = q * (2.4 / r.x) + seed;
  dp += 0.6 * vec2(
    fbm(dp * 1.4 + t * 0.04),
    fbm(dp * 1.4 + 7.7 - t * 0.03)
  );
  float detail = billow(dp * 1.6);

  return env + (detail - 0.62) * 0.62;
}

// shades one cloud and blends it over the current color
vec3 shadeCloud(vec3 color, vec3 sky, vec2 p, vec2 c, vec2 r, float seed, float t, float dist) {
  float d = cloudDensity(p, c, r, seed, t);
  if (d < 0.02) return color;

  // sample density toward the sun (straight up) for self-shadowing
  float dUp = cloudDensity(p + vec2(0.0, r.y * 0.55), c, r, seed, t);
  float occl = clamp((dUp - d) * 1.1 + d * 0.55, 0.0, 1.0);

  vec3 lit = u_cloud * 1.04;
  vec3 shadow = mix(u_cloud * 0.60, sky, 0.38);
  vec3 cloudCol = mix(lit, shadow, occl * 0.85);

  float alpha = smoothstep(0.02, 0.38, d);

  // silver lining on thin edges
  float rim = smoothstep(0.02, 0.14, d) * (1.0 - smoothstep(0.14, 0.40, d));
  cloudCol += rim * 0.10;

  // atmospheric perspective: far clouds fade into the sky
  cloudCol = mix(cloudCol, sky, dist * 0.35);
  alpha *= mix(1.0, 0.8, dist);
  // clouds thin out and vanish as the sky turns to space
  alpha *= 1.0 - smoothstep(0.5, 0.88, u_night);

  return mix(color, cloudCol, alpha);
}

// one drifting cloud: horizontal wrap + gentle vertical bob
vec3 cloudPass(vec3 color, vec3 sky, vec2 p, float aspect, float t,
               float spd, float phase, float y, vec2 r, float seed, float dist) {
  float cx = mix(-r.x - 0.25, aspect + r.x + 0.25, fract(t * spd + phase));
  // scroll parallax: far clouds (dist 1) rise slowly, near ones (dist 0) fast;
  // wrap through [-0.32, 1.32) so they leave and re-enter just off screen
  float cy = y + u_scroll * mix(0.52, 0.14, dist);
  cy = mod(cy + 0.32, 1.64) - 0.32;
  cy += sin(t * 0.05 + phase * 6.2831) * 0.012;
  return shadeCloud(color, sky, p, vec2(cx, cy), r, seed, t, dist);
}

void main() {
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(v_uv.x * aspect, v_uv.y);
  float t = u_time;

  vec3 sky = mix(u_skyBottom, u_skyTop, v_uv.y);
  vec3 color = sky;

  // faint haze band near the horizon
  color = mix(color, u_skyBottom * 1.06, smoothstep(0.35, 0.0, v_uv.y) * 0.5);

  // soft sun glow: high in the day, sinking toward the edge and warming at
  // dusk, gone by night
  float dusk = clamp(u_night / 0.45, 0.0, 1.0);
  vec2 sunPos = vec2(aspect * mix(0.78, 0.96, dusk), mix(0.92, 0.06, dusk));
  float sunDist = length(p - sunPos);
  vec3 sunCol = mix(vec3(1.0, 0.95, 0.82), vec3(1.0, 0.55, 0.26), dusk);
  float sunGlow = mix(0.28, 0.45, dusk) * (1.0 - smoothstep(0.5, 0.82, u_night));
  color += sunCol * exp(-sunDist * sunDist * mix(5.0, 3.0, dusk)) * sunGlow;

  // thin cirrus streaks, stretched horizontally, high in the sky
  float cirrusBand = smoothstep(0.55, 0.8, v_uv.y) * (1.0 - smoothstep(0.9, 1.0, v_uv.y));
  if (cirrusBand > 0.01) {
    float streak = fbm(vec2(p.x * 1.6 - t * 0.006, (p.y - u_scroll * 0.08) * 12.0));
    float wisp = smoothstep(0.52, 0.78, streak) * cirrusBand;
    color = mix(color, u_cloud * 0.98, wisp * 0.35 * (1.0 - smoothstep(0.45, 0.8, u_night)));
  }

  // stars: two layers of sparse points that twinkle and drift slowly
  float starVis = smoothstep(0.42, 0.95, u_night);
  if (starVis > 0.0) {
    for (int layer = 0; layer < 2; layer++) {
      float scale = layer == 0 ? 70.0 : 150.0;
      vec2 sp = vec2(p.x, p.y + u_scroll * (layer == 0 ? 0.05 : 0.025)) * scale;
      vec2 id = floor(sp);
      vec2 f = fract(sp) - 0.5;
      float h = hash(id + float(layer) * 31.7);
      float threshold = layer == 0 ? 0.972 : 0.955;
      if (h > threshold) {
        vec2 off = (vec2(hash(id + 3.1), hash(id + 7.7)) - 0.5) * 0.6;
        float d = length(f - off);
        float twinkle = 0.65 + 0.35 * sin(t * (1.2 + h * 2.0) + h * 80.0);
        float size = layer == 0 ? 0.11 : 0.07;
        float bright = (h - threshold) / (1.0 - threshold);
        color += mix(vec3(0.75, 0.84, 1.0), vec3(1.0, 0.92, 0.8), hash(id + 9.3))
          * smoothstep(size, 0.0, d) * twinkle * starVis * (0.45 + bright * 0.9);
      }
    }
  }

  // far layer: small, high, slow
  if (u_count > 5.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.006, 0.10, 0.84, vec2(0.20, 0.10), 43.7, 1.0);
  }
  if (u_count > 4.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.008, 0.62, 0.73, vec2(0.24, 0.12), 71.3, 0.85);
  }

  // middle layer
  if (u_count > 3.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.011, 0.33, 0.60, vec2(0.34, 0.16), 17.3, 0.55);
  }
  if (u_count > 2.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.013, 0.80, 0.47, vec2(0.30, 0.15), 29.9, 0.45);
  }

  // near layer: big, low, fast
  if (u_count > 1.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.016, 0.05, 0.35, vec2(0.46, 0.20), 91.1, 0.15);
  }
  color = cloudPass(color, sky, p, aspect, t, 0.020, 0.48, 0.20, vec2(0.56, 0.24), 57.2, 0.0);

  // Earth's limb: a dark curved horizon with a thin blue atmosphere glow,
  // rising into view as the sky becomes space
  float limbVis = smoothstep(0.72, 1.0, u_night);
  if (limbVis > 0.0) {
    vec2 center = vec2(aspect * 0.5, -3.1 - (1.0 - limbVis) * 0.35);
    float edge = length(p - center) - 3.25;
    float glow = exp(-abs(edge) * 55.0) * 0.85 + exp(-max(edge, 0.0) * 7.0) * 0.32;
    color = mix(color, vec3(0.012, 0.03, 0.07), limbVis * smoothstep(0.0, -0.012, edge));
    color += vec3(0.32, 0.66, 1.0) * glow * limbVis;
  }

  gl_FragColor = vec4(color, 1.0);
}
`;

function parseHex(color: string): [number, number, number] {
  const value = color.trim();
  if (value.startsWith("#")) {
    const hex = value.slice(1);
    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16) / 255,
        parseInt(hex[1] + hex[1], 16) / 255,
        parseInt(hex[2] + hex[2], 16) / 255,
      ];
    }
    return [
      parseInt(hex.slice(0, 2), 16) / 255,
      parseInt(hex.slice(2, 4), 16) / 255,
      parseInt(hex.slice(4, 6), 16) / 255,
    ];
  }
  const rgb = value.match(/[\d.]+/g);
  if (rgb && rgb.length >= 3) {
    return [Number(rgb[0]) / 255, Number(rgb[1]) / 255, Number(rgb[2]) / 255];
  }
  return [0.95, 0.95, 0.95];
}

type RGB = [number, number, number];
const mixRGB = (a: RGB, b: RGB, k: number): RGB => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
const ease = (k: number) => k * k * (3 - 2 * k);

/** Day colour → dusk (0.45) → twilight (0.7) → night (1). */
function blend(day: RGB, dusk: string, twilight: string, night: string, k: number): RGB {
  if (k < 0.45) return mixRGB(day, parseHex(dusk), ease(k / 0.45));
  if (k < 0.7) return mixRGB(parseHex(dusk), parseHex(twilight), ease((k - 0.45) / 0.25));
  return mixRGB(parseHex(twilight), parseHex(night), ease((k - 0.7) / 0.3));
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export const CloudShader = ({
  className,
  children,
  speed = 1,
  count = 6,
  cloudColor = "#fbf8f2",
  skyTopColor = "#3876ba",
  skyBottomColor = "#8cbfe8",
  scroll,
  phase,
}: CloudShaderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paramsRef = useRef({
    speed,
    count,
    cloudColor,
    skyTopColor,
    skyBottomColor,
    scroll,
    phase,
  });

  paramsRef.current = {
    speed,
    count,
    cloudColor,
    skyTopColor,
    skyBottomColor,
    scroll,
    phase,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const vert = compile(gl, gl.VERTEX_SHADER, VERT);
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.bindAttribLocation(program, 0, "a_pos");
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const loc = {
      res: gl.getUniformLocation(program, "u_res"),
      time: gl.getUniformLocation(program, "u_time"),
      count: gl.getUniformLocation(program, "u_count"),
      scroll: gl.getUniformLocation(program, "u_scroll"),
      night: gl.getUniformLocation(program, "u_night"),
      cloud: gl.getUniformLocation(program, "u_cloud"),
      skyTop: gl.getUniformLocation(program, "u_skyTop"),
      skyBottom: gl.getUniformLocation(program, "u_skyBottom"),
    };

    let frame = 0;
    let running = true;
    let visible = true;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const w = Math.max(1, Math.floor(width * dpr));
      const h = Math.max(1, Math.floor(height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(loc.res, w, h);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const start = performance.now();
    const draw = (now: number) => {
      if (!running || !visible) return;
      const p = paramsRef.current;
      const elapsed = reduceMotion ? 0 : ((now - start) / 1000) * p.speed;
      const night = p.phase ? Math.min(1, Math.max(0, p.phase())) : 0;
      const cloud = blend(parseHex(p.cloudColor), DUSK.cloud, TWILIGHT.cloud, NIGHT.cloud, night);
      const skyTop = blend(parseHex(p.skyTopColor), DUSK.top, TWILIGHT.top, NIGHT.top, night);
      const skyBottom = blend(parseHex(p.skyBottomColor), DUSK.bottom, TWILIGHT.bottom, NIGHT.bottom, night);
      gl.uniform1f(loc.night, night);

      gl.uniform1f(loc.time, elapsed);
      gl.uniform1f(loc.count, Math.min(6, Math.max(1, p.count)));
      gl.uniform1f(loc.scroll, p.scroll ? p.scroll() : 0);
      gl.uniform3f(loc.cloud, cloud[0], cloud[1], cloud[2]);
      gl.uniform3f(loc.skyTop, skyTop[0], skyTop[1], skyTop[2]);
      gl.uniform3f(loc.skyBottom, skyBottom[0], skyBottom[1], skyBottom[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frame = requestAnimationFrame(draw);
    };

    // Only render while the sky is on screen; a full-screen shader otherwise
    // keeps the GPU busy for the whole visit.
    const visibility = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible) frame = requestAnimationFrame(draw);
      if (!visible) cancelAnimationFrame(frame);
    });
    visibility.observe(canvas);

    frame = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative h-full min-h-80 w-full overflow-hidden",
        className,
      )}
      // Shown if WebGL is unavailable.
      style={{ background: `linear-gradient(${skyTopColor}, ${skyBottomColor})` }}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      {children ? (
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default CloudShader;
