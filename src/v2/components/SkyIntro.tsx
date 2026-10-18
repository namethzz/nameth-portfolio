import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CloudShader from "@/components/ui/cloud-shader";
import { useLanguage } from "@/lib/language";
import { identityCopy } from "@/src/v2/content/identity";

/**
 * The first section after the poster: a sky that opens up as you scroll in
 * (clip-path window from modern-hero), with the introduction written on a
 * paper card and the values drifting past at different speeds.
 */
export default function SkyIntro() {
  const { language, t } = useLanguage();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const values = identityCopy[language].values;

  // 0 when the section's top reaches the bottom of the screen, 1 at the top.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start start"] });
  const inset = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const clipPath = useMotionTemplate`inset(${inset}% ${inset}% 0% ${inset}% round ${radius}px)`;

  return (
    <section className="v2-sky" id="about" ref={sectionRef} aria-labelledby="v2-about-heading">
      <motion.div
        className="v2-sky-stage"
        aria-hidden="true"
        style={reduce ? undefined : { clipPath }}
      >
        <CloudShader className="v2-sky-canvas" count={6} speed={0.8} />
      </motion.div>

      <div className="v2-sky-content">
        <motion.article
          className="v2-sky-card"
          initial={reduce ? false : { opacity: 0, y: 48 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="v2-kicker">01 / {t("aboutKicker")}</p>
          <h2 id="v2-about-heading">{t("aboutTitle")} <em>{t("aboutEm")}</em></h2>
          <div className="v2-sky-copy">
            <p>{t("about1")}</p>
            <p>{t("about2")}</p>
            <p>{t("about3")}</p>
          </div>
          <div className="v2-sky-card-foot">
            <div className="v2-about-signature" aria-label="Nameth Wongmongkol — Full-stack Developer / Data & AI Engineering">
              <span className="v2-about-signature-label">PERSONAL / 2026</span>
              <strong>NAMETH<span aria-hidden="true">®</span></strong>
              <span className="v2-about-signature-sub">FULL-STACK / DATA / AI</span>
            </div>
            <p className="v2-education">{t("degree")}<br />{t("university")}</p>
          </div>
        </motion.article>

        <ul className="v2-sky-values" aria-label={language === "th" ? "สิ่งที่ผมยึดถือ" : "What I value"}>
          {values.map((item, index) => (
            <DriftingValue
              key={item.id}
              index={index}
              title={item.title}
              description={item.description}
              // All drift upward at slightly different speeds (depth), so
              // neighbours shift against each other without colliding.
              start={DRIFT[index][0]}
              end={DRIFT[index][1]}
              reduce={Boolean(reduce)}
            />
          ))}
        </ul>
      </div>
      <div className="v2-sky-fade" aria-hidden="true" />
    </section>
  );
}

const DRIFT: ReadonlyArray<readonly [number, number]> = [[30, -50], [70, -110], [20, -40], [60, -90]];

function DriftingValue({ index, title, description, start, end, reduce }: {
  index: number;
  title: string;
  description: string;
  start: number;
  end: number;
  reduce: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: [`${start}px end`, `end ${end * -1}px`] });
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [0, 1, 1, 0.2]);

  return (
    <motion.li
      ref={ref}
      className={`v2-sky-value v2-sky-value-${index + 1}`}
      style={reduce ? undefined : { y, opacity }}
    >
      <span>0{index + 1}</span>
      <strong>{title}</strong>
      <small>{description}</small>
    </motion.li>
  );
}
