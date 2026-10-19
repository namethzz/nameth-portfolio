import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Anton advance widths in em, measured from the font file. */
const ADVANCE: Record<string, number> = {
  A: .485, B: .479, C: .474, D: .493, E: .412, F: .399, G: .485, H: .499, I: .227, J: .466, K: .472, L: .397, M: .746,
  N: .498, O: .486, P: .472, Q: .494, R: .477, S: .461, T: .396, U: .474, V: .469, W: .712, X: .484, Y: .446, Z: .41,
  "0": .494, "1": .331, "2": .494, "3": .494, "4": .494, "5": .494, "6": .494, "7": .494, "8": .494, "9": .494,
  " ": .234, "&": .52, ".": .229, "-": .311, "'": .214, "/": .405, ":": .242,
};
const lineWidth = (line: string) => [...line].reduce((sum, char) => sum + (ADVANCE[char] ?? .48), 0);

/**
 * A giant Anton word sized to fill a share of its container's width
 * (`fit`, in % of the container), whatever its length. Lines split on "\n".
 * Letters rise into place the first time the word scrolls into view.
 */
export function FitWord({ text, fit = 88, className }: { text: string; fit?: number; className?: string }) {
  const reduce = useReducedMotion();
  const lines = text.split("\n");
  const widest = Math.max(...lines.map(lineWidth));
  let letterIndex = 0;
  return (
    <span
      className={cn("fo-fit", className)}
      style={{ "--fit-sum": widest.toFixed(3), "--fit-w": fit } as CSSProperties}
      aria-hidden="true"
      lang="en"
    >
      {lines.map((line, lineIndex) => (
        <motion.span
          className="fo-fit-line"
          key={lineIndex}
          initial={reduce ? false : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.4 }}
        >
          {[...line].map((char, index) => {
            const order = letterIndex++;
            return char === " " ? (
              <span className="fo-fit-space" key={index}> </span>
            ) : (
              <span className="fo-fit-letter" key={index}>
                <motion.span
                  variants={{ hidden: { y: "108%" }, shown: { y: "0%" } }}
                  transition={{ duration: 0.9, delay: Math.min(order * 0.035, 0.6), ease: EASE }}
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
        </motion.span>
      ))}
    </span>
  );
}

/** A section heading: the giant English word, plus the readable label (shown on the Thai version). */
export function Heading({
  id,
  word,
  label,
  fit,
  className,
}: {
  id: string;
  word: string;
  label: string;
  fit?: number;
  className?: string;
}) {
  return (
    <h2 id={id} className={cn("fo-heading", className)}>
      <FitWord text={word} fit={fit} />
      <span className="fo-heading-label">{label}</span>
    </h2>
  );
}

/** Fades content up once as it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "li" | "article" | "section";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/**
 * A black-and-white photo, as in the print layout. It wipes open from the
 * bottom when it scrolls into view and turns to colour on hover or focus.
 */
export function Photo({
  src,
  alt,
  className,
  delay = 0,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
}) {
  const reduce = useReducedMotion();
  // The wipe sits on the image, not the figure: the browser's visibility
  // check counts the observed element's own clip-path, so a fully clipped
  // figure would never be seen as in view.
  return (
    <motion.figure
      className={cn("fo-photo", className)}
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
        variants={{ hidden: { clipPath: "inset(100% 0 0 0)" }, shown: { clipPath: "inset(0% 0 0 0)" } }}
        transition={{ duration: 1.1, delay, ease: [0.65, 0, 0.35, 1] }}
      />
    </motion.figure>
  );
}
