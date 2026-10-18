import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/language";
import { projectTotal, type getProjects } from "@/lib/projects";
import { projectHref } from "@/src/v2/lib/routes";
import Reveal from "@/src/v2/components/Reveal";
import Planet from "@/src/v2/components/Planet";

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
    <section className="v2-section v2-capabilities" id="capabilities" aria-labelledby="v2-capabilities-heading">
      <div className="v2-cap-heading">
        <Reveal>
          <p className="v2-kicker">04 / {t("capabilities")}</p>
          <h2 id="v2-capabilities-heading">
            {thai ? (
              <>เรียนรู้เพิ่ม <span>ลงมือได้มากขึ้น</span></>
            ) : (
              <>Still learning. <span>More capable each time.</span></>
            )}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="v2-cap-heading-aside">
            <span className="v2-cap-mini-index">04 <span>/ CAPABILITIES</span></span>
            <p>{t("skillsIntro")}</p>
            <span className="v2-cap-trace" aria-hidden="true" />
          </div>
        </Reveal>
      </div>

      <Constellation
        nodes={groups.map((group) => ({ label: group.title, overline: group.overline, planet: projects[group.projectIndex].number }))}
        active={activeIndex}
        onSelect={setActiveIndex}
        caption={thai
          ? "สามมุมของปัญหาเดียวกัน: สร้างระบบ ดูแลข้อมูล และเพิ่มความฉลาด เลือกดาวเพื่อดูผลงานที่เกี่ยวข้อง"
          : "Three ways into the same problem: build the app, work its data, add intelligence. Pick a star to see the work behind it."}
      />

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

// Node positions in a 1000 x 300 box; minor stars only fill the sky.
const NODE_POS = [[150, 200], [500, 90], [850, 190]] as const;
const MINOR: ReadonlyArray<readonly [number, number]> = [[60, 90], [300, 250], [330, 60], [680, 260], [700, 40], [940, 70], [420, 180], [600, 160]];

/**
 * The capabilities as a constellation: three named stars linked by faint
 * lines, each carrying the planet of the project that proves it. The stars
 * mirror the option buttons below (which remain the accessible controls).
 */
function Constellation({ nodes, active, onSelect, caption }: {
  nodes: { label: string; overline: string; planet: string }[];
  active: number;
  onSelect: (index: number) => void;
  caption: string;
}) {
  return (
    <Reveal className="v2-constellation">
      <div className="v2-constellation-sky">
        <svg viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
          <polyline
            className="v2-constellation-line"
            points={NODE_POS.map(([x, y]) => `${x},${y}`).join(" ")}
          />
          <line className="v2-constellation-line is-faint" x1={NODE_POS[0][0]} y1={NODE_POS[0][1]} x2={NODE_POS[2][0]} y2={NODE_POS[2][1]} />
          {MINOR.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1.6} className="v2-constellation-minor" />)}
        </svg>
        {nodes.map((node, index) => (
          <button
            key={node.label}
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className={"v2-constellation-node" + (index === active ? " is-active" : "")}
            style={{ left: `${NODE_POS[index][0] / 10}%`, top: `${NODE_POS[index][1] / 3}%` }}
            onClick={() => onSelect(index)}
          >
            <span className="v2-constellation-star"><Planet number={node.planet} /></span>
            <span className="v2-constellation-label">
              <small>{node.overline}</small>
              {node.label}
            </span>
          </button>
        ))}
      </div>
      <p className="v2-constellation-caption">{caption}</p>
    </Reveal>
  );
}
