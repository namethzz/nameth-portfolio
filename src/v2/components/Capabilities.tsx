import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Boxes, GitBranch, Send, Workflow } from "lucide-react";
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
  const thai = language === "th";

  // Capabilities are linked only to projects where the actual role is documented.
  const groups = [
    {
      overline: thai ? "สร้าง" : "BUILD",
      title: t("web"),
      detail: t("webDesc"),
      projectIndex: 2,
    },
    {
      overline: thai ? "วิเคราะห์" : "ANALYZE",
      title: t("data"),
      detail: t("dataDesc"),
      projectIndex: 0,
    },
    {
      overline: thai ? "ทำงานร่วมกัน" : "COLLABORATE",
      title: thai ? "ข้อมูลและงานหน้าบ้าน" : "Data & interface work",
      detail: thai
        ? "ผมดูแลข้อมูลเกษตรและออกแบบหน้าเว็บ ส่วนระบบ RAG เพื่อนในทีมเป็นคนรับไปพัฒนาต่อ"
        : "I worked on the crop data and website frontend. My teammate took the data forward into the RAG system.",
      projectIndex: 1,
    },
  ] as const;
  const selected = groups[activeIndex];
  const featuredProject = projects[selected.projectIndex];

  // These are reference labels, not links or a claim about expertise level.
  const tools = [
    { name: "Git / GitHub", caption: thai ? "จัดการเวอร์ชัน" : "Version control", icon: GitBranch },
    { name: "Docker", caption: thai ? "จัดการ Container" : "Containers", icon: Boxes },
    { name: "Postman", caption: thai ? "ทดสอบ API" : "API testing", icon: Send },
    { name: "n8n", caption: thai ? "เชื่อม Workflow" : "Workflows", icon: Workflow },
  ];

  return (
    <section className="v2-section v2-capabilities" id="skills" aria-labelledby="v2-skills-heading">
      <div className="v2-cap-heading">
        <Reveal>
          <p className="v2-kicker">03 / {t("capabilities")}</p>
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
            <span className="v2-cap-mini-index">03 <span>/ CAPABILITIES</span></span>
            <p>{t("skillsIntro")}</p>
            <span className="v2-cap-trace" aria-hidden="true" />
          </div>
        </Reveal>
      </div>

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
            <span>{featuredProject.number} / 03</span>
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

      <Reveal className="v2-cap-toolbox">
        <div className="v2-cap-toolbox-top">
          <div className="v2-cap-toolbox-intro">
            <span className="v2-cap-toolbox-index">03.2 / {thai ? "เครื่องมือ" : "TOOLKIT"}</span>
            <h3>{thai ? "เครื่องมือที่ใช้" : "Tools I use."}</h3>
          </div>
          <p>{thai ? "เครื่องมือที่ผมเคยใช้ระหว่างทำโปรเจกต์" : "Tools I've used while working on projects."}</p>
        </div>

        <div className="v2-cap-toolbox-items">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                className="v2-cap-tool-item"
                key={tool.name}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: reduce ? 0 : 0.56,
                  delay: reduce ? 0 : index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="v2-cap-tool-item-top">
                  <Icon aria-hidden="true" size={23} strokeWidth={1.45} />
                  <span>0{index + 1}</span>
                </div>
                <strong>{tool.name}</strong>
                <span className="v2-cap-tool-caption">{tool.caption}</span>
              </motion.div>
            );
          })}
        </div>

        <div className="v2-cap-learning">
          <span className="v2-cap-learning-status">
            <span className="v2-cap-learning-dot" aria-hidden="true" />
            {thai ? "กำลังเรียนรู้" : "CURRENTLY LEARNING"}
          </span>
          <p>{t("learning")}</p>
        </div>
      </Reveal>
    </section>
  );
}
