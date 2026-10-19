import type { MouseEvent } from "react";
import {
  TbArrowUpRight, TbBallFootball, TbBook, TbBrandGithub, TbCheck, TbDownload, TbGuitarPick,
  TbHeadphones, TbLoader2, TbLock, TbMail,
} from "react-icons/tb";
import { assetUrl } from "@/lib/assets";
import { useLanguage } from "@/lib/language";
import type { getProjects } from "@/lib/projects";
import { identity, identityCopy } from "@/src/v2/content/identity";
import { stack } from "@/src/v2/content/stack";
import { projectHref } from "@/src/v2/lib/routes";
import { pick, questTypeLabel, questTypes, sw } from "@/src/sw/content";
import Window from "@/src/sw/Window";

type Project = ReturnType<typeof getProjects>[number];

export const EMAIL = "nameth.won@spumail.net";
export const GITHUB = "https://github.com/namethzz";

const PASSIVE_ICONS = { webtoons: TbBook, music: TbHeadphones, instrument: TbGuitarPick, sports: TbBallFootball } as const;

export default function Home({ projects, onOpen }: { projects: Project[]; onOpen: (index: number) => void }) {
  const open = (index: number) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onOpen(index);
  };
  return (
    <main id="main-content">
      <Status projects={projects} />
      <QuestLog projects={projects} open={open} />
      <Skills />
      <Passives />
      <FinalQuest />
      <Invite />
    </main>
  );
}

function SectionHead({ id, index, title, lead }: { id: string; index: string; title: string; lead?: string }) {
  return (
    <div className="sw-section-head">
      <p className="sw-section-index" aria-hidden="true">{index}</p>
      <h2 id={id}>{title}</h2>
      {lead ? <p className="sw-section-lead">{lead}</p> : null}
    </div>
  );
}

function Status({ projects }: { projects: Project[] }) {
  const { language, t } = useLanguage();
  const languages = stack.find((group) => group.id === "languages")?.items.length ?? 0;
  const stats = [
    { label: pick(sw.stats.projects, language), value: projects.length },
    { label: pick(sw.stats.live, language), value: projects.filter((project) => project.website).length },
    { label: pick(sw.stats.languages, language), value: languages },
  ];
  const rows = [
    { key: pick(sw.rows.class, language), value: pick(sw.rows.classValue, language) },
    { key: pick(sw.rows.type, language), value: pick(sw.rows.typeValue, language), note: pick(sw.rows.typeNote, language) },
    { key: pick(sw.rows.guild, language), value: `${t("degree")} · ${t("university")}` },
    { key: pick(sw.rows.quest, language), value: pick(sw.rows.questValue, language), highlight: true },
  ];
  const values = identityCopy[language].values;

  return (
    <section className="sw-section sw-status" id="home" aria-labelledby="sw-name">
      <p className="sw-system" aria-hidden="true">
        <span className="sw-system-tag">SYSTEM</span>
        <span className="sw-typing">{pick(sw.system, language)}</span>
      </p>
      <div className="sw-status-grid">
        <Window
          label="STATUS"
          className="sw-status-main"
          meta={<span className="sw-online"><span className="sw-online-dot" aria-hidden="true" />{pick(sw.available, language)}</span>}
        >
          <h1 id="sw-name" className="sw-name">{identity.name}</h1>
          <p className="sw-name-th" lang="th">{sw.thaiName}</p>
          <dl className="sw-rows">
            {rows.map((row) => (
              <div className={"sw-row" + (row.highlight ? " is-highlight" : "")} key={row.key}>
                <dt>{row.key}</dt>
                <dd>
                  {row.value}
                  {row.note ? <small>{row.note}</small> : null}
                </dd>
              </div>
            ))}
          </dl>
          <ul className="sw-stats">
            {stats.map((stat) => (
              <li key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
          <p className="sw-intro">{t("heroDescription")}</p>
          <div className="sw-actions">
            <a className="sw-button is-primary" href="#work">{pick(sw.actions.quests, language)} <TbArrowUpRight aria-hidden="true" /></a>
            <a className="sw-button" href={assetUrl("assets/resume.pdf")} download="resume.pdf">{t("resume")} <TbDownload aria-hidden="true" /></a>
          </div>
        </Window>

        <div className="sw-status-side">
          <Window label="ABOUT" delay={0.08} aria-label={t("aboutKicker")}>
            <p className="sw-about-lead">{t("about1")}</p>
            <p className="sw-about-copy">{t("about2")}</p>
          </Window>
          <Window label={pick(sw.traits, language).toUpperCase()} delay={0.14} aria-label={pick(sw.traits, language)}>
            <ul className="sw-traits">
              {values.map((value) => (
                <li key={value.id}>
                  <strong>{value.title}</strong>
                  <span>{value.description}</span>
                </li>
              ))}
            </ul>
          </Window>
          <Window label={pick(sw.objective, language).toUpperCase()} tone="gold" delay={0.2} aria-label={pick(sw.objective, language)}>
            <p className="sw-objective"><TbLoader2 aria-hidden="true" className="sw-spin" />{t("learning")}</p>
          </Window>
        </div>
      </div>
    </section>
  );
}

function QuestLog({ projects, open }: { projects: Project[]; open: (index: number) => (event: MouseEvent<HTMLAnchorElement>) => void }) {
  const { language } = useLanguage();
  return (
    <section className="sw-section" id="work" aria-labelledby="sw-quests-title">
      <SectionHead id="sw-quests-title" index="02" title={pick(sw.questLog.title, language)} lead={pick(sw.questLog.lead, language)} />
      <div className="sw-quests">
        {projects.map((project, index) => {
          const quest = questTypes[index] ?? { type: "quest", active: false };
          return (
            <Window
              as="article"
              key={project.number}
              className={"sw-quest" + (index === 0 ? " is-featured" : "")}
              tone={quest.active ? "gold" : "blue"}
              label={`${project.number} · ${pick(questTypeLabel[quest.type], language).toUpperCase()}`}
              meta={
                <span className={"sw-quest-state" + (quest.active ? " is-active" : "")}>
                  {quest.active ? <TbLoader2 aria-hidden="true" className="sw-spin" /> : <TbCheck aria-hidden="true" />}
                  {pick(quest.active ? sw.questLog.inProgress : sw.questLog.cleared, language)}
                </span>
              }
              delay={(index % 2) * 0.06}
              aria-labelledby={`sw-quest-${project.number}`}
            >
              <a className="sw-quest-shot" href={projectHref(index)} onClick={open(index)} tabIndex={-1} aria-hidden="true">
                <img src={project.image} alt="" loading="lazy" decoding="async" />
              </a>
              <div className="sw-quest-body">
                <p className="sw-quest-category">{project.category}</p>
                <h3 id={`sw-quest-${project.number}`}>
                  <a href={projectHref(index)} onClick={open(index)}>{project.name}</a>
                </h3>
                <p className="sw-quest-subtitle">{project.subtitle}</p>
                <p className="sw-quest-description">{project.description}</p>
                <p className="sw-quest-status">{project.status}</p>
                <div className="sw-rewards" aria-label={pick(sw.questLog.rewards, language)}>
                  {project.tools.slice(0, 6).map((tool) => <span key={tool}>{tool}</span>)}
                </div>
                <div className="sw-quest-links">
                  <a className="sw-button is-primary is-small" href={projectHref(index)} onClick={open(index)}>
                    {pick(sw.questLog.details, language)} <TbArrowUpRight aria-hidden="true" />
                  </a>
                  {project.website && (
                    <a className="sw-link" href={project.website} target="_blank" rel="noopener noreferrer">
                      {pick(sw.questLog.live, language)} <TbArrowUpRight aria-hidden="true" />
                    </a>
                  )}
                  <a className="sw-link" href={project.repository} target="_blank" rel="noopener noreferrer">
                    <TbBrandGithub aria-hidden="true" /> GitHub
                  </a>
                </div>
              </div>
            </Window>
          );
        })}
      </div>
    </section>
  );
}

function Skills() {
  const { language, t } = useLanguage();
  return (
    <section className="sw-section" id="skills" aria-labelledby="sw-skills-title">
      <SectionHead id="sw-skills-title" index="03" title={pick(sw.skills.title, language)} lead={pick(sw.skills.lead, language)} />
      <div className="sw-skill-grid">
        {stack.map((group, index) => {
          const GroupIcon = group.icon;
          return (
            <Window key={group.id} label={group.label.en.toUpperCase()} delay={(index % 3) * 0.05} aria-label={group.label[language]}>
              <h3 className="sw-skill-title"><GroupIcon aria-hidden="true" />{group.label[language]}</h3>
              <ul className="sw-skill-items">
                {group.items.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <li key={item.name}>
                      <ItemIcon aria-hidden="true" style={{ color: item.color }} />
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </Window>
          );
        })}
      </div>
      <p className="sw-training">
        <span className="sw-training-tag">{pick(sw.skills.training, language)}</span>
        {t("learning")}
      </p>
    </section>
  );
}

function Passives() {
  const { language } = useLanguage();
  return (
    <section className="sw-section" id="about" aria-labelledby="sw-passives-title">
      <SectionHead id="sw-passives-title" index="04" title={pick(sw.passives.title, language)} lead={pick(sw.passives.lead, language)} />
      <ul className="sw-passives">
        {sw.passives.items.map((item, index) => {
          const Icon = PASSIVE_ICONS[item.id];
          return (
            <li key={item.id}>
              <Window as="div" label={`PASSIVE ${String(index + 1).padStart(2, "0")}`} delay={index * 0.05}>
                <Icon aria-hidden="true" className="sw-passive-icon" />
                <h3>{pick(item.title, language)}</h3>
                <p>{pick(item.effect, language)}</p>
              </Window>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function FinalQuest() {
  const { language } = useLanguage();
  const q = sw.finalQuest;
  return (
    <section className="sw-section" aria-labelledby="sw-final-title">
      <Window
        label={pick(q.label, language).toUpperCase()}
        tone="locked"
        className="sw-final"
        meta={<span className="sw-locked"><TbLock aria-hidden="true" />{pick(q.locked, language)}</span>}
      >
        <h2 id="sw-final-title">{pick(q.title, language)}</h2>
        <p className="sw-final-story">{pick(q.story, language)}</p>
        <h3 className="sw-final-req">{pick(q.requirements, language)}</h3>
        <ol className="sw-steps">
          {q.steps.map((step) => (
            <li key={step.label.en} className={`is-${step.state}`}>
              <span className="sw-step-mark" aria-hidden="true">
                {step.state === "done" ? <TbCheck /> : step.state === "active" ? <TbLoader2 className="sw-spin" /> : <TbLock />}
              </span>
              {pick(step.label, language)}
            </li>
          ))}
        </ol>
      </Window>
    </section>
  );
}

function Invite() {
  const { language, t } = useLanguage();
  return (
    <section className="sw-section" id="contact" aria-labelledby="sw-invite-title">
      <Window label={pick(sw.invite.label, language).toUpperCase()} className="sw-invite">
        <h2 id="sw-invite-title">{pick(sw.invite.title, language)}</h2>
        <p>{t("contactIntro")}</p>
        <div className="sw-actions">
          <a className="sw-button is-primary" href={`mailto:${EMAIL}`}><TbMail aria-hidden="true" /> {pick(sw.invite.send, language)}</a>
          <a className="sw-button" href={assetUrl("assets/resume.pdf")} download="resume.pdf">{t("resume")} <TbDownload aria-hidden="true" /></a>
          <a className="sw-button" href={GITHUB} target="_blank" rel="noopener noreferrer"><TbBrandGithub aria-hidden="true" /> GitHub</a>
        </div>
        <a className="sw-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </Window>
    </section>
  );
}
