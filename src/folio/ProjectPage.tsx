import type { MouseEvent } from "react";
import { TbArrowLeft, TbArrowRight, TbArrowUpRight, TbBrandGithub, TbCode } from "react-icons/tb";
import { useLanguage } from "@/lib/language";
import { projectTotal, type getProjects } from "@/lib/projects";
import { getProjectProof } from "@/src/v2/content/proof";
import { projectHref, sectionHref } from "@/src/v2/lib/routes";
import { folio, pick } from "@/src/folio/content";
import { Contours, Torus } from "@/src/folio/decor";
import { FitWord, Photo, Reveal } from "@/src/folio/motion";

type Project = ReturnType<typeof getProjects>[number];

/** One project as a set of spreads: the cover, my role and story, the screens, the code, and the next project. */
export default function ProjectPage({
  project,
  index,
  total,
  nextName,
  onBack,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  nextName: string;
  onBack: () => void;
  onOpen: (index: number) => void;
}) {
  const { language, t } = useLanguage();
  const p = folio.project;
  const proof = getProjectProof(project.number, language);
  const next = (index + 1) % total;
  const back = (event: MouseEvent<HTMLAnchorElement>) => { event.preventDefault(); onBack(); };

  return (
    <main id="main-content" className="fo-detail">
      <section className="fo-section is-navy fo-detail-cover" aria-labelledby="fo-detail-title">
        <Contours className="fo-spread-contours" rings={7} seed={index + 0.5} />
        <div className="fo-wrap">
          <a className="fo-back" href={sectionHref("work")} onClick={back}>
            <TbArrowLeft aria-hidden="true" /> {pick(p.back, language)}
          </a>
          <p className="fo-kicker">{pick(p.label, language)} {project.number} / {projectTotal} · {project.category}</p>
          <h1 id="fo-detail-title" className="fo-heading">
            <FitWord text={project.name.toUpperCase()} fit={Math.min(88, 14 * project.name.length)} />
            <span className="fo-sr-only">{project.name}</span>
          </h1>
          <Reveal className="fo-detail-intro">
            <p className="fo-detail-subtitle">{project.subtitle}</p>
            <div className="fo-actions">
              {project.website ? (
                <a className="fo-button is-solid" href={project.website} target="_blank" rel="noopener noreferrer">
                  {t("visit")} <TbArrowUpRight aria-hidden="true" />
                </a>
              ) : null}
              <a className="fo-button" href={project.repository} target="_blank" rel="noopener noreferrer">
                <TbBrandGithub aria-hidden="true" /> {t("source")}
              </a>
            </div>
          </Reveal>
          <Photo className="fo-detail-shot" src={project.image} alt={project.alt} width={1800} height={1350} />
        </div>
      </section>

      <section className="fo-section is-mist fo-detail-story" aria-labelledby="fo-detail-story-title">
        <div className="fo-wrap">
          <aside className="fo-detail-facts">
            <Reveal className="fo-panel">
              <h2 className="fo-label">{pick(p.role, language)}</h2>
              <p>{project.role}</p>
            </Reveal>
            <Reveal className="fo-panel" delay={0.06}>
              <h2 className="fo-label">{pick(p.tools, language)}</h2>
              <ul className="fo-chips is-on-navy">
                {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
            </Reveal>
            <Reveal as="p" className="fo-detail-stage" delay={0.1}>{proof.stage}</Reveal>
          </aside>
          <div className="fo-detail-body">
            <h2 id="fo-detail-story-title" className="fo-heading">
              <FitWord text="THE STORY" fit={52} />
              <span className="fo-heading-label">{pick(p.story, language)}</span>
            </h2>
            <Reveal as="p" className="fo-lead">{project.description}</Reveal>
            <ol className="fo-points">
              {project.details.map((detail, detailIndex) => (
                <Reveal as="li" key={detail} delay={Math.min(detailIndex * 0.04, 0.2)}>{detail}</Reveal>
              ))}
            </ol>
            <Reveal as="p" className="fo-note">{project.note}</Reveal>
          </div>
        </div>
      </section>

      {proof.screenshots.length > 0 ? (
        <section className="fo-section is-navy fo-detail-screens" aria-labelledby="fo-detail-screens-title">
          <div className="fo-wrap">
            <h2 id="fo-detail-screens-title" className="fo-heading">
              <FitWord text="SCREENS" fit={40} />
              <span className="fo-heading-label">{pick(p.screens, language)}</span>
            </h2>
            <div className="fo-shots">
              {proof.screenshots.map((shot, shotIndex) => (
                <div className={"fo-shot" + (shotIndex === 0 ? " is-wide" : "")} key={shot.src}>
                  <Photo src={shot.src} alt={shot.alt} delay={(shotIndex % 2) * 0.08} />
                  <p className="fo-shot-caption">{shot.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {proof.engineering.length > 0 ? (
        <section className="fo-section is-mist fo-detail-code" aria-labelledby="fo-detail-code-title">
          <div className="fo-wrap">
            <h2 id="fo-detail-code-title" className="fo-heading">
              <FitWord text="INSIDE THE CODE" fit={60} />
              <span className="fo-heading-label">{pick(p.code, language)}</span>
            </h2>
            <div className="fo-code-grid">
              {proof.engineering.map((item, itemIndex) => (
                <Reveal key={item.source} delay={(itemIndex % 3) * 0.05}>
                  <a className="fo-code-card" href={item.source} target="_blank" rel="noopener noreferrer">
                    <TbCode aria-hidden="true" />
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                    <span className="fo-code-visit">{pick(p.viewSource, language)} <TbArrowUpRight aria-hidden="true" /></span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="fo-section is-navy fo-detail-next" aria-label={pick(p.next, language)}>
        <div className="fo-wrap">
          <p className="fo-kicker">{pick(p.next, language)}</p>
          <a
            className="fo-next-link"
            href={projectHref(next)}
            onClick={(event) => { event.preventDefault(); onOpen(next); }}
          >
            <FitWord text={nextName.toUpperCase()} fit={Math.min(62, 9 * nextName.length)} />
            <span className="fo-sr-only">{nextName}</span>
            <TbArrowRight aria-hidden="true" className="fo-next-arrow" />
          </a>
          <a className="fo-back" href={sectionHref("work")} onClick={back}>
            <TbArrowLeft aria-hidden="true" /> {pick(p.back, language)}
          </a>
          <Torus className="fo-detail-torus" />
        </div>
      </section>
    </main>
  );
}
