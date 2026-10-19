import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { TbArrowLeft, TbArrowRight, TbArrowUpRight, TbBrandGithub, TbChevronLeft, TbChevronRight, TbMaximize, TbX } from "react-icons/tb";
import { useLanguage } from "@/lib/language";
import { projectTotal, type getProjects } from "@/lib/projects";
import { getProjectProof } from "@/src/v2/content/proof";
import { projectHref, sectionHref } from "@/src/v2/lib/routes";
import { folio, pick, projectMeta } from "@/src/folio/content";
import { Screens } from "@/src/folio/ProjectDeck";
import { EASE, Reveal } from "@/src/folio/motion";

type Project = ReturnType<typeof getProjects>[number];
type Shot = { src: string; alt: string; caption: string };

/**
 * A project as a case study, dressed in the product's own accent colour:
 * the cover with its live screens, the facts at a glance, the story told
 * in parts, a screen gallery with a full-screen viewer, the code worth
 * reading, and a band leading to the next project. On phones a small bar
 * keeps the live demo and source one tap away.
 */
export default function ProjectPage({
  project,
  index,
  total,
  next,
  onBack,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  next: Project;
  onBack: () => void;
  onOpen: (index: number) => void;
}) {
  const { language } = useLanguage();
  const p = folio.project;
  const meta = projectMeta[index] ?? projectMeta[0];
  const proof = getProjectProof(project.number, language);
  const nextIndex = (index + 1) % total;
  const back = (event: MouseEvent<HTMLAnchorElement>) => { event.preventDefault(); onBack(); };
  const coverRef = useRef<HTMLElement>(null);
  const coverInView = useInView(coverRef, { margin: "0px 0px -40% 0px" });
  const [viewing, setViewing] = useState<number | null>(null);

  return (
    <main
      id="main-content"
      className="fo-case"
      style={{ "--accent": meta.accent, "--ink": meta.ink } as CSSProperties}
    >
      {/* COVER */}
      <section className="fo-case-cover" ref={coverRef} aria-labelledby="fo-case-title">
        <div className="fo-wrap">
          <a className="fo-case-back" href={sectionHref("work")} onClick={back}>
            <TbArrowLeft aria-hidden="true" /> {pick(p.back, language)}
          </a>
          <div className="fo-case-cover-grid">
            <div className="fo-case-intro">
              <p className="fo-case-kicker">
                <span className="fo-case-num">{project.number}</span>
                <span>/ {projectTotal}</span>
                <span className="fo-case-cat">{project.category}</span>
              </p>
              <motion.h1
                id="fo-case-title"
                className="fo-case-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                {project.name}
              </motion.h1>
              <p className="fo-case-sub">{project.subtitle}</p>
              <p className="fo-case-lead">{project.description}</p>
              <div className="fo-case-actions">
                {project.website ? (
                  <a className="fo-case-cta" href={project.website} target="_blank" rel="noopener noreferrer">
                    {pick(p.live, language)} <TbArrowUpRight aria-hidden="true" />
                  </a>
                ) : null}
                <a className="fo-case-ghost" href={project.repository} target="_blank" rel="noopener noreferrer">
                  <TbBrandGithub aria-hidden="true" /> GitHub
                </a>
              </div>
            </div>
            <Screens project={project} className="fo-case-screens" />
          </div>
        </div>
      </section>

      {/* AT A GLANCE */}
      <section className="fo-case-glance" aria-label={pick(p.glance, language)}>
        <div className="fo-wrap">
          <dl className="fo-glance">
            <Reveal className="fo-glance-tile is-role">
              <dt>{pick(p.role, language)}</dt>
              <dd>{project.role}</dd>
            </Reveal>
            <Reveal className="fo-glance-tile" delay={0.06}>
              <dt>{pick(p.status, language)}</dt>
              <dd><span className="fo-glance-dot" aria-hidden="true" />{project.status}</dd>
            </Reveal>
            <Reveal className="fo-glance-tile is-stage" delay={0.12}>
              <dt>{pick(p.stage, language)}</dt>
              <dd>{proof.stage}</dd>
            </Reveal>
            <Reveal className="fo-glance-tile is-tools" delay={0.18}>
              <dt>{pick(p.tools, language)} <span>{project.tools.length}</span></dt>
              <dd>
                <ul className="fo-glance-tools">
                  {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
                </ul>
              </dd>
            </Reveal>
          </dl>
        </div>
      </section>

      {/* STORY */}
      <Story project={project} />

      {/* SCREENS */}
      {proof.screenshots.length > 0 ? (
        <section className="fo-case-gallery" aria-labelledby="fo-case-screens-title">
          <div className="fo-wrap">
            <div className="fo-case-head">
              <h2 id="fo-case-screens-title" className="fo-case-h2"><span lang="en">SCREENS</span></h2>
              <p>{pick(p.screens, language)}</p>
            </div>
            {/* Revealed as one piece: on phones the row scrolls sideways, and items
                off to the right would otherwise never count as in view. */}
            <Reveal>
            <ul className="fo-gallery">
              {proof.screenshots.map((shot, shotIndex) => (
                <li key={shot.src} className={shotIndex === 0 ? "is-wide" : undefined}>
                  <button type="button" className="fo-gallery-item" onClick={() => setViewing(shotIndex)} aria-label={`${pick(p.enlarge, language)}: ${shot.caption}`}>
                    <span className="fo-gallery-frame">
                      <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" width={1440} height={900} />
                      <span className="fo-gallery-zoom" aria-hidden="true"><TbMaximize /></span>
                    </span>
                    <span className="fo-gallery-caption">
                      <span className="fo-gallery-num" aria-hidden="true">{String(shotIndex + 1).padStart(2, "0")}</span>
                      {shot.caption}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* CODE */}
      {proof.engineering.length > 0 ? (
        <section className="fo-case-code" aria-labelledby="fo-case-code-title">
          <div className="fo-wrap">
            <div className="fo-case-head">
              <h2 id="fo-case-code-title" className="fo-case-h2"><span lang="en">INSIDE THE CODE</span></h2>
              <p>{pick(p.code, language)}</p>
            </div>
            <ul className="fo-editors">
              {proof.engineering.map((item, itemIndex) => (
                <Reveal as="li" key={item.source} delay={(itemIndex % 3) * 0.06}>
                  <a className="fo-editor" href={item.source} target="_blank" rel="noopener noreferrer">
                    <span className="fo-editor-bar">
                      <span className="fo-editor-dots" aria-hidden="true"><i /><i /><i /></span>
                      <span className="fo-editor-file" title={pick(p.file, language)}>{fileName(item.source)}</span>
                    </span>
                    <span className="fo-editor-body">
                      <span className="fo-editor-path" aria-hidden="true">{filePath(item.source)}</span>
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </span>
                    <span className="fo-editor-foot">{pick(p.viewSource, language)} <TbArrowUpRight aria-hidden="true" /></span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* NEXT */}
      <NextBand next={next} nextIndex={nextIndex} onOpen={onOpen} />

      {/* Phones: live demo and source stay in reach once the cover scrolls away. */}
      <AnimatePresence>
        {!coverInView ? (
          <motion.nav
            className="fo-case-bar"
            aria-label={project.name}
            initial={{ y: "120%" }}
            animate={{ y: 0 }}
            exit={{ y: "120%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <span className="fo-case-bar-name">{project.name}</span>
            {project.website ? (
              <a className="fo-case-bar-cta" href={project.website} target="_blank" rel="noopener noreferrer">
                {pick(p.live, language)} <TbArrowUpRight aria-hidden="true" />
              </a>
            ) : null}
            <a className="fo-case-bar-icon" href={project.repository} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <TbBrandGithub aria-hidden="true" />
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <Lightbox shots={proof.screenshots} index={viewing} onChange={setViewing} />
    </main>
  );
}

/** The story in numbered parts, with a rail that fills as you read. */
function Story({ project }: { project: Project }) {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const p = folio.project;
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <section className="fo-case-story" aria-labelledby="fo-case-story-title">
      <div className="fo-wrap">
        <div className="fo-story-side">
          <h2 id="fo-case-story-title" className="fo-case-h2"><span lang="en">THE STORY</span></h2>
          <p className="fo-story-label">{pick(p.story, language)}</p>
          <p className="fo-story-count" aria-hidden="true">
            <strong>{String(project.details.length).padStart(2, "0")}</strong> {pick(p.part, language).toLowerCase()}
          </p>
        </div>
        <ol className="fo-chapters" ref={ref}>
          <motion.span className="fo-chapters-rail" style={reduce ? ({ "--p": 1 } as never) : ({ "--p": progress } as never)} aria-hidden="true" />
          {project.details.map((detail, detailIndex) => (
            <Reveal as="li" key={detail} className="fo-chapter">
              <span className="fo-chapter-num" aria-hidden="true">{String(detailIndex + 1).padStart(2, "0")}</span>
              <p>{detail}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="fo-case-note">
          <span className="fo-case-quote" aria-hidden="true">“</span>
          <p className="fo-case-note-label">{pick(p.note, language)}</p>
          <p className="fo-case-note-text">{project.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** A band in the next project's own colour, with a peek at its home screen. */
function NextBand({ next, nextIndex, onOpen }: { next: Project; nextIndex: number; onOpen: (index: number) => void }) {
  const { language } = useLanguage();
  const p = folio.project;
  const meta = projectMeta[nextIndex] ?? projectMeta[0];
  return (
    <section className="fo-case-next" style={{ "--next": meta.accent, "--next-ink": meta.ink } as CSSProperties} aria-label={pick(p.next, language)}>
      <div className="fo-wrap">
        <a
          className="fo-next"
          href={projectHref(nextIndex)}
          onClick={(event) => { event.preventDefault(); onOpen(nextIndex); }}
        >
          <span className="fo-next-text">
            <span className="fo-next-kicker">{pick(p.next, language)} · {next.number}</span>
            <span className="fo-next-name">{next.name}</span>
            <span className="fo-next-sub">{next.subtitle}</span>
            <span className="fo-next-go" aria-hidden="true"><TbArrowRight /></span>
          </span>
          <span className="fo-next-peek" aria-hidden="true">
            <img src={next.image} alt="" loading="lazy" decoding="async" width={1440} height={900} />
          </span>
        </a>
      </div>
    </section>
  );
}

/** Full-screen view of a screenshot, with arrows, swipe and the keyboard (← → Esc). */
function Lightbox({ shots, index, onChange }: { shots: Shot[]; index: number | null; onChange: (index: number | null) => void }) {
  const { language } = useLanguage();
  const p = folio.project;
  const shot = index === null ? undefined : shots[index];
  const go = (step: number) => {
    if (index === null) return;
    onChange((index + step + shots.length) % shots.length);
  };

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onChange(null);
      if (event.key === "ArrowRight") onChange((index + 1) % shots.length);
      if (event.key === "ArrowLeft") onChange((index - 1 + shots.length) % shots.length);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, onChange, shots.length]);

  return (
    <AnimatePresence>
      {shot && index !== null ? (
        <motion.div
          className="fo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={shot.caption}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onChange(null)}
        >
          <motion.figure
            key={shot.src}
            className="fo-lightbox-figure"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: EASE }}
            drag={shots.length > 1 ? "x" : false}
            dragSnapToOrigin
            onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 80) go(info.offset.x < 0 ? 1 : -1); }}
            onClick={(event) => event.stopPropagation()}
          >
            <img src={shot.src} alt={shot.alt} draggable={false} />
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}</span>
              {shot.caption}
            </figcaption>
          </motion.figure>
          <button type="button" className="fo-lightbox-close" onClick={() => onChange(null)} aria-label={pick(p.close, language)} autoFocus>
            <TbX aria-hidden="true" />
          </button>
          {shots.length > 1 ? (
            <>
              <button type="button" className="fo-lightbox-step is-prev" onClick={(event) => { event.stopPropagation(); go(-1); }} aria-label={pick(p.prevShot, language)}>
                <TbChevronLeft aria-hidden="true" />
              </button>
              <button type="button" className="fo-lightbox-step is-next" onClick={(event) => { event.stopPropagation(); go(1); }} aria-label={pick(p.nextShot, language)}>
                <TbChevronRight aria-hidden="true" />
              </button>
            </>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** "…/blob/main/frontend/src/lib/rebar.ts" → "rebar.ts". */
function fileName(url: string) {
  return decodeURIComponent(url.split("/").pop() ?? url);
}

/** The folder part of a GitHub file link, shown like an editor breadcrumb. */
function filePath(url: string) {
  const match = url.match(/\/blob\/[^/]+\/(.+)$/);
  const path = match ? decodeURIComponent(match[1]) : url;
  return path.split("/").slice(0, -1).join(" / ") || "/";
}
