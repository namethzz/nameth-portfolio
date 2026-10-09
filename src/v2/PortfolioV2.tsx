import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Download, GitBranch as Github, Mail } from "lucide-react";
import { assetUrl } from "@/lib/assets";
import { useLanguage } from "@/lib/language";
import { getProjects } from "@/lib/projects";
import { identity, identityCopy } from "@/src/v2/content/identity";
import { getProjectIndex, previewPath, projectHref, sectionHref } from "@/src/v2/lib/routes";

type Project = ReturnType<typeof getProjects>[number];

function Header({ caseStudy }: { caseStudy: boolean }) {
  const { language, setLanguage, t } = useLanguage();
  const navigation = [
    { href: sectionHref("work"), label: t("navWork") },
    { href: sectionHref("about"), label: t("navAbout") },
    { href: sectionHref("skills"), label: t("navSkills") },
    { href: sectionHref("contact"), label: t("navContact") },
  ];

  return (
    <header className="v2-header">
      <a className="v2-brand" href={sectionHref("home")} aria-label={identity.name + " — home"}>
        NAMETH<span aria-hidden="true">®</span>
      </a>
      <nav aria-label={t("navigation")} className="v2-nav">
        {caseStudy && <a href={sectionHref("work")} className="v2-back"><ArrowLeft aria-hidden="true" size={15} /> {t("navWork")}</a>}
        {!caseStudy && navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
      </nav>
      <div className="v2-language" role="group" aria-label={t("language")}>
        {(["en", "th"] as const).map((locale) => (
          <button
            key={locale}
            type="button"
            lang={locale}
            aria-label={locale === "en" ? "English" : "ภาษาไทย"}
            aria-pressed={language === locale}
            className={language === locale ? "is-active" : ""}
            onClick={() => setLanguage(locale)}
          >
            {locale.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  );
}

function Hero() {
  const { language, t } = useLanguage();
  return (
    <section className="v2-hero" id="home" aria-labelledby="v2-hero-title">
      <div className="v2-hero-top">
        <span>{identity.name.toUpperCase()}</span>
        <span>PORTFOLIO / {identity.year}</span>
      </div>
      <div className="v2-hero-stage">
        <p className="v2-hero-eyebrow">{language === "th" ? "งานที่ผมลงมือทำ" : "A collection of things I've built"}</p>
        <h1 className="v2-hero-title" id="v2-hero-title">PORTFOLIO<span aria-hidden="true">.</span></h1>
        <div className="v2-hero-bottom">
          <p className="v2-hero-role">SOFTWARE DEVELOPER<br />DATA ENTHUSIAST</p>
          <div className="v2-hero-intro">
            <p>{t("heroDescription")}</p>
            <div className="v2-actions">
              <a className="v2-button v2-button-dark" href="#work">{t("exploreWork")} <ArrowUpRight aria-hidden="true" size={17} /></a>
              <a className="v2-button v2-button-outline" href={assetUrl("assets/resume.pdf")} download="resume.pdf">{t("resume")} <Download aria-hidden="true" size={16} /></a>
            </div>
          </div>
        </div>
      </div>
      <a className="v2-scroll-cue" href="#work">{t("scroll")} <ArrowDown aria-hidden="true" size={16} /></a>
    </section>
  );
}

function Work({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();
  return (
    <section className="v2-section v2-work" id="work" aria-labelledby="v2-work-heading">
      <div className="v2-section-heading">
        <div><p className="v2-kicker">01 / {t("selectedWork")}</p><h2 id="v2-work-heading">{t("workTitle")}</h2></div>
        <p>{t("workIntro")}</p>
      </div>
      <div className="v2-project-list">
        {projects.map((project, index) => (
          <article className="v2-project" key={project.number}>
            <a className="v2-project-image" href={projectHref(index)} aria-label={t("explore") + " " + project.name}>
              <img src={project.image} alt={project.alt} loading="lazy" width="1800" height="1350" />
              <span className="v2-project-index">{project.number} / 03</span>
              <span className="v2-project-open" aria-hidden="true"><ArrowUpRight size={22} /></span>
            </a>
            <div className="v2-project-text">
              <p className="v2-kicker">{project.category}</p>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="v2-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="v2-project-links">
                <a className="v2-inline-link" href={projectHref(index)}>{t("explore")} <ArrowUpRight aria-hidden="true" size={17} /></a>
                {project.website && <a className="v2-inline-link" href={project.website} target="_blank" rel="noopener noreferrer">{t("visit")} <ArrowUpRight aria-hidden="true" size={16} /></a>}
              </div>
            </div>
          </article>
        ))}
      </div>
      <a className="v2-inline-link" href="https://github.com/namethzz" target="_blank" rel="noopener noreferrer"><Github aria-hidden="true" size={17} /> {t("more")}</a>
    </section>
  );
}

function About() {
  const { language, t } = useLanguage();
  const values = identityCopy[language].values;
  return (
    <section className="v2-section v2-about" id="about" aria-labelledby="v2-about-heading">
      <div>
        <p className="v2-kicker">02 / {t("aboutKicker")}</p>
        <h2 id="v2-about-heading">{t("aboutTitle")} <em>{t("aboutEm")}</em></h2>
        <img className="v2-profile-image" src={assetUrl("assets/nameth-resume.png")} alt={identity.name} loading="lazy" />
      </div>
      <div className="v2-about-copy">
        <p>{t("about1")}</p><p>{t("about2")}</p><p>{t("about3")}</p>
        <div className="v2-values">
          {values.map((item, index) => (
            <div key={item.id} className="v2-value">
              <span>0{index + 1}</span><strong>{item.title}</strong>
            </div>
          ))}
        </div>
        <p className="v2-education">{t("degree")}<br />{t("university")}</p>
      </div>
    </section>
  );
}

function Skills({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();
  const categories = [
    { title: t("web"), description: t("webDesc"), tools: ["React", "TypeScript", "C#", "ASP.NET Core MVC"], project: projects[2], index: 2 },
    { title: t("data"), description: t("dataDesc"), tools: ["Python", "Pandas", "NumPy", "Google Colab"], project: projects[0], index: 0 },
    { title: t("databases"), description: t("databaseDesc"), tools: ["Git / GitHub", "Docker", "Postman", "n8n"], project: projects[1], index: 1 },
  ];
  return (
    <section className="v2-section v2-skills" id="skills" aria-labelledby="v2-skills-heading">
      <div className="v2-section-heading">
        <div><p className="v2-kicker">03 / {t("capabilities")}</p><h2 id="v2-skills-heading">{t("skillsTitle")}</h2></div>
        <p>{t("skillsIntro")}</p>
      </div>
      <div className="v2-skill-grid">
        {categories.map((category, index) => (
          <article key={category.title} className="v2-skill">
            <span className="v2-skill-number">0{index + 1}</span>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            <div className="v2-tags">{category.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
            {category.project && <a className="v2-inline-link" href={projectHref(category.index)}>{category.project.name} <ArrowUpRight aria-hidden="true" size={16} /></a>}
          </article>
        ))}
      </div>
      <p className="v2-skill-note">{t("learning")}</p>
    </section>
  );
}

function Contact() {
  const { t } = useLanguage();
  return (
    <section className="v2-contact" id="contact" aria-labelledby="v2-contact-heading">
      <p className="v2-kicker">04 / {t("contactKicker")}</p>
      <h2 id="v2-contact-heading">{t("contactTitle")} <em>{t("contactEm")}</em></h2>
      <p className="v2-contact-copy">{t("contactIntro")}</p>
      <div className="v2-actions">
        <a className="v2-button v2-button-dark" href="mailto:nameth.won@spumail.net">{t("hello")} <Mail aria-hidden="true" size={16} /></a>
        <a className="v2-button v2-button-outline" href={assetUrl("assets/resume.pdf")} download="resume.pdf">{t("resume")} <Download aria-hidden="true" size={16} /></a>
      </div>
      <div className="v2-contact-bottom">
        <a href="mailto:nameth.won@spumail.net">nameth.won@spumail.net</a>
        <a href="https://github.com/namethzz" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight aria-hidden="true" size={15} /></a>
      </div>
    </section>
  );
}

function CaseStudy({ project }: { project: Project }) {
  const { language, t } = useLanguage();
  return (
    <main id="main-content" className="v2-case-study">
      <div className="v2-case-hero">
        <a className="v2-inline-link" href={sectionHref("work")}><ArrowLeft size={17} aria-hidden="true" /> {t("navWork")}</a>
        <p className="v2-kicker">{project.number} / {project.category}</p>
        <h1>{project.name}</h1>
        <p className="v2-case-subtitle">{project.subtitle}</p>
        <img src={project.image} alt={project.alt} width="1800" height="1350" />
      </div>
      <div className="v2-case-body">
        <aside>
          <p className="v2-kicker">{t("role")}</p>
          <p>{project.role}</p>
          <p className="v2-kicker">{t("tools")}</p>
          <div className="v2-tags">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
        </aside>
        <div>
          <h2>{language === "th" ? "เรื่องราวของงานนี้" : "Behind the project"}</h2>
          <p className="v2-case-lead">{project.description}</p>
          {project.details.map((detail, index) => (
            <div className="v2-case-point" key={detail}>
              <span>0{index + 1}</span><p>{detail}</p>
            </div>
          ))}
          <p className="v2-case-note">{project.note}</p>
          <div className="v2-actions">
            {project.website && <a className="v2-button v2-button-dark" href={project.website} target="_blank" rel="noopener noreferrer">{t("visit")} <ArrowUpRight size={17} aria-hidden="true" /></a>}
            <a className="v2-button v2-button-outline" href={project.repository} target="_blank" rel="noopener noreferrer">{t("source")} <Github size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <div className="v2-next"><a href={sectionHref("work")}>{t("navWork")} <ArrowRight size={21} aria-hidden="true" /></a></div>
    </main>
  );
}

export default function PortfolioV2() {
  const { language, t } = useLanguage();
  const projects = getProjects(language);
  const index = getProjectIndex();
  const project = index < 0 ? undefined : projects[index];

  return (
    <div className="portfolio-v2" lang={language}>
      <a className="v2-skip-link" href="#main-content">{language === "th" ? "ข้ามไปยังเนื้อหา" : "Skip to content"}</a>
      <Header caseStudy={Boolean(project)} />
      {project ? <CaseStudy project={project} /> : (
        <main id="main-content">
          <Hero />
          <Work projects={projects} />
          <About />
          <Skills projects={projects} />
          <Contact />
        </main>
      )}
      <footer className="v2-footer">
        <a href={previewPath} className="v2-brand">{identity.wordmark}</a>
        <span>© {identity.year} {identity.name}</span>
        <a href={project ? sectionHref("home") : "#home"}>{t("top")} ↑</a>
      </footer>
    </div>
  );
}
