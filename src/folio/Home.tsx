import type { MouseEvent } from "react";
import { TbBrandGithub, TbDownload, TbMail } from "react-icons/tb";
import { assetUrl } from "@/lib/assets";
import { useLanguage } from "@/lib/language";
import type { getProjects } from "@/lib/projects";
import { projectHref } from "@/src/v2/lib/routes";
import { EMAIL, GITHUB, HANDLE, folio, pick, sections } from "@/src/folio/content";
import { Globe, Marquee, Torus } from "@/src/folio/decor";
import Hero from "@/src/folio/Hero";
import Index from "@/src/folio/Index";
import Passport from "@/src/folio/Passport";
import ProjectDeck from "@/src/folio/ProjectDeck";
import Route from "@/src/folio/Route";
import SkillMatrix from "@/src/folio/SkillMatrix";
import { Heading, Photo, Reveal } from "@/src/folio/motion";

type Project = ReturnType<typeof getProjects>[number];
type Open = (index: number) => (event: MouseEvent<HTMLAnchorElement>) => void;

/** Display names for the giant project words, split where the print layout would break them. */
const PROJECT_WORDS = ["THAI TAY", "ECONOMIC\nCROPS CHAT", "OTW.SHOP", "AIRCLEAN", "KICKHUB"];

/**
 * The homepage, laid out like the printed portfolio: navy and pale-blue
 * spreads in turn, each led by one giant word, with marquee bands between.
 */
export default function Home({ projects, onOpen }: { projects: Project[]; onOpen: (index: number) => void }) {
  const open: Open = (index) => (event) => {
    event.preventDefault();
    onOpen(index);
  };
  return (
    <main id="main-content">
      <Hero />
      <Marquee items={folio.marquee.intro} />
      <Index />
      <Introduction />
      <Passport />
      <Route />
      <SkillMatrix projects={projects} />
      <Experience projects={projects} open={open} />
      <ProjectDeck projects={projects} open={open} />
      <Marquee items={projects.map((project) => project.name.toUpperCase())} reverse />
      <Contact />
    </main>
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
