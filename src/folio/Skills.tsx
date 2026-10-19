import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { TbBrain, TbChartDots3, TbLayersSubtract, TbRocket } from "react-icons/tb";
import { useLanguage } from "@/lib/language";
import type { getProjects } from "@/lib/projects";
import { stack } from "@/src/v2/content/stack";
import { folio, pick, projectMeta, sections } from "@/src/folio/content";
import { Contours } from "@/src/folio/decor";
import { Heading, Reveal } from "@/src/folio/motion";

type Project = ReturnType<typeof getProjects>[number];

/** One icon per skill card, in card order. */
const CARD_ICONS: IconType[] = [TbLayersSubtract, TbChartDots3, TbBrain, TbRocket];
/** Every tool's icon and brand colour, looked up by name. */
const TOOLS = new Map(stack.flatMap((group) => group.items).map((item) => [item.name, item]));

/**
 * Skills as the things I can build: each card says what I do, the tools I
 * use for it (with their own icons and colours), and the projects where I
 * did it, linked to their cards.
 */
export default function Skills({ projects }: { projects: Project[] }) {
  const { language, t } = useLanguage();
  const s = folio.skills;
  return (
    <section className="fo-section is-mist fo-skills" id="skills" aria-labelledby="fo-skills-title">
      <Contours className="fo-skills-contours" rings={8} seed={4.2} />
      <div className="fo-wrap">
        <div className="fo-skills-head">
          <Heading id="fo-skills-title" word={sections.skills.word} label={pick(sections.skills.label, language)} fit={40} />
          <Reveal as="p" className="fo-lead">{pick(s.lead, language)}</Reveal>
        </div>

        <ol className="fo-skillcards">
          {s.cards.map((card, index) => {
            const Icon = CARD_ICONS[index] ?? TbRocket;
            return (
              <Reveal as="li" key={card.title.en} delay={(index % 2) * 0.08} className="fo-skillcard">
                <div className="fo-skillcard-top">
                  <span className="fo-skillcard-icon" aria-hidden="true"><Icon /></span>
                  <span className="fo-skillcard-tag" lang="en">SKILL {String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="fo-skillcard-title">{pick(card.title, language)}</h3>
                <p className="fo-skillcard-can">{pick(card.can, language)}</p>
                <ul className="fo-skillcard-tools">
                  {card.tools.map((name, toolIndex) => {
                    const tool = TOOLS.get(name);
                    const ToolIcon = tool?.icon;
                    return (
                      <li key={name} style={{ "--c": tool?.color ?? "#a8bed1", "--t": `${toolIndex * 40}ms` } as CSSProperties}>
                        {ToolIcon ? <ToolIcon aria-hidden="true" /> : null}
                        {name}
                      </li>
                    );
                  })}
                </ul>
                <p className="fo-skillcard-used">
                  <span className="fo-skillcard-used-label">{pick(s.usedIn, language)}</span>
                  {card.projects.map((projectIndex) => (
                    <a key={projectIndex} href={`#project-${projectIndex + 1}`} style={{ "--accent": projectMeta[projectIndex].ink } as CSSProperties}>
                      {projects[projectIndex]?.name}
                    </a>
                  ))}
                </p>
              </Reveal>
            );
          })}
        </ol>

        <Reveal as="p" className="fo-training">
          <span>{pick(s.training, language)}</span>
          {t("learning")}
        </Reveal>
      </div>
    </section>
  );
}
