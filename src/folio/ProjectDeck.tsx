import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { TbArrowUpRight, TbBrandGithub, TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { useLanguage } from "@/lib/language";
import type { getProjects } from "@/lib/projects";
import { getProjectProof } from "@/src/v2/content/proof";
import { projectHref } from "@/src/v2/lib/routes";
import { folio, pick, projectMeta, sections } from "@/src/folio/content";
import { EASE, Heading, Reveal } from "@/src/folio/motion";

type Project = ReturnType<typeof getProjects>[number];
type Open = (index: number) => (event: MouseEvent<HTMLAnchorElement>) => void;

/**
 * The projects as full-colour cards, each in its product's own accent, with
 * a browser frame that steps through the real screens. Phones get a swipe
 * deck (one card per swipe, with dots); wide screens stack the cards as you
 * scroll, each one sliding over the last.
 */
export default function ProjectDeck({ projects, open }: { projects: Project[]; open: Open }) {
  const { language, t } = useLanguage();
  const deckRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const live = projects.filter((project) => project.website).length;
  const w = folio.work;

  // Which card the swipe deck is showing (only scrolls sideways on phones).
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const update = () => {
      const cards = [...deck.children] as HTMLElement[];
      if (!cards.length || deck.scrollWidth <= deck.clientWidth + 4) return;
      const centre = deck.scrollLeft + deck.clientWidth / 2;
      let best = 0;
      const distance = (card: HTMLElement) => Math.abs(card.offsetLeft + card.offsetWidth / 2 - centre);
      cards.forEach((card, index) => {
        if (distance(card) < distance(cards[best])) best = index;
      });
      setActive(best);
    };
    deck.addEventListener("scroll", update, { passive: true });
    return () => deck.removeEventListener("scroll", update);
  }, []);

  function goTo(index: number) {
    const deck = deckRef.current;
    const card = deck?.children[index] as HTMLElement | undefined;
    if (!deck || !card) return;
    // The deck is positioned, so offsetLeft is measured from its own edge.
    deck.scrollTo({ left: card.offsetLeft - (deck.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  }

  return (
    <section className="fo-section is-mist fo-work" id="work" aria-labelledby="fo-work-title">
      <div className="fo-wrap">
        <div className="fo-work-head">
          <Heading id="fo-work-title" word={sections.work.word} label={pick(sections.work.label, language)} fit={46} />
          <div className="fo-work-intro">
            <Reveal as="p" className="fo-lead">{t("workIntro")}</Reveal>
            <Reveal as="p" className="fo-counts" delay={0.06}>
              <strong>{String(projects.length).padStart(2, "0")}</strong> {pick(w.count, language)}
              <span aria-hidden="true"> / </span>
              <strong>{String(live).padStart(2, "0")}</strong> {pick(w.live, language)}
            </Reveal>
          </div>
        </div>

        <div className="fo-deck" ref={deckRef}>
          {projects.map((project, index) => (
            <ProjectCard key={project.number} project={project} index={index} total={projects.length} open={open} />
          ))}
        </div>

        <div className="fo-deck-nav">
          <button type="button" className="fo-deck-step" onClick={() => goTo(Math.max(0, active - 1))} disabled={active === 0} aria-label={language === "th" ? "โปรเจกต์ก่อนหน้า" : "Previous project"}>
            <TbChevronLeft aria-hidden="true" />
          </button>
          <div className="fo-deck-dots">
            {projects.map((project, index) => (
              <button
                key={project.number}
                type="button"
                className={index === active ? "is-active" : ""}
                style={{ "--accent": projectMeta[index].accent } as CSSProperties}
                onClick={() => goTo(index)}
                aria-label={project.name}
                aria-current={index === active}
              />
            ))}
          </div>
          <span className="fo-deck-count">{String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
          <button type="button" className="fo-deck-step" onClick={() => goTo(Math.min(projects.length - 1, active + 1))} disabled={active === projects.length - 1} aria-label={language === "th" ? "โปรเจกต์ถัดไป" : "Next project"}>
            <TbChevronRight aria-hidden="true" />
          </button>
        </div>
        <p className="fo-deck-hint">{pick(w.swipe, language)} →</p>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, total, open }: { project: Project; index: number; total: number; open: Open }) {
  const { language } = useLanguage();
  const p = folio.project;
  const meta = projectMeta[index];
  const titleId = `fo-project-${index + 1}-title`;
  return (
    <article
      className="fo-pcard"
      id={`project-${index + 1}`}
      aria-labelledby={titleId}
      style={{ "--accent": meta.accent, "--ink": meta.ink, "--i": index } as CSSProperties}
    >
      <div className="fo-pcard-text">
        <div className="fo-pcard-top">
          <span className="fo-pcard-num" aria-hidden="true">{project.number}</span>
          <span className="fo-pcard-of">/ {String(total).padStart(2, "0")}</span>
          <span className="fo-pcard-status"><i aria-hidden="true" />{project.status}</span>
        </div>
        <h3 id={titleId} className="fo-pcard-name">{project.name}</h3>
        <p className="fo-pcard-sub">{project.subtitle}</p>
        <p className="fo-pcard-desc">{project.description}</p>
        <p className="fo-pcard-role"><span>{pick(p.role, language)}</span>{project.role}</p>
        <ul className="fo-pcard-tools" aria-label={pick(p.tools, language)}>
          {project.tools.slice(0, 6).map((tool) => <li key={tool}>{tool}</li>)}
        </ul>
        <div className="fo-pcard-actions">
          <a className="fo-pcard-cta" href={projectHref(index)} onClick={open(index)}>
            {pick(p.caseStudy, language)} <TbArrowUpRight aria-hidden="true" />
          </a>
          {project.website ? (
            <a className="fo-pcard-link" href={project.website} target="_blank" rel="noopener noreferrer">
              {pick(p.live, language)} <TbArrowUpRight aria-hidden="true" />
            </a>
          ) : null}
          <a className="fo-pcard-link" href={project.repository} target="_blank" rel="noopener noreferrer">
            <TbBrandGithub aria-hidden="true" /> GitHub
          </a>
        </div>
      </div>
      <Screens project={project} />
    </article>
  );
}

/** A browser window that steps through the project's real screens; tap a tab to pick one. */
function Screens({ project }: { project: Project }) {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const shots = getProjectProof(project.number, language).screenshots;
  const list = shots.length ? shots : [{ src: project.image, alt: project.alt, caption: project.name }];
  const host = project.website ? new URL(project.website).host : "github.com";

  useEffect(() => {
    if (reduce || !inView || paused || list.length < 2) return;
    const timer = window.setInterval(() => setCurrent((value) => (value + 1) % list.length), 3600);
    return () => window.clearInterval(timer);
  }, [reduce, inView, paused, list.length]);

  return (
    <div className="fo-screens" ref={ref} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="fo-browser">
        <div className="fo-browser-bar">
          <span className="fo-browser-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="fo-browser-url">{host}</span>
        </div>
        <div className="fo-browser-view">
          <AnimatePresence initial={false}>
            <motion.img
              key={list[current].src}
              src={list[current].src}
              alt={list[current].alt}
              loading="lazy"
              decoding="async"
              width={1440}
              height={900}
              initial={reduce ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            />
          </AnimatePresence>
        </div>
      </div>
      {list.length > 1 ? (
        <div className="fo-screen-tabs" role="group" aria-label={pick(folio.work.screen, language)}>
          {list.map((shot, index) => (
            <button
              key={shot.src}
              type="button"
              className={index === current ? "is-active" : ""}
              aria-pressed={index === current}
              onClick={() => { setCurrent(index); setPaused(true); }}
            >
              <span className="fo-screen-tab-num">{String(index + 1).padStart(2, "0")}</span>
              <span className="fo-screen-tab-label">{shot.caption}</span>
              {index === current && !reduce && !paused && inView ? <span className="fo-screen-tab-timer" aria-hidden="true" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
