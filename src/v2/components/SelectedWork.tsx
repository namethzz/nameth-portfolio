import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, GitBranch, ScanEye } from "lucide-react";
import { FiArrowUpRight } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { ParallaxHero, ParallaxImg, ScheduleItem } from "@/components/ui/modern-hero";
import { useLanguage } from "@/lib/language";
import type { getProjects } from "@/lib/projects";
import { projectHref } from "@/src/v2/lib/routes";
import ProjectPreviewModal from "@/src/v2/components/ProjectPreviewModal";
import Reveal from "@/src/v2/components/Reveal";
import Planet from "@/src/v2/components/Planet";

type Project = ReturnType<typeof getProjects>[number];

// Where each screenshot floats and how far it drifts (the modern-hero layout:
// a third left, two thirds centred, a third right, five twelfths indented).
const GALLERY = [
  { className: "v2-work-shot w-1/3", start: -200, end: 200 },
  { className: "v2-work-shot mx-auto w-2/3", start: 200, end: -250 },
  { className: "v2-work-shot ml-auto w-1/3", start: -200, end: 200 },
  { className: "v2-work-shot ml-24 w-5/12", start: 0, end: -500 },
  { className: "v2-work-shot ml-auto mr-12 w-5/12", start: 120, end: -180 },
] as const;

/**
 * The work, told with the modern-hero pieces: the first project opens from a
 * small window to the full screen, every project's screenshot drifts past it,
 * and the mission log lists them all with their details and links.
 */
export default function SelectedWork({
  projects,
  onNavigate,
}: {
  projects: Project[];
  onNavigate: (index: number) => void;
}) {
  const { language, t } = useLanguage();
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const thai = language === "th";
  const featured = projects[0];
  const previewProject = previewIndex == null ? null : projects[previewIndex];

  useEffect(() => {
    // From the work section to the end of the page everything sits in space,
    // so the header keeps its dark treatment past this point.
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = sectionRef.current?.getBoundingClientRect();
      document.body.classList.toggle("v2-over-space-work", box ? box.top < 80 : false);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
      document.body.classList.remove("v2-over-space-work");
    };
  }, []);

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

  const openProject = (index: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate(index);
  };

  return (
    <section className="v2-section v2-work" id="work" ref={sectionRef} aria-labelledby="v2-work-heading">
      <div className="v2-section-heading v2-work-heading">
        <Reveal>
          <p className="v2-kicker">03 / {t("selectedWork")}</p>
          <h2 id="v2-work-heading">{t("workTitle")}</h2>
        </Reveal>
        <Reveal delay={0.12}><p className="v2-work-intro">{t("workIntro")}</p></Reveal>
      </div>

      <ParallaxHero
        className="v2-work-hero"
        image={featured.image}
        imageAlt={featured.alt}
        fadeClassName="v2-work-hero-fade"
        overlay={
          <p className="v2-work-hero-caption" aria-hidden="true">
            <Planet number={featured.number} className="v2-planet-mini" />
            <span>{featured.number}</span>{featured.name}
          </p>
        }
      >
        <div className="v2-work-gallery mx-auto max-w-5xl px-4 pt-[200px]">
          {projects.map((project, index) => {
            const place = GALLERY[index % GALLERY.length];
            return (
              <ParallaxImg
                key={project.number}
                src={project.image}
                alt={project.alt}
                start={place.start}
                end={place.end}
                className={place.className}
                href={projectHref(index)}
                onClick={openProject(index)}
                linkLabel={t("explore") + " " + project.name}
                caption={<><span>{project.number}</span>{project.name}<small>{project.category.split(" · ")[0]}</small></>}
              />
            );
          })}
        </div>
      </ParallaxHero>

      <div className="v2-work-log mx-auto max-w-5xl px-4 text-white">
        <motion.h3
          initial={reduce ? false : { y: 48, opacity: 0 }}
          whileInView={reduce ? undefined : { y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          className="mb-20 text-4xl font-black uppercase text-zinc-50"
        >
          {thai ? "บันทึกภารกิจ" : "Mission log"}
        </motion.h3>
        {projects.map((project, index) => (
          <ScheduleItem
            key={project.number}
            title={project.name}
            date={project.status}
            location={project.category.split(" · ")[0]}
            icon={FiArrowUpRight}
            leading={<Planet number={project.number} className="v2-planet-mini" />}
            href={projectHref(index)}
            onClick={openProject(index)}
            details={
              <div className="v2-work-log-details">
                <p>{project.description}</p>
                <div className="v2-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="v2-story-links">
                  <button type="button" className="v2-quick-preview" onClick={(event) => openPreview(index, event.currentTarget)}>
                    <ScanEye size={17} aria-hidden="true" /> {thai ? "ดูตัวอย่าง" : "Quick preview"}
                  </button>
                  <a href={projectHref(index)} onClick={openProject(index)}>
                    {thai ? "อ่านรายละเอียด" : "Full case study"} <ArrowUpRight aria-hidden="true" size={17} />
                  </a>
                  {project.website && (
                    <a href={project.website} target="_blank" rel="noopener noreferrer">
                      {thai ? "เปิดเว็บจริง" : "Live demo"} <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                  <a href={project.repository} target="_blank" rel="noopener noreferrer">
                    <GitBranch size={15} aria-hidden="true" /> GitHub
                  </a>
                </div>
              </div>
            }
          />
        ))}
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
