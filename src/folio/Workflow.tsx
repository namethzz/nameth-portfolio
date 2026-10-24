import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { TbLayoutDashboard, TbMessages, TbShieldCheck, TbTargetArrow } from "react-icons/tb";
import { useLanguage } from "@/lib/language";
import type { getProjects } from "@/lib/projects";
import { folio, pick, projectMeta, sections } from "@/src/folio/content";
import { Heading, Reveal } from "@/src/folio/motion";

type Project = ReturnType<typeof getProjects>[number];

/** One icon per step, in step order. */
const STEP_ICONS: IconType[] = [TbMessages, TbTargetArrow, TbLayoutDashboard, TbShieldCheck];

/**
 * How I work: the four steps I take on a project, numbered like a printed
 * checklist. A step backed by one of my projects links to its card; the
 * year-2 shop isn't in the portfolio, so it gets a plain tag instead.
 */
export default function Workflow({ projects }: { projects: Project[] }) {
  const { language } = useLanguage();
  const w = folio.workflow;
  return (
    <section className="fo-section is-mist fo-workflow" id="workflow" aria-labelledby="fo-workflow-title">
      <div className="fo-wrap">
        <div className="fo-workflow-head">
          <Heading id="fo-workflow-title" word={sections.workflow.word} label={pick(sections.workflow.label, language)} fit={50} />
          <Reveal as="p" className="fo-lead">{pick(w.lead, language)}</Reveal>
        </div>

        <ol className="fo-steps">
          {w.steps.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? TbShieldCheck;
            return (
              <Reveal as="li" key={step.title.en} delay={(index % 2) * 0.08} className="fo-step">
                <span className="fo-step-num" lang="en">{String(index + 1).padStart(2, "0")}</span>
                <div className="fo-step-body">
                  <h3 className="fo-step-title">
                    <Icon aria-hidden="true" />
                    {pick(step.title, language)}
                  </h3>
                  <p>{pick(step.text, language)}</p>
                  {"project" in step ? (
                    <a className="fo-step-tag" href={`#project-${step.project + 1}`} style={{ "--accent": projectMeta[step.project].accent } as CSSProperties}>
                      {projects[step.project]?.name}
                    </a>
                  ) : "tag" in step ? (
                    <span className="fo-step-tag">{pick(step.tag, language)}</span>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
