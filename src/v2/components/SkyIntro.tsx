import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CloudShader from "@/components/ui/cloud-shader";
import { useLanguage } from "@/lib/language";
import Reveal from "@/src/v2/components/Reveal";
import { identityCopy } from "@/src/v2/content/identity";
import { stack } from "@/src/v2/content/stack";

/**
 * The first stop after the poster. A window onto the sky rises in, pins and
 * grows until the sky fills the screen (clip-path reveal from modern-hero).
 * The introduction, the values and the languages & tools then scroll over
 * the pinned sky before it fades back to paper.
 */
export default function SkyIntro() {
  const { language, t } = useLanguage();
  const reduce = useReducedMotion();
  const revealRef = useRef<HTMLDivElement>(null);
  const values = identityCopy[language].values;
  const thai = language === "th";

  // The reveal spacer (170vh) opens the section. Progress runs from its top
  // entering the screen (0) to its bottom leaving it (1). The stage pins at
  // ~0.37 and the intro card enters at ~0.63, so the window grows to full
  // screen in between and the greeting is gone before the card arrives.
  const { scrollYProgress } = useScroll({ target: revealRef, offset: ["start end", "end start"] });
  const insetY = useTransform(scrollYProgress, [0, 0.37, 0.58], [34, 20, 0]);
  const insetX = useTransform(scrollYProgress, [0, 0.37, 0.58], [36, 24, 0]);
  const radius = useTransform(scrollYProgress, [0, 0.37, 0.58], [56, 36, 0]);
  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`;
  const greetingOpacity = useTransform(scrollYProgress, [0.12, 0.3, 0.5, 0.62], [0, 1, 1, 0]);
  const greetingScale = useTransform(scrollYProgress, [0.12, 0.62], [0.9, 1.1]);

  return (
    <section className="v2-sky" id="about" aria-labelledby="v2-about-heading">
      <motion.div
        className="v2-sky-stage"
        aria-hidden="true"
        style={reduce ? undefined : { clipPath }}
      >
        <CloudShader className="v2-sky-canvas" count={6} speed={0.8} />
        <motion.p
          className="v2-sky-greeting"
          style={reduce ? { opacity: 0 } : { opacity: greetingOpacity, scale: greetingScale }}
        >
          {thai ? "สวัสดีครับ" : "Hello there."}
        </motion.p>
      </motion.div>

      <div className="v2-sky-content">
        <div className="v2-sky-reveal" ref={revealRef} aria-hidden="true" />

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

        <ul className="v2-sky-values" aria-label={thai ? "สิ่งที่ผมยึดถือ" : "What I value"}>
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

        <div className="v2-stack-wrap" id="skills">
        <Reveal className="v2-stack">
          <div className="v2-stack-head">
            <p className="v2-kicker">02 / {thai ? "ภาษาและเครื่องมือ" : "Languages & tools"}</p>
            <h2 id="v2-skills-heading">{thai ? "ภาษาและเครื่องมือที่ใช้เป็น" : "Languages & tools I use."}</h2>
          </div>
          <dl className="v2-stack-list">
            {stack.map((group, index) => (
              <div className="v2-stack-row" key={group.id}>
                <dt>
                  <span className="v2-stack-number">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{group.label[language]}</strong>
                  <small>{group.caption[language]}</small>
                </dt>
                <dd>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
          <div className="v2-cap-learning">
            <span className="v2-cap-learning-status">
              <span className="v2-cap-learning-dot" aria-hidden="true" />
              {thai ? "กำลังเรียนรู้" : "CURRENTLY LEARNING"}
            </span>
            <p>{t("learning")}</p>
          </div>
        </Reveal>
        </div>
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
