import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, GitBranch, ScanEye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language";
import type { getProjects } from "@/lib/projects";
import { projectHref } from "@/src/v2/lib/routes";
import ProjectPreviewModal from "@/src/v2/components/ProjectPreviewModal";
import Reveal from "@/src/v2/components/Reveal";

type Project = ReturnType<typeof getProjects>[number];

export default function SelectedWork({
  projects,
  onNavigate,
}: {
  projects: Project[];
  onNavigate: (index: number) => void;
}) {
  const { language, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const reduce = useReducedMotion();
  const activeProject = projects[activeIndex] ?? projects[0];
  const previewProject = previewIndex == null ? null : projects[previewIndex];

  useEffect(() => {
    // One canonical scroll position determines both the photo AND chapter state.
    // IntersectionObserver's partial entries and pointer hover previously
    // competed, leaving 02 in the photo while 03 was the active chapter.
    let frame = 0;
    const updateFromScroll = () => {
      frame = 0;
      const focusLine = window.innerHeight * 0.5;
      let nearest = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        // Select the chapter crossing the viewport's focal line. When the
        // line falls outside all chapters, select the nearest chapter edge.
        const distance = focusLine < rect.top
          ? rect.top - focusLine
          : focusLine > rect.bottom
            ? focusLine - rect.bottom
            : 0;
        if (distance < bestDistance) {
          bestDistance = distance;
          nearest = index;
        }
      });
      setActiveIndex((current) => current === nearest ? current : nearest);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(updateFromScroll);
    };
    // Re-evaluate continuously from current geometry, not just IO event
    // entries, so swift scrolling and reverse scrolling remain deterministic.
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(schedule);
    cardRefs.current.forEach((card) => { if (card) resizeObserver?.observe(card); });
    void document.fonts?.ready.then(schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resizeObserver?.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [projects.length]);

  function openPreview(index: number, trigger: HTMLElement) {
    triggerRef.current = trigger;
    setPreviewIndex(index);
  }

  function closePreview() {
    setPreviewIndex(null);
  }

  function followProject(index: number) {
    // Modal closes before same-document navigation. The route change begins
    // after dialog teardown so the browser doesn't keep the top layer open.
    setPreviewIndex(null);
    requestAnimationFrame(() => onNavigate(index));
  }

  return (
    <section className="v2-section v2-work" id="work" aria-labelledby="v2-work-heading">
      <div className="v2-section-heading">
        <Reveal>
          <p className="v2-kicker">01 / {t("selectedWork")}</p>
          <h2 id="v2-work-heading">{t("workTitle")}</h2>
        </Reveal>
        <Reveal delay={0.12}><p className="v2-work-intro">{t("workIntro")}</p></Reveal>
      </div>
      <div className="v2-story-layout">
        <div
          className="v2-story-visual"
          data-active-project={activeProject.number}
          aria-label={language === "th" ? "ภาพผลงานที่กำลังอ่าน" : "Current project showcase"}
        >
          <a
            className="v2-story-feature"
            href={projectHref(activeIndex)}
            aria-label={t("explore") + " " + activeProject.name}
            onClick={(event) => { event.preventDefault(); onNavigate(activeIndex); }}
          >
            <motion.img
              key={activeProject.number}
              src={activeProject.image}
              alt={activeProject.alt}
              initial={reduce ? false : { opacity: 0.55, scale: 1.014 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ viewTransitionName: "v2-feature-image" }}
            />
            <span className="v2-story-photo-number">{activeProject.number} / 03</span>
            <span className="v2-story-feature-title">{activeProject.name}</span>
            <span className="v2-story-photo-arrow" aria-hidden="true"><ArrowUpRight size={22} /></span>
          </a>
          <div className="v2-story-progress" aria-hidden="true">
            {projects.map((project, index) => (
              <span key={project.number} className={index === activeIndex ? "is-active" : ""} />
            ))}
          </div>
        </div>
        <div className="v2-story-chapters">
          {projects.map((project, index) => (
            <article
              className={"v2-story-chapter" + (index === activeIndex ? " is-active" : "")}
              key={project.number}
              data-project-index={index}
              ref={(node) => { cardRefs.current[index] = node; }}
            >
              <Reveal>
                <p className="v2-story-index">{project.number} <span>/ 03</span></p>
                <p className="v2-kicker">{project.category}</p>
                <a className="v2-story-title" href={projectHref(index)} onClick={(event) => { event.preventDefault(); onNavigate(index); }}>
                  <h3>{project.name}</h3><ArrowUpRight aria-hidden="true" size={25} />
                </a>
                <p className="v2-story-description">{project.description}</p>
                <p className="v2-story-status"><span aria-hidden="true" />{project.status}</p>
                <div className="v2-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <a className="v2-story-mobile-image" href={projectHref(index)} onClick={(event) => { event.preventDefault(); onNavigate(index); }}>
                  <img src={project.image} alt={project.alt} loading="lazy" style={{ viewTransitionName: index === activeIndex ? "v2-feature-image" : "none" }} />
                </a>
                <div className="v2-story-links">
                  <button type="button" className="v2-quick-preview" onClick={(event) => openPreview(index, event.currentTarget)}>
                    <ScanEye size={17} aria-hidden="true" /> {language === "th" ? "ดูตัวอย่าง" : "Quick preview"}
                  </button>
                  <a href={projectHref(index)} onClick={(event) => { event.preventDefault(); onNavigate(index); }}>
                    {language === "th" ? "อ่านรายละเอียด" : "Full case study"} <ArrowUpRight aria-hidden="true" size={17} />
                  </a>
                  {project.website && (
                    <a href={project.website} target="_blank" rel="noopener noreferrer">
                      {language === "th" ? "เปิดเว็บจริง" : "Live demo"} <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                  <a href={project.repository} target="_blank" rel="noopener noreferrer">
                    <GitBranch size={15} aria-hidden="true" /> GitHub
                  </a>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
      <Reveal className="v2-story-github">
        <a className="v2-inline-link" href="https://github.com/namethzz" target="_blank" rel="noopener noreferrer">
          <GitBranch aria-hidden="true" size={17} /> {t("more")}
        </a>
      </Reveal>
      {previewProject && (
        <ProjectPreviewModal
          project={previewProject}
          open
          onClose={closePreview}
          onCaseStudy={() => { if (previewIndex != null) followProject(previewIndex); }}
          returnFocus={triggerRef.current}
        />
      )}
    </section>
  );
}
