import type { MouseEvent } from "react";
import { TbArrowDownRight, TbArrowUpRight, TbBrandGithub, TbDownload, TbMail } from "react-icons/tb";
import { assetUrl } from "@/lib/assets";
import { useLanguage } from "@/lib/language";
import type { getProjects } from "@/lib/projects";
import { identityCopy } from "@/src/v2/content/identity";
import { getProjectProof } from "@/src/v2/content/proof";
import { stack } from "@/src/v2/content/stack";
import { projectHref } from "@/src/v2/lib/routes";
import { EMAIL, GITHUB, HANDLE, folio, pick, sections } from "@/src/folio/content";
import { BlockArrow, Contours, Globe, Torus } from "@/src/folio/decor";
import Hero from "@/src/folio/Hero";
import { FitWord, Heading, Photo, Reveal } from "@/src/folio/motion";

type Project = ReturnType<typeof getProjects>[number];
type Open = (index: number) => (event: MouseEvent<HTMLAnchorElement>) => void;

/** Display names for the giant project words, split where the print layout would break them. */
const PROJECT_WORDS = ["THAI TAY", "ECONOMIC\nCROPS CHAT", "OTW.SHOP", "AIRCLEAN", "KICKHUB"];

/**
 * The homepage, laid out like the printed portfolio: navy and pale-blue
 * spreads in turn, each led by one giant word.
 */
export default function Home({ projects, onOpen }: { projects: Project[]; onOpen: (index: number) => void }) {
  const open: Open = (index) => (event) => {
    event.preventDefault();
    onOpen(index);
  };
  return (
    <main id="main-content">
      <Hero />
      <Contents />
      <Introduction />
      <About />
      <Education />
      <Skills />
      <Experience projects={projects} open={open} />
      <Portfolio projects={projects} />
      {projects.map((project, index) => (
        <ProjectSpread key={project.number} project={project} index={index} total={projects.length} open={open} />
      ))}
      <Contact />
    </main>
  );
}

function Contents() {
  const { language } = useLanguage();
  const values = identityCopy[language].values;
  return (
    <section className="fo-section is-mist fo-contents" id="contents" aria-labelledby="fo-contents-title">
      <div className="fo-wrap">
        <div className="fo-contents-top">
          <ul className="fo-values">
            {values.map((value, index) => (
              <Reveal as="li" key={value.id} delay={index * 0.06}>
                <strong>{value.title}</strong> {value.description}
              </Reveal>
            ))}
          </ul>
          <Globe className="fo-contents-globe" />
        </div>
        <Heading id="fo-contents-title" word={sections.contents.word} label={pick(sections.contents.label, language)} fit={84} />
        <nav className="fo-toc" aria-labelledby="fo-contents-title">
          {folio.contents.items.map((item, index) => (
            <Reveal key={item.href} delay={index * 0.04}>
              <a className="fo-block-link" href={`#${item.href}`}>
                <span>{pick(item.label, language)}</span>
                <TbArrowDownRight aria-hidden="true" />
              </a>
            </Reveal>
          ))}
        </nav>
      </div>
    </section>
  );
}

function Introduction() {
  const { language, t } = useLanguage();
  return (
    <section className="fo-section is-navy fo-intro" id="introduction" aria-labelledby="fo-intro-title">
      <div className="fo-wrap">
        <div className="fo-intro-top">
          <div className="fo-copy is-large">
            <Reveal as="p">{t("about1")}</Reveal>
            <Reveal as="p" delay={0.08}>{t("about2")}</Reveal>
          </div>
          <Torus className="fo-intro-torus" />
        </div>
        <Heading id="fo-intro-title" word={sections.introduction.word} label={pick(sections.introduction.label, language)} fit={84} />
      </div>
    </section>
  );
}

function About() {
  const { language, t } = useLanguage();
  const a = folio.about;
  return (
    <section className="fo-section is-mist fo-about" id="about" aria-labelledby="fo-about-title">
      <Contours className="fo-about-contours" rings={11} seed={1.3} />
      <div className="fo-wrap">
        <Heading id="fo-about-title" word={sections.about.word} label={pick(sections.about.label, language)} fit={52} />
        <div className="fo-about-body">
          <div className="fo-copy">
            <Reveal as="p">{identityCopy[language].aboutBody}</Reveal>
            <Reveal as="p" delay={0.06}>{t("about3")}</Reveal>
          </div>
          <Reveal>
            <dl className="fo-facts">
              {a.facts.map((fact) => (
                <div key={fact.key.en}>
                  <dt>{pick(fact.key, language)}</dt>
                  <dd lang={fact.key.en === "Thai name" ? "th" : undefined}>{pick(fact.value, language)}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Reveal className="fo-panel fo-about-panel">
          <div>
            <h3 className="fo-label">{pick(a.hobbiesTitle, language)}</h3>
            <ul className="fo-hobbies">
              {a.hobbies.map((hobby) => <li key={hobby.en}>{pick(hobby, language)}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="fo-label">{pick(a.goalTitle, language)}</h3>
            <p>{pick(a.goal, language)}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Education() {
  const { language, t } = useLanguage();
  const e = folio.education;
  return (
    <section className="fo-section is-navy fo-education" id="education" aria-labelledby="fo-education-title">
      <div className="fo-wrap">
        <BlockArrow className="fo-education-arrow is-up" />
        <BlockArrow className="fo-education-arrow is-down" />
        <Heading id="fo-education-title" word={sections.education.word} label={pick(sections.education.label, language)} fit={40} />
        <div className="fo-education-grid">
          <article className="fo-card">
            <Photo className="fo-education-photo is-portrait" src={assetUrl("assets/hero/portrait.webp")} alt={pick(e.photoAlt, language)} width={838} height={841} />
            <Reveal>
              <h3 className="fo-label">{t("university")}</h3>
              <p className="fo-card-strong">{t("degree")}</p>
              <p>{pick(e.degreeNote, language)}</p>
            </Reveal>
          </article>
          <article className="fo-card">
            <Photo className="fo-education-photo" src={assetUrl("assets/work/thaitay-material.jpg")} alt={language === "th" ? "หน้าวัสดุของ THAI TAY พร้อมกราฟราคาคาดการณ์" : "THAI TAY material page with its price forecast chart"} delay={0.1} />
            <Reveal delay={0.08}>
              <h3 className="fo-label">{pick(e.nowTitle, language)}</h3>
              <p className="fo-card-strong">Data science</p>
              <p>{t("learning")}</p>
            </Reveal>
          </article>
        </div>
      </div>
    </section>
  );
}

const CAPABILITIES = [
  { title: "web", desc: "webDesc" },
  { title: "data", desc: "dataDesc" },
] as const;
const AI_CAPABILITY = {
  title: { en: "AI engineering", th: "AI Engineering" },
  desc: {
    en: "Connecting language models to real data: fixing retrieval for a Thai crop chatbot and deploying its pipeline, and a price forecasting model now in training.",
    th: "เชื่อมโมเดลภาษาเข้ากับข้อมูลจริง ทั้งแก้ระบบค้นข้อมูลของแชตบอตพืชเศรษฐกิจภาษาไทยและ deploy ทั้งระบบ และโมเดลพยากรณ์ราคาที่กำลังฝึกอยู่",
  },
};

function Skills() {
  const { language, t } = useLanguage();
  return (
    <section className="fo-section is-mist fo-skills" id="skills" aria-labelledby="fo-skills-title">
      <Contours className="fo-skills-contours" rings={8} seed={4.2} />
      <div className="fo-wrap">
        <Reveal className="fo-panel fo-stack">
          {stack.map((group) => (
            <div className="fo-stack-group" key={group.id}>
              <h3 className="fo-label">{group.label[language]}</h3>
              <ul>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <Icon aria-hidden="true" />
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </Reveal>
        <div className="fo-skills-body">
          <Heading id="fo-skills-title" word={sections.skills.word} label={pick(sections.skills.label, language)} fit={42} />
          <div className="fo-skills-copy">
            <Reveal as="p" className="fo-lead">{pick(folio.skills.lead, language)}</Reveal>
            <ul className="fo-capabilities">
              {CAPABILITIES.map((item, index) => (
                <Reveal as="li" key={item.title} delay={index * 0.06}>
                  <h3 className="fo-label">{t(item.title)}</h3>
                  <p>{t(item.desc)}</p>
                </Reveal>
              ))}
              <Reveal as="li" delay={0.12}>
                <h3 className="fo-label">{pick(AI_CAPABILITY.title, language)}</h3>
                <p>{pick(AI_CAPABILITY.desc, language)}</p>
              </Reveal>
            </ul>
            <Reveal as="p" className="fo-training">
              <span>{pick(folio.skills.training, language)}</span>
              {t("learning")}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience({ projects, open }: { projects: Project[]; open: Open }) {
  const { language } = useLanguage();
  return (
    <section className="fo-section is-navy fo-experience" id="experience" aria-labelledby="fo-experience-title">
      <div className="fo-wrap">
        <div className="fo-experience-photos">
          <Photo src={assetUrl("assets/work/crops-chat.jpg")} alt={language === "th" ? "หน้าแชตของ Economic Crops Chat" : "Economic Crops Chat conversation screen"} />
          <Photo src={assetUrl("assets/work/airclean-app.jpg")} alt={language === "th" ? "หน้าแอปของ AirClean" : "AirClean app screen"} delay={0.12} />
        </div>
        <div className="fo-experience-body">
          <div className="fo-experience-head">
            <Globe className="fo-experience-globe" />
            <Heading id="fo-experience-title" word={sections.experience.word} label={pick(sections.experience.label, language)} fit={50} />
          </div>
          <Reveal as="p" className="fo-lead">{pick(folio.experience.lead, language)}</Reveal>
          <ol className="fo-roles">
            {projects.map((project, index) => (
              <Reveal as="li" key={project.number} delay={(index % 2) * 0.06}>
                <h3 className="fo-label">
                  <a href={projectHref(index)} onClick={open(index)}>{project.name}</a>
                </h3>
                <p className="fo-role-line">{project.role}</p>
                <p className="fo-role-status">{project.status}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Portfolio({ projects }: { projects: Project[] }) {
  const { language, t } = useLanguage();
  const live = projects.filter((project) => project.website).length;
  return (
    <section className="fo-section is-mist fo-portfolio" id="work" aria-labelledby="fo-work-title">
      <div className="fo-wrap">
        <div className="fo-portfolio-photos">
          <Photo src={assetUrl("assets/work/kickhub-fields.jpg")} alt={language === "th" ? "หน้ารายการสนามของ KickHub" : "KickHub field listings"} />
          <Photo src={assetUrl("assets/work/otw-shop.png")} alt={language === "th" ? "หน้าร้านค้าของ OTW.SHOP" : "OTW.SHOP product listing"} delay={0.12} />
        </div>
        <div className="fo-portfolio-body">
          <Reveal as="p" className="fo-lead">{t("workIntro")}</Reveal>
          <Reveal as="p" className="fo-counts">
            <strong>{String(projects.length).padStart(2, "0")}</strong> {pick(folio.work.count, language)}
            <span aria-hidden="true"> / </span>
            <strong>{String(live).padStart(2, "0")}</strong> {pick(folio.work.live, language)}
          </Reveal>
          <Globe className="fo-portfolio-globe" />
          <Heading id="fo-work-title" word={sections.work.word} label={pick(sections.work.label, language)} className="is-right" fit={46} />
        </div>
      </div>
    </section>
  );
}

function ProjectSpread({ project, index, total, open }: { project: Project; index: number; total: number; open: Open }) {
  const { language } = useLanguage();
  const p = folio.project;
  const shots = getProjectProof(project.number, language).screenshots;
  const first = shots[0] ?? { src: project.image, alt: project.alt };
  const second = shots[1];
  const tone = index % 2 === 0 ? "is-navy" : "is-mist";
  const titleId = `fo-project-${index + 1}-title`;
  return (
    <section className={`fo-section ${tone} fo-spread${index % 2 ? " is-flipped" : ""}`} id={`project-${index + 1}`} aria-labelledby={titleId}>
      {index % 2 === 0 ? <Contours className="fo-spread-contours" rings={7} seed={index + 0.5} /> : null}
      <div className="fo-wrap">
        <div className="fo-spread-text">
          <p className="fo-kicker">
            {p.label[language]} {project.number} / {String(total).padStart(2, "0")}
            {index === 0 ? <> · {pick(p.main, language)}</> : null}
          </p>
          <h2 id={titleId} className="fo-heading">
            <FitWord text={PROJECT_WORDS[index] ?? project.name.toUpperCase()} fit={46} />
            <span className="fo-sr-only">{project.name}</span>
          </h2>
          <Reveal>
            <h3 className="fo-label">{project.subtitle}</h3>
            <p className="fo-spread-desc">{project.description}</p>
            <p className="fo-spread-status">{project.status}</p>
            <ul className="fo-chips" aria-label={pick(p.tools, language)}>
              {project.tools.slice(0, 6).map((tool) => <li key={tool}>{tool}</li>)}
            </ul>
            <div className="fo-actions">
              <a className="fo-button is-solid" href={projectHref(index)} onClick={open(index)}>
                {pick(p.caseStudy, language)} <TbArrowUpRight aria-hidden="true" />
              </a>
              {project.website ? (
                <a className="fo-button" href={project.website} target="_blank" rel="noopener noreferrer">
                  {pick(p.live, language)} <TbArrowUpRight aria-hidden="true" />
                </a>
              ) : null}
              <a className="fo-button" href={project.repository} target="_blank" rel="noopener noreferrer">
                <TbBrandGithub aria-hidden="true" /> GitHub
              </a>
            </div>
          </Reveal>
        </div>
        <div className="fo-spread-photos">
          <a href={projectHref(index)} onClick={open(index)} tabIndex={-1} aria-hidden="true">
            <Photo className="is-main" src={first.src} alt="" />
          </a>
          {second ? <Photo className="is-second" src={second.src} alt={second.alt} delay={0.15} /> : null}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { language, t } = useLanguage();
  const c = folio.contact;
  return (
    <section className="fo-section is-mist fo-contact" id="contact" aria-labelledby="fo-contact-title">
      <div className="fo-wrap">
        <Heading id="fo-contact-title" word={sections.contact.word} label={pick(sections.contact.label, language)} fit={88} />
        <div className="fo-contact-body">
          <div>
            <Reveal as="p" className="fo-lead">{t("contactIntro")}</Reveal>
            <dl className="fo-contact-list">
              <Reveal>
                <dt>{pick(c.email, language)}</dt>
                <dd><a href={`mailto:${EMAIL}`}><TbMail aria-hidden="true" /> {EMAIL}</a></dd>
              </Reveal>
              <Reveal delay={0.05}>
                <dt>{pick(c.github, language)}</dt>
                <dd><a href={GITHUB} target="_blank" rel="noopener noreferrer"><TbBrandGithub aria-hidden="true" /> {HANDLE}</a></dd>
              </Reveal>
              <Reveal delay={0.1}>
                <dt>{pick(c.resume, language)}</dt>
                <dd><a href={assetUrl("assets/resume.pdf")} download="resume.pdf"><TbDownload aria-hidden="true" /> {pick(c.resumeValue, language)}</a></dd>
              </Reveal>
              <Reveal delay={0.15}>
                <dt>{pick(c.available, language)}</dt>
                <dd>{pick(folio.about.facts[3].value, language)}</dd>
              </Reveal>
            </dl>
          </div>
          <Torus className="fo-contact-torus" />
        </div>
      </div>
    </section>
  );
}
