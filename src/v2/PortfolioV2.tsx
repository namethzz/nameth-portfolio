import { ArrowLeft, ArrowRight, ArrowUpRight, Download, GitBranch as Github, Mail } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Reveal from "@/src/v2/components/Reveal";
import SelectedWork from "@/src/v2/components/SelectedWork";
import Capabilities from "@/src/v2/components/Capabilities";
import SkyIntro from "@/src/v2/components/SkyIntro";
import GlyphHero from "@/src/v2/components/GlyphHero";
import Planet from "@/src/v2/components/Planet";
import { SmoothScroll } from "@/components/ui/modern-hero";
import { useLenis } from "lenis/react";
import ProjectEvidence from "@/src/v2/components/ProjectEvidence";
import { assetUrl } from "@/lib/assets";
import { useLanguage } from "@/lib/language";
import { getProjects, projectTotal } from "@/lib/projects";
import { identity } from "@/src/v2/content/identity";
import { getProjectIndex, homePath, projectHref, sectionHref } from "@/src/v2/lib/routes";

type Project = ReturnType<typeof getProjects>[number];

function Header({ caseStudy, scrolled, onBackToWork, onBackToTop }: { caseStudy: boolean; scrolled: boolean; onBackToWork: () => void; onBackToTop: () => void }) {
  const { language, setLanguage, t } = useLanguage();
  const lenis = useLenis();
  const navigation = [
    { href: sectionHref("about"), label: t("navAbout") },
    { href: sectionHref("skills"), label: t("navSkills") },
    { href: sectionHref("work"), label: t("navWork") },
    { href: sectionHref("contact"), label: t("navContact") },
  ];

  return (
    <header className={`v2-header${!caseStudy && scrolled ? " is-scrolled" : ""}`}>
      <a className="v2-brand" href={sectionHref("home")} onClick={(event) => { if (caseStudy) { event.preventDefault(); onBackToTop(); } }} aria-label={identity.name + " — home"}>
        NAMETH<span aria-hidden="true">®</span>
      </a>
      <nav aria-label={t("navigation")} className="v2-nav">
        {caseStudy && <a href={sectionHref("work")} onClick={(event) => { event.preventDefault(); onBackToWork(); }} className="v2-back"><ArrowLeft aria-hidden="true" size={15} /> {t("navWork")}</a>}
        {!caseStudy && navigation.map((item) => (
          <a
            href={item.href}
            key={item.href}
            onClick={(event) => {
              // Scroll through Lenis so smooth scrolling lands on the section.
              const id = item.href.split("#")[1];
              const target = id ? document.getElementById(id) : null;
              if (!lenis || !target) return;
              event.preventDefault();
              lenis.scrollTo(target, { offset: -80 });
              window.history.replaceState(null, "", item.href);
            }}
          >
            {item.label}
          </a>
        ))}
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

function Contact() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const contactRef = useRef<HTMLElement>(null);
  // Earth rises over the horizon as the journey comes to an end.
  const { scrollYProgress } = useScroll({ target: contactRef, offset: ["start end", "end end"] });
  const earthY = useTransform(scrollYProgress, [0, 1], ["38%", "0%"]);
  const glow = useTransform(scrollYProgress, [0.3, 1], [0.35, 1]);
  return (
    <section
      className="v2-contact"
      id="contact"
      ref={contactRef}
      aria-labelledby="v2-contact-heading"
    >
      <div className="v2-contact-horizon" aria-hidden="true">
        <motion.span className="v2-contact-earth" style={reduce ? undefined : { y: earthY }}>
          <motion.span className="v2-contact-atmosphere" style={reduce ? undefined : { opacity: glow }} />
        </motion.span>
      </div>
      <Reveal><p className="v2-kicker">05 / {t("contactKicker")}</p></Reveal>
      <Reveal delay={0.1}>
        <h2 id="v2-contact-heading">{t("contactTitle")} <em>{t("contactEm")}</em></h2>
      </Reveal>
      <Reveal delay={0.14}><p className="v2-contact-copy">{t("contactIntro")}</p></Reveal>
      <Reveal delay={0.2}>
        <div className="v2-actions">
          <a className="v2-button v2-button-dark" href="mailto:nameth.won@spumail.net">{t("hello")} <Mail aria-hidden="true" size={16} /></a>
          <a className="v2-button v2-button-outline" href={assetUrl("assets/resume.pdf")} download="resume.pdf">{t("resume")} <Download aria-hidden="true" size={16} /></a>
        </div>
      </Reveal>
      <Reveal delay={0.22}>
        <div className="v2-contact-bottom">
          <a href="mailto:nameth.won@spumail.net">nameth.won@spumail.net</a>
          <a href="https://github.com/namethzz" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight aria-hidden="true" size={15} /></a>
        </div>
      </Reveal>
    </section>
  );
}

function CaseStudy({ project, onBackToWork }: { project: Project; onBackToWork: () => void }) {
  const { language, t } = useLanguage();
  const reduce = useReducedMotion();
  return (
    <main id="main-content" className="v2-case-study">
      <div className="v2-case-hero">
        <a className="v2-inline-link" href={sectionHref("work")} onClick={(event) => { event.preventDefault(); onBackToWork(); }}><ArrowLeft size={17} aria-hidden="true" /> {t("navWork")}</a>
        <p className="v2-kicker"><Planet number={project.number} className="v2-planet-mini" />{project.number} / {project.category}</p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >{project.name}</motion.h1>
        <p className="v2-case-subtitle">{project.subtitle}</p>
        <div className="v2-case-status"><span className="v2-availability-dot" aria-hidden="true" />{project.status}</div>
        <img src={project.image} alt={project.alt} width="1800" height="1350" style={{ viewTransitionName: "v2-feature-image" }} />
      </div>
      <div className="v2-case-body">
        <aside className="v2-case-facts" aria-label={language === "th" ? "บทบาทและเทคโนโลยีที่ใช้" : "Role and technologies"}>
          <div className="v2-case-facts-header">
            <span>{language === "th" ? "ข้อมูลโปรเจกต์" : "PROJECT NOTES"}</span>
            <span>{project.number} / {projectTotal}</span>
          </div>
          <div className="v2-case-fact-section v2-case-fact-role">
            <h2 className="v2-case-fact-label"><span aria-hidden="true">01</span> {t("role").replace(/:$/, "")}</h2>
            <p className="v2-case-fact-value">{project.role}</p>
          </div>
          <div className="v2-case-fact-section v2-case-fact-tools">
            <h2 className="v2-case-fact-label"><span aria-hidden="true">02</span> {t("tools")}</h2>
            <ul className="v2-case-tool-list">
              {project.tools.map((tool, index) => (
                <li key={tool}>
                  <span className="v2-case-tool-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span>{tool}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="v2-case-facts-footer" aria-hidden="true">
            <span>NAMETH / PORTFOLIO</span>
            <span className="v2-case-facts-mark" />
          </div>
        </aside>
        <div className="v2-case-narrative">
          <Reveal>
            <h2>{language === "th" ? "เรื่องราวของงานนี้" : "Behind the project"}</h2>
            <p className="v2-case-lead">{project.description}</p>
          </Reveal>
          {project.details.map((detail, index) => (
            <Reveal key={detail} delay={index * 0.075}>
              <div className="v2-case-point">
                <span>0{index + 1}</span><p>{detail}</p>
              </div>
            </Reveal>
          ))}
          <Reveal><p className="v2-case-note">{project.note}</p></Reveal>
          <div className="v2-actions">
            {project.website && <a className="v2-button v2-button-dark" href={project.website} target="_blank" rel="noopener noreferrer">{t("visit")} <ArrowUpRight size={17} aria-hidden="true" /></a>}
            <a className="v2-button v2-button-outline" href={project.repository} target="_blank" rel="noopener noreferrer">{t("source")} <Github size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <ProjectEvidence project={project} />
      <div className="v2-next"><a href={sectionHref("work")} onClick={(event) => { event.preventDefault(); onBackToWork(); }}>{t("navWork")} <ArrowRight size={21} aria-hidden="true" /></a></div>
    </main>
  );
}

export default function PortfolioV2() {
  const { language, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > window.innerHeight * 0.58);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  const projects = getProjects(language);
  const [routeIndex, setRouteIndex] = useState(() => getProjectIndex());
  const project = routeIndex < 0 ? undefined : projects[routeIndex];

  useEffect(() => {
    const handleLocation = () => setRouteIndex(getProjectIndex());
    window.addEventListener("popstate", handleLocation);
    return () => window.removeEventListener("popstate", handleLocation);
  }, []);

  function transition(change: () => void) {
    if (
      typeof document.startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.startViewTransition(change);
    } else {
      change();
    }
  }
  function navigateToProject(index: number) {
    if (!projects[index]) return;
    transition(() => {
      window.history.pushState(null, "", projectHref(index));
      flushSync(() => setRouteIndex(index));
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }
  function navigateHome(section: "home" | "work") {
    transition(() => {
      window.history.pushState(null, "", sectionHref(section));
      flushSync(() => setRouteIndex(-1));
      requestAnimationFrame(() => {
        if (section === "home") window.scrollTo({ top: 0, behavior: "instant" });
        else document.getElementById("work")?.scrollIntoView({ behavior: "instant" });
      });
    });
  }

  return (
    <SmoothScroll>
    <div className={`portfolio-v2 ${project ? "v2-case-page" : "v2-homepage"}`} lang={language}>
      <a className="v2-skip-link" href="#main-content">{language === "th" ? "ข้ามไปยังเนื้อหา" : "Skip to content"}</a>
      <Header caseStudy={Boolean(project)} scrolled={scrolled} onBackToWork={() => navigateHome("work")} onBackToTop={() => navigateHome("home")} />
      {project ? <CaseStudy project={project} onBackToWork={() => navigateHome("work")} /> : (
        <main id="main-content">
          <GlyphHero />
          <SkyIntro />
          <SelectedWork projects={projects} onNavigate={navigateToProject} />
          <Capabilities projects={projects} onNavigate={navigateToProject} />
          <Contact />
        </main>
      )}
      <footer className="v2-footer">
        <a href={homePath} className="v2-brand">{identity.wordmark}</a>
        <span>© {identity.year} {identity.name}</span>
        <a href={project ? sectionHref("home") : "#home"}>{t("top")} ↑</a>
      </footer>
    </div>
    </SmoothScroll>
  );
}
