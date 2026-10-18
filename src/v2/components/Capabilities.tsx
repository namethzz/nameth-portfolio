import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/language";
import { projectTotal, type getProjects } from "@/lib/projects";
import { projectHref } from "@/src/v2/lib/routes";
import Reveal from "@/src/v2/components/Reveal";
import { stack } from "@/src/v2/content/stack";

type Project = ReturnType<typeof getProjects>[number];

export default function Capabilities({
  projects,
  onNavigate,
}: {
  projects: Project[];
  onNavigate: (index: number) => void;
}) {
  const { language, t } = useLanguage();
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const thai = language === "th";

  // Capabilities are linked only to projects where the actual role is documented.
  const groups = [
    {
      overline: thai ? "สร้าง" : "BUILD",
      title: t("web"),
      detail: t("webDesc"),
      projectIndex: 3,
    },
    {
      overline: thai ? "ข้อมูล" : "DATA",
      title: t("data"),
      detail: t("dataDesc"),
      projectIndex: 0,
    },
    {
      overline: "AI",
      title: "AI Engineering",
      detail: thai
        ? "เชื่อม LLM เข้ากับข้อมูลจริงด้วย RAG แก้การค้นข้อมูลให้เข้าใจภาษาไทย และ deploy ระบบให้คนใช้ได้จริง"
        : "Connecting LLMs to real data with RAG, making retrieval understand Thai, and deploying the pipeline so people can use it.",
      projectIndex: 1,
    },
  ] as const;
  const selected = groups[activeIndex];
  const featuredProject = projects[selected.projectIndex];

  return (
    <section className="v2-section v2-capabilities" id="skills" aria-labelledby="v2-skills-heading">
      <div className="v2-cap-heading">
        <Reveal>
          <p className="v2-kicker">02 / {t("capabilities")}</p>
          <h2 id="v2-skills-heading">
            {thai ? (
              <>เรียนรู้เพิ่ม <span>ลงมือได้มากขึ้น</span></>
            ) : (
              <>Still learning. <span>More capable each time.</span></>
            )}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="v2-cap-heading-aside">
            <span className="v2-cap-mini-index">02 <span>/ CAPABILITIES</span></span>
            <p>{t("skillsIntro")}</p>
            <span className="v2-cap-trace" aria-hidden="true" />
          </div>
        </Reveal>
      </div>

      <Reveal className="v2-stack">
        <div className="v2-stack-head">
          <span className="v2-cap-toolbox-index">02.1 / {thai ? "ภาษาและเครื่องมือ" : "STACK"}</span>
          <h3>{thai ? "ภาษาและเครื่องมือที่ใช้เป็น" : "Languages & tools I use."}</h3>
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

      <div className="v2-cap-workspace">
        <div
          className="v2-cap-options"
          role="group"
          aria-label={thai ? "เลือกความสามารถเพื่อดูผลงาน" : "Choose a capability to see project evidence"}
        >
          {groups.map((group, index) => (
            <button
              key={group.overline}
              type="button"
              aria-pressed={activeIndex === index}
              className={"v2-cap-option" + (activeIndex === index ? " is-active" : "")}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
            >
              <span className="v2-cap-option-number">0{index + 1}</span>
              <span className="v2-cap-option-main">
                <span className="v2-cap-option-overline">{group.overline}</span>
                <span className="v2-cap-option-title">{group.title}</span>
                <span className="v2-cap-option-description">{group.detail}</span>
              </span>
              <ArrowUpRight aria-hidden="true" className="v2-cap-option-arrow" size={22} strokeWidth={1.4} />
            </button>
          ))}
        </div>

        <div
          className="v2-cap-evidence"
          data-capability={String(activeIndex + 1).padStart(2, "0")}
        >
          <div className="v2-cap-evidence-header">
            <span>{thai ? "ผลงานที่เกี่ยวข้อง" : "SELECTED PROJECT"}</span>
            <div className="v2-cap-stepper" aria-hidden="true">
              {groups.map((group, index) => (
                <span className={activeIndex === index ? "is-active" : ""} key={group.projectIndex} />
              ))}
            </div>
            <span>{featuredProject.number} / {projectTotal}</span>
          </div>

          <div className="v2-cap-photo">
            <AnimatePresence initial={false} mode="sync">
              <motion.img
                key={featuredProject.number}
                src={featuredProject.image}
                alt={featuredProject.alt}
                initial={reduce ? false : { opacity: 0, scale: 1.045 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.99 }}
                transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            <span className="v2-cap-image-id" aria-hidden="true">NAMETH / {featuredProject.number}</span>
          </div>

          <div className="v2-cap-evidence-body">
            <div className="v2-cap-evidence-bottom">
              <div className="v2-cap-project-copy">
                <p className="v2-cap-project-label">{thai ? "จากทักษะสู่ผลงาน" : "BEHIND THE WORK"} / {selected.overline}</p>
                <h3 aria-live="polite" aria-atomic="true">{featuredProject.name}</h3>
                <p className="v2-cap-project-subtitle">{featuredProject.subtitle}</p>
              </div>
            </div>

            <div className="v2-cap-role-line">
              <span>{thai ? "หน้าที่ของผม" : "MY ROLE"}</span>
              <p>{featuredProject.role}</p>
            </div>

            <div className="v2-cap-tech-row">
              <span>{thai ? "เทคโนโลยีในโปรเจกต์นี้" : "USED IN THIS PROJECT"}</span>
              <div>
                {featuredProject.tools.slice(0, 5).map((tool) => <span key={tool}>{tool}</span>)}
              </div>
            </div>

            <a
              className="v2-cap-evidence-link"
              href={projectHref(selected.projectIndex)}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(selected.projectIndex);
              }}
              aria-label={(thai ? "ดูรายละเอียด " : "View case study for ") + featuredProject.name}
            >
              <span>{thai ? "ดูรายละเอียดโปรเจกต์" : "EXPLORE CASE STUDY"}</span>
              <ArrowUpRight aria-hidden="true" size={21} strokeWidth={1.6} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
