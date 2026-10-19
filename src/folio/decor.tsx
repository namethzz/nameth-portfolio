import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/*
 * The print layout's ornaments, drawn as SVG so they stay sharp at any size
 * and take the section's colour: a wireframe torus, a globe, topographic
 * contour lines, block arrows and the poster's flower.
 */

/**
 * A wireframe torus that slowly turns in 3D while it is on screen. Faces
 * pointing away from the viewer are left out, so it reads as a solid ring
 * like the print version.
 */
export function Torus({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { margin: "120px" });
  const reduce = useReducedMotion();
  const [angle, setAngle] = useState(0.6);

  useEffect(() => {
    if (!inView || reduce) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      setAngle((value) => value + (now - last) * 0.00018);
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce]);

  const path = useMemo(() => torusPath(angle), [angle]);
  return (
    <svg ref={ref} className={cn("fo-torus", className)} viewBox="-1.5 -0.95 3 1.9" aria-hidden="true" focusable="false">
      <path d={path} />
    </svg>
  );
}

function torusPath(spin: number) {
  const R = 1, r = 0.46, U = 30, V = 16;
  const tilt = 1.08; // radians the ring leans back
  const ct = Math.cos(tilt), st = Math.sin(tilt);
  const yaw = -0.32, cy = Math.cos(yaw), sy = Math.sin(yaw);
  const points: { x: number; y: number; z: number }[][] = [];
  for (let i = 0; i <= U; i += 1) {
    const u = (i / U) * Math.PI * 2 + spin;
    const row: { x: number; y: number; z: number }[] = [];
    for (let j = 0; j <= V; j += 1) {
      const v = (j / V) * Math.PI * 2;
      // Point on the torus, and the part of its normal that faces the viewer.
      const ny = Math.cos(v) * Math.sin(u), nz = Math.sin(v);
      const px = (R + r * Math.cos(v)) * Math.cos(u), py = (R + r * Math.cos(v)) * Math.sin(u), pz = r * Math.sin(v);
      // Lean back around x, then turn a little around the view axis.
      const ty = py * ct - pz * st;
      const x = px * cy - ty * sy, y = px * sy + ty * cy;
      row.push({ x, y, z: ny * st + nz * ct });
    }
    points.push(row);
  }
  const f = (n: number) => n.toFixed(3);
  let d = "";
  const segment = (a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }) => {
    if (a.z + b.z > -0.12) d += `M${f(a.x)} ${f(a.y)}L${f(b.x)} ${f(b.y)}`;
  };
  for (let i = 0; i < U; i += 1) {
    for (let j = 0; j < V; j += 1) {
      segment(points[i][j], points[i][j + 1]);
      segment(points[i][j], points[i + 1][j]);
    }
  }
  return d;
}

/** The flattened globe badge; its meridians turn. */
export function Globe({ className }: { className?: string }) {
  return (
    <svg className={cn("fo-globe", className)} viewBox="-52 -26 104 52" aria-hidden="true" focusable="false">
      <ellipse rx="49" ry="23" />
      <line x1="-49" x2="49" y1="0" y2="0" />
      <path d="M-44 -10 H44 M-44 10 H44" />
      <line x1="0" x2="0" y1="-23" y2="23" />
      {[0, 1, 2].map((index) => (
        <ellipse key={index} className="fo-globe-meridian" rx="49" ry="23" style={{ animationDelay: `${index * -1.6}s` }} />
      ))}
    </svg>
  );
}

/**
 * Topographic contour lines: nested, wobbling closed curves that draw
 * themselves in when they come into view.
 */
export function Contours({ className, rings = 9, seed = 1 }: { className?: string; rings?: number; seed?: number }) {
  const reduce = useReducedMotion();
  const paths = useMemo(() => {
    const result: string[] = [];
    for (let ring = 1; ring <= rings; ring += 1) {
      const k = ring / rings;
      const steps = 96;
      let d = "";
      for (let s = 0; s <= steps; s += 1) {
        const t = (s / steps) * Math.PI * 2;
        const wobble =
          1 +
          0.14 * k * Math.sin(2 * t + seed) +
          0.09 * k * Math.sin(3 * t + seed * 2.1 + ring * 0.25) +
          0.05 * Math.sin(5 * t + seed * 0.7 + ring * 0.6);
        const radius = 8 + 88 * k * wobble;
        const cx = 6 * (1 - k) * Math.cos(seed), cy = 6 * (1 - k) * Math.sin(seed);
        d += `${s ? "L" : "M"}${(cx + radius * Math.cos(t)).toFixed(1)} ${(cy + radius * 0.92 * Math.sin(t)).toFixed(1)}`;
      }
      result.push(d + "Z");
    }
    return result;
  }, [rings, seed]);
  return (
    <svg className={cn("fo-contours", className)} viewBox="-120 -120 240 240" aria-hidden="true" focusable="false">
      {paths.map((d, index) => (
        <motion.path
          key={index}
          d={d}
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: index * 0.08, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

/** A chunky block arrow pointing up and to the right (rotate it for other directions). */
export function BlockArrow({ className }: { className?: string }) {
  return (
    <svg className={cn("fo-arrow", className)} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M18 0H64V46L52 34V20L10 62 2 54 44 12H30Z" />
    </svg>
  );
}

/** Eight rounded petals around a small star-shaped gap, like the poster's flowers. */
export function Flower({ className }: { className?: string }) {
  const petal = "M0 -6 C -5 -24 -24 -54 -24 -78 A 24 24 0 1 1 24 -78 C 24 -54 5 -24 0 -6 Z";
  return (
    <svg className={cn("fo-flower-svg", className)} viewBox="-104 -104 208 208" aria-hidden="true" focusable="false">
      {Array.from({ length: 8 }, (_, index) => (
        <path key={index} d={petal} transform={`rotate(${index * 45})`} />
      ))}
    </svg>
  );
}

/**
 * A slanted band of giant words that scrolls sideways forever, with the
 * poster's flower between words. Purely decorative.
 */
export function Marquee({ items, reverse = false, className }: { items: readonly string[]; reverse?: boolean; className?: string }) {
  return (
    <div className={cn("fo-marquee", reverse && "is-reverse", className)} aria-hidden="true">
      <div className="fo-marquee-track">
        {[0, 1].map((copy) => (
          <span className="fo-marquee-group" key={copy}>
            {items.map((item) => (
              <span className="fo-marquee-item" key={item}>
                {item}
                <Flower className="fo-marquee-star" />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Fine wavy security lines, like the background of an ID page. */
export function Guilloche({ className }: { className?: string }) {
  const lines = useMemo(() => {
    const result: string[] = [];
    for (let line = 0; line < 22; line += 1) {
      let d = "";
      for (let x = 0; x <= 200; x += 4) {
        const y = 6 + line * 9 + Math.sin(x / 14 + line * 0.55) * 5 + Math.sin(x / 31 - line * 0.3) * 3;
        d += `${x ? "L" : "M"}${x} ${y.toFixed(1)}`;
      }
      result.push(d);
    }
    return result;
  }, []);
  return (
    <svg className={cn("fo-guilloche", className)} viewBox="0 0 200 200" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {lines.map((d, index) => <path key={index} d={d} />)}
    </svg>
  );
}

/** Bars drawn from the code's characters, so the sticker reads like a real label. */
export function Barcode({ code }: { code: string }) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (const char of `*${code}*`) {
    const value = char.charCodeAt(0);
    for (let bit = 0; bit < 5; bit += 1) {
      const wide = (value >> bit) & 1;
      const w = wide ? 2.4 : 1;
      bars.push({ x, w });
      x += w + (bit % 2 ? 1.6 : 1);
    }
    x += 1.2;
  }
  return (
    <svg viewBox={`0 0 ${x} 30`} preserveAspectRatio="none" focusable="false">
      {bars.map((bar, index) => <rect key={index} x={bar.x} y={0} width={bar.w} height={30} />)}
    </svg>
  );
}
