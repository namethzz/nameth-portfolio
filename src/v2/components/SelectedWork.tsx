import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
    if (typeof IntersectionObserver === "undefined") return;
    const cards = cardRefs.current.filter((card): card is HTMLElement => Boolean(card));
    const observer = new IntersectionObserver(
      (entries) => {
        const candidates = entries.filter((entry) => entry.isIntersecting);
        if (!candidates.length) return;
        const center = window.innerHeight * 0.49;
        candidates.sort((a, b) => {
          const ac = Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - center);
          const bc = Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - center);
          return ac - bc;
        });
        const next = Number((candidates[0].target as HTMLElement).dataset.projectIndex);
        if (Number.isInteger(next)) setActiveIndex(next);
      },
      { rootMargin: "-18% 0px -18% 0px", threshold: [0, 0.25, 0.5] },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
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
        <div className="v2-story-visual" aria-label={language === "th" ? "ภาพผลงานที่กำลังอ่าน" : "Current project showcase"}>
          <AnimatePresence mode="wait">
            <motion.a
              key={activeProject.number}
              className="v2-story-feature"
              href={projectHref(activeIndex)}
              aria-label={t("explore") + " " + activeProject.name}
              onClick={(event) => { event.preventDefault(); onNavigate(activeIndex); }}
              initial={reduce ? false : { opacity: 0, y: 24, scale: 1.02 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: -12, scale: 0.985 }}
              transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={activeProject.image} alt={activeProject.alt} loading="lazy" />
              <span className="v2-story-photo-number">{activeProject.number} / 03</span>
              <span className="v2-story-feature-title">{activeProject.name}</span>
              <span className="v2-story-photo-arrow" aria-hidden="true"><ArrowUpRight size={22} /></span>
            </motion.a>
          </AnimatePresence>
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
              onPointerEnter={() => setActiveIndex(index)}
              onFocusCapture={() => setActiveIndex(index)}
            >
              <Reveal>
                <p className="v2-story-index">{project.number} <span>/ 03</span></p>
                <p className="v2-kicker">{project.category}</p>
                <a className="v2-story-title" href={projectHref(index)} onClick={(event) => { event.preventDefault(); onNavigate(index); }}>
                  <h3>{project.name}</h3><ArrowUpRight aria-hidden="true" size={25} />
                </a>
                <p className="v2-story-description">{project.description}</p>
                <div className="v2-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <a className="v2-story-mobile-image" href={projectHref(index)} onClick={(event) => { event.preventDefault(); onNavigate(index); }}>
                  <img src={project.image} alt={project.alt} loading="lazy" />
                </a>
                <div className="v2-story-links">
                  <button type="button" className="v2-quick-preview" onClick={(event) => openPreview(index, event.currentTarget)}>
                    <ScanEye size={17} aria-hidden="true" /> {language === "th" ? "ดูตัวอย่าง" : "Quick preview"}
                  </button>
                  <a href={projectHref(index)} onClick={(event) => { event.preventDefault(); onNavigate(index); }}>
                    {language === "th" ? "อ่านรายละเอียด" : "Full case study"} <ArrowUpRight aria-hidden="true" size={17} />
                  </a>
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
