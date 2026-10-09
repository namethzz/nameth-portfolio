import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/language";
import type { getProjects } from "@/lib/projects";
import { projectHref } from "@/src/v2/lib/routes";
import Reveal from "@/src/v2/components/Reveal";

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

  // These groups reflect real project contributions, not estimated proficiency.
  // Supporting tools are deliberately separate from the project evidence.
  const groups = [
    {
      overline: language === "th" ? "สร้าง" : "BUILD",
      title: t("web"),
      detail: t("webDesc"),
      tools: ["React", "TypeScript", "C#", "ASP.NET Core MVC"],
      projectIndex: 2,
    },
    {
      overline: language === "th" ? "วิเคราะห์" : "ANALYZE",
      title: t("data"),
      detail: t("dataDesc"),
      tools: ["Python", "Pandas", "NumPy", "Google Colab"],
      projectIndex: 0,
    },
    {
      overline: language === "th" ? "ทำงานร่วมกัน" : "COLLABORATE",
      title: language === "th" ? "ข้อมูลและงานหน้าบ้าน" : "Data & interface work",
      detail: language === "th"
        ? "ผมดูแลข้อมูลเกษตรและออกแบบหน้าเว็บ ส่วนระบบ RAG เพื่อนในทีมเป็นคนรับไปพัฒนาต่อ"
        : "I worked on the crop data and website frontend. My teammate took the data forward into the RAG system.",
      tools: ["Data cleaning", "React", "Frontend design"],
      projectIndex: 1,
    },
  ] as const;
  const selected = groups[activeIndex];
  const featuredProject = projects[selected.projectIndex];

  return (
    <section className="v2-section v2-capabilities" id="skills" aria-labelledby="v2-skills-heading">
      <div className="v2-cap-heading">
        <Reveal>
          <p className="v2-kicker">03 / {t("capabilities")}</p>
          <h2 id="v2-skills-heading">
            {language === "th" ? (
              <>เรียนรู้เพิ่ม <span>ลงมือได้มากขึ้น</span></>
            ) : (
              <>Still learning. <span>More capable each time.</span></>
            )}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="v2-cap-heading-aside">
            <span className="v2-cap-mini-index">03 <span>/ CAPABILITIES</span></span>
            <p>{t("skillsIntro")}</p>
            <span className="v2-cap-trace" aria-hidden="true" />
          </div>
        </Reveal>
      </div>

      <div className="v2-cap-workspace">
        <div className="v2-cap-options" role="group" aria-label={language === "th" ? "เลือกความสามารถเพื่อดูผลงาน" : "Choose a capability to see project evidence"}>
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

        <div className="v2-cap-evidence" aria-live="off" data-capability={String(activeIndex + 1).padStart(2, "0")}>
          <div className="v2-cap-evidence-header">
            <span>{language === "th" ? "ผลงานที่เกี่ยวข้อง" : "PROJECT EVIDENCE"}</span>
            <span>0{activeIndex + 1} / 03</span>
          </div>
          <div className="v2-cap-photo">
            <AnimatePresence initial={false} mode="sync">
              <motion.img
                key={featuredProject.number}
                src={featuredProject.image}
                alt={featuredProject.alt}
                initial={reduce ? false : { opacity: 0.55, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.985 }}
                transition={{ duration: reduce ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            <span className="v2-cap-image-id" aria-hidden="true">{featuredProject.number} / NAMETH</span>
          </div>
          <div className="v2-cap-evidence-bottom">
            <div className="v2-cap-project-copy">
              <p className="v2-cap-project-label">{language === "th" ? "สิ่งที่ผมทำจริง" : "MY CONTRIBUTION"}</p>
              <h3>{featuredProject.name}</h3>
              <p>{featuredProject.role}</p>
            </div>
            <a
              className="v2-cap-evidence-link"
              href={projectHref(selected.projectIndex)}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(selected.projectIndex);
              }}
              aria-label={(language === "th" ? "ดูรายละเอียด " : "View case study for ") + featuredProject.name}
            >
              <ArrowUpRight aria-hidden="true" size={25} strokeWidth={1.6} />
            </a>
          </div>
          <div className="v2-cap-tech-row">
            <span>{language === "th" ? "ใช้ในงานนี้ / กลุ่มทักษะ" : "CAPABILITY STACK"}</span>
            <div>
              {selected.tools.map((tool) => <span key={tool}>{tool}</span>)}
            </div>
          </div>
        </div>
      </div>

      <Reveal className="v2-cap-toolbox">
        <div className="v2-cap-toolbox-intro">
          <span>04 / {language === "th" ? "เครื่องมือที่ใช้" : "OTHER TOOLS"}</span>
          <p>{language === "th" ? "เครื่องมือที่ผมเคยใช้ระหว่างทำโปรเจกต์" : "Tools I've used along the way."}</p>
        </div>
        <div className="v2-cap-toolbox-items">
          {["Git / GitHub", "Docker", "Postman", "n8n"].map((tool, index) => (
            <motion.span
              key={tool}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : index * 0.07 }}
            >
              <ArrowRight aria-hidden="true" size={13} /> {tool}
            </motion.span>
          ))}
        </div>
        <div className="v2-cap-learning">
          <span className="v2-cap-learning-dot" aria-hidden="true" />
          <p>{t("learning")}</p>
        </div>
      </Reveal>
    </section>
  );
}
