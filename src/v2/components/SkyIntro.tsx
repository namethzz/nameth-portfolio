import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useCallback, useRef } from "react";
import CloudShader from "@/components/ui/cloud-shader";
import { useLanguage } from "@/lib/language";
import Reveal from "@/src/v2/components/Reveal";
import { identityCopy } from "@/src/v2/content/identity";
import { stack } from "@/src/v2/content/stack";

/**
 * The first stop after the poster: scrolling carries you down through a sky.
 * The sky rises out of the paper, clouds and mist pass at different depths
 * (far ones slowly, near ones faster), and the
 * cards float up out of the haze before the sky fades back to paper.
 */
export default function SkyIntro() {
  const { language, t } = useLanguage();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const values = identityCopy[language].values;
  const thai = language === "th";

  // Screens scrolled since the section's top reached the top of the window;
  // read by the shader every frame.
  const readScroll = useCallback(() => {
    const section = sectionRef.current;
    return section ? -section.getBoundingClientRect().top / window.innerHeight : 0;
  }, []);

  // Two bands of mist add depth layers between the clouds and the cards.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const mistNear = useTransform(scrollYProgress, [0, 1], ["60vh", "-300vh"]);
  const mistFar = useTransform(scrollYProgress, [0, 1], ["100vh", "-160vh"]);

  return (
    <section className="v2-sky" id="about" ref={sectionRef} aria-labelledby="v2-about-heading">
      <div className="v2-sky-stage" aria-hidden="true">
        <CloudShader className="v2-sky-canvas" count={6} speed={0.8} scroll={reduce ? undefined : readScroll} />
        {!reduce && (
          <>
            <motion.span className="v2-sky-mist v2-sky-mist-a" style={{ y: mistNear }} />
            <motion.span className="v2-sky-mist v2-sky-mist-b" style={{ y: mistFar }} />
            <motion.span className="v2-sky-mist v2-sky-mist-c" style={{ y: mistNear }} />
          </>
        )}
      </div>

      <div className="v2-sky-content">
        <div className="v2-sky-rise" aria-hidden="true" />

        <motion.article
          className="v2-sky-card"
          initial={reduce ? false : { opacity: 0, y: 90, scale: 0.97, filter: "blur(8px)" }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
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
          <Reveal className="v2-stack-head">
            <p className="v2-kicker">02 / {thai ? "ภาษาและเครื่องมือ" : "Languages & tools"}</p>
            <h2 id="v2-skills-heading">{thai ? "เครื่องมือที่ใช้ทำงานจริง" : "The tools I build with."}</h2>
            <p>
              {thai
                ? "ภาษาและเครื่องมือที่ผมใช้ในโปรเจกต์ ตั้งแต่หน้าเว็บ API ฐานข้อมูล งานข้อมูลและ AI ไปจนถึงการทดสอบและ deploy"
                : "What my projects are built with, from web apps, APIs and databases to data, AI, testing and deployment."}
            </p>
          </Reveal>
          <ul className="v2-stack-grid">
            {stack.map((group, index) => {
              const GroupIcon = group.icon;
              return (
                <motion.li
                  className="v2-stack-card"
                  key={group.id}
                  initial={reduce ? false : { opacity: 0, y: 36 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: reduce ? 0 : (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="v2-stack-card-head">
                    <GroupIcon aria-hidden="true" />
                    <div>
                      <h3>{group.label[language]}</h3>
                      <p>{group.caption[language]}</p>
                    </div>
                  </div>
                  <ul className="v2-stack-chips">
                    {group.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <li key={item.name}>
                          <ItemIcon aria-hidden="true" style={{ color: item.color }} />
                          {item.name}
                        </li>
                      );
                    })}
                  </ul>
                </motion.li>
              );
            })}
          </ul>
          <Reveal className="v2-stack-learning">
            <span className="v2-cap-learning-dot" aria-hidden="true" />
            <strong>{thai ? "กำลังเรียนรู้" : "Currently learning"}</strong>
            <p>{t("learning")}</p>
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
  const rotate = useTransform(scrollYProgress, [0, 1], index % 2 ? [-2.5, 1.5] : [2.5, -1.5]);

  return (
    <motion.li
      ref={ref}
      className={`v2-sky-value v2-sky-value-${index + 1}`}
      style={reduce ? undefined : { y, opacity, rotate }}
    >
      <span>0{index + 1}</span>
      <strong>{title}</strong>
      <small>{description}</small>
    </motion.li>
  );
}
