import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A system window: a thin glowing frame with corner marks and a bracketed
 * label, the way status screens look in fantasy webtoons. It opens (fades
 * and unfolds) the first time it scrolls into view.
 */
export default function Window({
  label,
  meta,
  tone = "blue",
  as: Tag = "section",
  className,
  children,
  delay = 0,
  ...rest
}: {
  label: string;
  meta?: ReactNode;
  tone?: "blue" | "gold" | "locked";
  as?: "section" | "article" | "div" | "aside";
  className?: string;
  children: ReactNode;
  delay?: number;
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={cn("sw-window", `sw-tone-${tone}`, className)}
      initial={reduce ? false : { opacity: 0, y: 18, scaleY: 0.97 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scaleY: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      <span className="sw-corner sw-corner-tl" aria-hidden="true" />
      <span className="sw-corner sw-corner-br" aria-hidden="true" />
      <header className="sw-window-bar">
        <span className="sw-window-label">[ {label} ]</span>
        {meta ? <span className="sw-window-meta">{meta}</span> : null}
      </header>
      <div className="sw-window-body">{children}</div>
    </MotionTag>
  );
}
