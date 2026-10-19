import type { MouseEvent } from "react";
import { TbArrowLeft, TbArrowRight, TbArrowUpRight, TbBrandGithub, TbCheck, TbCode, TbLoader2 } from "react-icons/tb";
import { useLanguage } from "@/lib/language";
import { projectTotal, type getProjects } from "@/lib/projects";
import { getProjectProof } from "@/src/v2/content/proof";
import { projectHref, sectionHref } from "@/src/v2/lib/routes";
import { pick, questTypeLabel, questTypes, sw } from "@/src/sw/content";
import Window from "@/src/sw/Window";

type Project = ReturnType<typeof getProjects>[number];

/** One project as a quest report: what it is, my role, the story and proof. */
export default function QuestDetail({
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
  const quest = questTypes[index] ?? { type: "quest", active: false };
  const proof = getProjectProof(project.number, language);
  const next = (index + 1) % total;
  const back = (event: MouseEvent<HTMLAnchorElement>) => { event.preventDefault(); onBack(); };

  return (
    <main id="main-content" className="sw-detail">
      <a className="sw-link sw-back" href={sectionHref("work")} onClick={back}>
        <TbArrowLeft aria-hidden="true" /> {pick(sw.detail.back, language)}
      </a>

      <Window
        label={`${project.number} / ${projectTotal} · ${pick(questTypeLabel[quest.type], language).toUpperCase()}`}
        tone={quest.active ? "gold" : "blue"}
        className="sw-detail-hero"
        meta={
          <span className={"sw-quest-state" + (quest.active ? " is-active" : "")}>
            {quest.active ? <TbLoader2 aria-hidden="true" className="sw-spin" /> : <TbCheck aria-hidden="true" />}
            {project.status}
          </span>
        }
      >
        <p className="sw-quest-category">{project.category}</p>
        <h1>{project.name}</h1>
        <p className="sw-detail-subtitle">{project.subtitle}</p>
        <div className="sw-actions">
          {project.website && (
            <a className="sw-button is-primary" href={project.website} target="_blank" rel="noopener noreferrer">
              {t("visit")} <TbArrowUpRight aria-hidden="true" />
            </a>
          )}
          <a className="sw-button" href={project.repository} target="_blank" rel="noopener noreferrer">
            <TbBrandGithub aria-hidden="true" /> {t("source")}
          </a>
        </div>
        <img className="sw-detail-shot" src={project.image} alt={project.alt} width="1800" height="1350" />
      </Window>

      <div className="sw-detail-grid">
        <aside className="sw-detail-facts">
          <Window label={pick(sw.detail.role, language).toUpperCase()} aria-label={pick(sw.detail.role, language)}>
            <p className="sw-detail-role">{project.role}</p>
          </Window>
          <Window label={pick(sw.questLog.rewards, language).toUpperCase()} delay={0.06} aria-label={pick(sw.questLog.rewards, language)}>
            <div className="sw-rewards">
              {project.tools.map((tool) => <span key={tool}>{tool}</span>)}
            </div>
          </Window>
        </aside>
        <Window label={pick(sw.detail.story, language).toUpperCase()} className="sw-detail-story" aria-label={pick(sw.detail.story, language)}>
          <p className="sw-detail-lead">{project.description}</p>
          <ol className="sw-detail-points">
            {project.details.map((detail) => <li key={detail}>{detail}</li>)}
          </ol>
          <p className="sw-detail-note">{project.note}</p>
          <p className="sw-detail-stage">{proof.stage}</p>
        </Window>
      </div>

      {proof.screenshots.length > 0 && (
        <section className="sw-detail-section" aria-labelledby="sw-proof-screens">
          <h2 id="sw-proof-screens" className="sw-detail-heading">{pick(sw.detail.screens, language)}</h2>
          <div className="sw-shots">
            {proof.screenshots.map((shot, shotIndex) => (
              <Window as="div" key={shot.src} label={`${pick(sw.detail.proof, language).toUpperCase()} ${String(shotIndex + 1).padStart(2, "0")}`} className={shotIndex === 0 ? "is-wide" : undefined} delay={shotIndex * 0.05}>
                <figure className="sw-shot">
                  <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" />
                  <figcaption>{shot.caption}</figcaption>
                </figure>
              </Window>
            ))}
          </div>
        </section>
      )}

      {proof.engineering.length > 0 && (
        <section className="sw-detail-section" aria-labelledby="sw-proof-code">
          <h2 id="sw-proof-code" className="sw-detail-heading">{pick(sw.detail.code, language)}</h2>
          <div className="sw-code-grid">
            {proof.engineering.map((item) => (
              <a className="sw-code-card" key={item.source} href={item.source} target="_blank" rel="noopener noreferrer">
                <TbCode aria-hidden="true" className="sw-code-icon" />
                <strong>{item.title}</strong>
                <span>{item.description}</span>
                <span className="sw-code-visit">{pick(sw.detail.viewSource, language)} <TbArrowUpRight aria-hidden="true" /></span>
              </a>
            ))}
          </div>
        </section>
      )}

      <nav className="sw-detail-next" aria-label={pick(sw.detail.next, language)}>
        <a className="sw-link" href={sectionHref("work")} onClick={back}><TbArrowLeft aria-hidden="true" /> {pick(sw.detail.back, language)}</a>
        <a
          className="sw-button"
          href={projectHref(next)}
          onClick={(event) => { event.preventDefault(); onOpen(next); }}
        >
          {pick(sw.detail.next, language)}: {nextName} <TbArrowRight aria-hidden="true" />
        </a>
      </nav>
    </main>
  );
}
