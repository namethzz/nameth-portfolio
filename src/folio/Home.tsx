import type { MouseEvent } from "react";
import { assetUrl } from "@/lib/assets";
import { useLanguage } from "@/lib/language";
import type { getProjects } from "@/lib/projects";
import { projectHref } from "@/src/v2/lib/routes";
import { folio, pick, sections } from "@/src/folio/content";
import { Globe, Marquee, Torus } from "@/src/folio/decor";
import Ending from "@/src/folio/Ending";
import Contact from "@/src/folio/Contact";
import Hero from "@/src/folio/Hero";
import Index from "@/src/folio/Index";
import Mindset from "@/src/folio/Mindset";
import Workflow from "@/src/folio/Workflow";
import About from "@/src/folio/About";
import ProjectDeck from "@/src/folio/ProjectDeck";
import Route from "@/src/folio/Route";
import Skills from "@/src/folio/Skills";
import { Heading, Photo, Reveal } from "@/src/folio/motion";

type Project = ReturnType<typeof getProjects>[number];
type Open = (index: number) => (event: MouseEvent<HTMLAnchorElement>) => void;

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
      <Mindset />
      <Workflow projects={projects} />
      <About />
      <Route />
      <Skills projects={projects} />
      <Experience projects={projects} open={open} />
      <ProjectDeck projects={projects} open={open} />
      <Marquee items={projects.map((project) => project.name.toUpperCase())} reverse />
      <Contact />
      <Ending />
    </main>
  );
}

function Introduction() {
  const { language, t } = useLanguage();
  return (
    <section className="fo-section is-navy fo-intro" id="introduction" aria-labelledby="fo-intro-title">
      <div className="fo-wrap">
        <Heading id="fo-intro-title" word={sections.introduction.word} label={pick(sections.introduction.label, language)} fit={84} />
        <div className="fo-intro-top">
          <div className="fo-copy is-large">
            <Reveal as="p">{t("about1")}</Reveal>
          </div>
          <Torus className="fo-intro-torus" />
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
