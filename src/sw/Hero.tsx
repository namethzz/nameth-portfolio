import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";
import { useRef } from "react";
import { assetUrl } from "@/lib/assets";
import { useLanguage } from "@/lib/language";
import { identity } from "@/src/v2/content/identity";
import { pick, sw } from "@/src/sw/content";
import { GITHUB } from "@/src/sw/Home";

const WORD = "PORTFOLIO".split("");
const EASE = [0.22, 1, 0.36, 1] as const;
const STICKER_CODE = "NAMETH-2027(CS)";

/**
 * The opening poster: a giant PORTFOLIO wordmark with the portrait standing in
 * front of it, a signature-script role, two spinning flowers and a barcode
 * sticker. Everything is laid out on one stage measured in --u (1/100 of the
 * stage width), so the composition keeps its proportions from phone to wide
 * desktop. Motion: an entrance sequence on load, a slow spin on the flowers,
 * scroll parallax, and pointer parallax on devices with a mouse.
 */
export default function Hero() {
  const { language, t } = useLanguage();
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);
  const spin = useTransform(scrollYProgress, [0, 1], [0, 140]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const px = useSpring(pointerX, { stiffness: 70, damping: 18 });
  const py = useSpring(pointerY, { stiffness: 70, damping: 18 });
  const backX = useTransform(px, (v) => v * -22);
  const backY = useTransform(py, (v) => v * -14);
  const wordX = useTransform(px, (v) => v * -10);
  const frontX = useTransform(px, (v) => v * 12);
  const frontY = useTransform(py, (v) => v * 6);

  function track(event: PointerEvent<HTMLElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - box.left) / box.width - 0.5);
    pointerY.set((event.clientY - box.top) / box.height - 0.5);
  }
  function release() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const enter = (delay: number, from: Record<string, number | string>) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, ...from },
          animate: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  const name = language === "th" ? sw.thaiName : identity.name;

  return (
    <section
      ref={ref}
      className="sw-hero"
      id="home"
      aria-labelledby="sw-hero-title"
      onPointerMove={track}
      onPointerLeave={release}
    >
      <div className="sw-hero-stage">
        {/* Back layer: the flower behind the wordmark. */}
        <motion.div className="sw-hero-layer" style={reduce ? undefined : { x: backX, y: backY }} aria-hidden="true">
          <motion.div className="sw-hero-flower is-top" style={reduce ? undefined : { rotate: spin }}>
            <motion.div {...enter(0.05, { scale: 0.2, rotate: -120 })}>
              <Flower />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.p className="sw-hero-name" lang={language} {...enter(0.15, { y: -14 })}>{name}</motion.p>
        <motion.a
          className="sw-hero-handle"
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          {...enter(0.2, { y: -14 })}
        >
          @namethzz
        </motion.a>

        {/* Wordmark layer. */}
        <motion.div className="sw-hero-layer is-word" style={reduce ? undefined : { x: wordX, y: wordY }}>
          <h1 id="sw-hero-title" className="sw-hero-title">
            <span className="sr-only">{identity.name} — {identity.roles.join(", ")} portfolio</span>
            <span className="sw-hero-word" aria-hidden="true">
              {WORD.map((letter, index) => (
                <span className="sw-hero-letter" key={index}>
                  <motion.span
                    initial={reduce ? false : { y: "108%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, delay: 0.25 + index * 0.06, ease: EASE }}
                    whileHover={reduce ? undefined : { y: "-7%", transition: { duration: 0.25 } }}
                  >
                    {letter}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>
          <motion.p
            className="sw-hero-script"
            aria-hidden="true"
            initial={reduce ? false : { clipPath: "inset(-30% 100% -30% -5%)" }}
            animate={{ clipPath: "inset(-30% -5% -30% -5%)" }}
            transition={{ duration: 1.3, delay: 1.05, ease: [0.65, 0, 0.35, 1] }}
          >
            Developer
          </motion.p>
          <motion.div
            className="sw-hero-sticker"
            aria-hidden="true"
            initial={reduce ? false : { opacity: 0, scale: 1.9, rotate: 52 }}
            animate={{ opacity: 1, scale: 1, rotate: 24 }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 240, damping: 16, delay: 1.45 }}
            whileHover={reduce ? undefined : { rotate: 17, scale: 1.05 }}
          >
            <Barcode code={STICKER_CODE} />
            <span>{STICKER_CODE}</span>
          </motion.div>
        </motion.div>

        {/* Portrait layer. */}
        <motion.div className="sw-hero-layer is-portrait" style={reduce ? undefined : { x: frontX, y: portraitY }}>
          <motion.img
            className="sw-hero-portrait"
            src={assetUrl("assets/hero/portrait.webp")}
            width={838}
            height={841}
            alt={language === "th" ? "รูปของณเมธ วงค์มงคล" : "Portrait of Nameth Wongmongkol"}
            fetchPriority="high"
            draggable={false}
            {...enter(0.55, { y: "9%", scale: 1.04 })}
          />
        </motion.div>

        {/* Front layer: the flower over the shirt. */}
        <motion.div className="sw-hero-layer is-front" style={reduce ? undefined : { x: frontX, y: frontY }} aria-hidden="true">
          <motion.div className="sw-hero-flower is-bottom" style={reduce ? undefined : { rotate: spin }}>
            <motion.div {...enter(0.85, { scale: 0.2, rotate: 120 })}>
              <Flower />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="sw-hero-notes">
        <motion.p {...enter(1.25, { y: 16 })}>{t("heroDescription")}</motion.p>
        <motion.p {...enter(1.35, { y: 16 })}>{t("about3")}</motion.p>
      </div>
    </section>
  );
}

/** Eight rounded petals around a small star-shaped gap, like the poster's flowers. */
function Flower() {
  const petal = "M0 -6 C -5 -24 -24 -54 -24 -78 A 24 24 0 1 1 24 -78 C 24 -54 5 -24 0 -6 Z";
  return (
    <svg className="sw-hero-flower-svg" viewBox="-104 -104 208 208" focusable="false">
      {Array.from({ length: 8 }, (_, index) => (
        <path key={index} d={petal} transform={`rotate(${index * 45})`} />
      ))}
    </svg>
  );
}

/** Bars drawn from the code's characters, so the sticker reads like a real label. */
function Barcode({ code }: { code: string }) {
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
