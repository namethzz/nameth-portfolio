import { useInView } from "framer-motion";
import { useMemo, useRef, useState, type CSSProperties } from "react";
import { useLanguage } from "@/lib/language";
import type { getProjects } from "@/lib/projects";
import { stack } from "@/src/v2/content/stack";
import { folio, pick, projectMeta, sections } from "@/src/folio/content";
import { Contours } from "@/src/folio/decor";
import { Heading, Reveal } from "@/src/folio/motion";

type Project = ReturnType<typeof getProjects>[number];

/** Versions of one tool listed under different names in the projects. */
const ALIASES: Record<string, string> = { "ASP.NET Core 8": "ASP.NET Core", "ASP.NET Core MVC": "ASP.NET Core" };
const COLLAPSED_ROWS = 10;

/**
 * Skills with proof: three disciplines, each pointing at the projects that
 * show it, and a matrix of every tool against the five projects. The matrix
 * is built from the projects' own tool lists, so it can't drift from them.
 */
export default function SkillMatrix({ projects }: { projects: Project[] }) {
  const { language, t } = useLanguage();
  const s = folio.skills;
  const [expanded, setExpanded] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);
  const inView = useInView(tableRef, { once: true, amount: 0.2 });

  const rows = useMemo(() => {
    const byTool = new Map<string, Set<number>>();
    projects.forEach((project, index) => {
      project.tools.forEach((tool) => {
        const name = ALIASES[tool] ?? tool;
        if (!byTool.has(name)) byTool.set(name, new Set());
        byTool.get(name)?.add(index);
      });
    });
    // Most-used first; ties keep the order they first appear in.
    return [...byTool.entries()]
      .map(([tool, used], order) => ({ tool, used, order }))
      .sort((a, b) => b.used.size - a.used.size || a.order - b.order);
  }, [projects]);

  const extras = useMemo(() => {
    const known = new Set(rows.map((row) => row.tool.toLowerCase()));
    return stack.flatMap((group) => group.items.map((item) => item.name)).filter((name) => !known.has(name.toLowerCase()));
  }, [rows]);

  const visible = expanded ? rows : rows.slice(0, COLLAPSED_ROWS);

  return (
    <section className="fo-section is-mist fo-skills" id="skills" aria-labelledby="fo-skills-title">
      <Contours className="fo-skills-contours" rings={8} seed={4.2} />
      <div className="fo-wrap">
        <div className="fo-skills-head">
          <Heading id="fo-skills-title" word={sections.skills.word} label={pick(sections.skills.label, language)} fit={40} />
          <Reveal as="p" className="fo-lead">{pick(s.lead, language)}</Reveal>
        </div>

        <ol className="fo-disciplines">
          {s.disciplines.map((discipline, index) => (
            <Reveal as="li" key={discipline.title.en} delay={index * 0.08} className="fo-discipline">
              <span className="fo-discipline-num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="fo-label">{pick(discipline.title, language)}</h3>
              <p>{pick(discipline.desc, language)}</p>
              <p className="fo-seen">
                <span className="fo-seen-label">{pick(s.seenIn, language)}</span>
                {discipline.projects.map((projectIndex) => (
                  <a key={projectIndex} href={`#project-${projectIndex + 1}`} style={{ "--accent": projectMeta[projectIndex].ink } as CSSProperties}>
                    {projects[projectIndex]?.name}
                  </a>
                ))}
              </p>
            </Reveal>
          ))}
        </ol>

        <div className="fo-matrix-wrap">
          <div className="fo-matrix-head">
            <h3 className="fo-label">{pick(s.matrixTitle, language)}</h3>
            <p>{pick(s.matrixNote, language)}</p>
          </div>
          <table ref={tableRef} className={"fo-matrix" + (inView ? " is-in" : "")}>
            <thead>
              <tr>
                <th scope="col"><span className="fo-sr-only">Tool</span></th>
                {projects.map((project, index) => (
                  <th scope="col" key={project.number} style={{ "--accent": projectMeta[index].accent } as CSSProperties}>
                    <span className="fo-matrix-project" title={project.name}>
                      <i aria-hidden="true" />
                      <span>{projectMeta[index].short}</span>
                    </span>
                  </th>
                ))}
                <th scope="col" className="fo-matrix-count"><span aria-hidden="true">Σ</span><span className="fo-sr-only">Projects</span></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row, rowIndex) => (
                <tr key={row.tool} style={{ "--row": rowIndex } as CSSProperties}>
                  <th scope="row">{row.tool}</th>
                  {projects.map((project, index) => (
                    <td key={project.number} style={{ "--accent": projectMeta[index].accent } as CSSProperties}>
                      {row.used.has(index) ? (
                        <span className="fo-dot"><span className="fo-sr-only">{project.name}: {pick(s.used, language)}</span></span>
                      ) : (
                        <span className="fo-dot is-empty" aria-hidden="true" />
                      )}
                    </td>
                  ))}
                  <td className="fo-matrix-count">{row.used.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length > COLLAPSED_ROWS ? (
            <button type="button" className="fo-button fo-matrix-toggle" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
              {expanded ? pick(s.showLess, language) : `${pick(s.showAll, language)} (${rows.length})`}
            </button>
          ) : null}
        </div>

        {extras.length ? (
          <Reveal as="p" className="fo-toolbox">
            <span className="fo-kicker">{pick(s.toolbox, language)}</span>
            {extras.join(" · ")}
          </Reveal>
        ) : null}
        <Reveal as="p" className="fo-training">
          <span>{pick(s.training, language)}</span>
          {t("learning")}
        </Reveal>
      </div>
    </section>
  );
}
