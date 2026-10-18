import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Download, GitBranch as Github, Mail } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Reveal from "@/src/v2/components/Reveal";
import SelectedWork from "@/src/v2/components/SelectedWork";
import Capabilities from "@/src/v2/components/Capabilities";
import SkyIntro from "@/src/v2/components/SkyIntro";
import Planet from "@/src/v2/components/Planet";
import ProjectEvidence from "@/src/v2/components/ProjectEvidence";
import { assetUrl } from "@/lib/assets";
import { useLanguage } from "@/lib/language";
import { getProjects, projectTotal } from "@/lib/projects";
import WavingPortfolioLanding from "@/components/ui/waving-portfolio-landing";
import { identity } from "@/src/v2/content/identity";
import { getProjectIndex, homePath, projectHref, sectionHref } from "@/src/v2/lib/routes";

type Project = ReturnType<typeof getProjects>[number];

function Header({ caseStudy, scrolled, onBackToWork, onBackToTop }: { caseStudy: boolean; scrolled: boolean; onBackToWork: () => void; onBackToTop: () => void }) {
  const { language, setLanguage, t } = useLanguage();
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
  const openingRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(false);
  const [focusRequested, setFocusRequested] = useState(false);
  const revealCopy = introComplete || Boolean(prefersReducedMotion) || focusRequested;
  // Text arrives after the poster's actual completion callback, not an
  // independent timeout that could drift out of sync with the intro.
  const revealVariants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
  const revealTransition = (delay: number) => ({
    duration: prefersReducedMotion ? 0 : 0.68,
    delay: prefersReducedMotion || focusRequested ? 0 : delay,
    ease: "easeOut" as const,
  });
  const { scrollYProgress } = useScroll({
    target: openingRef,
    // The scene stays pinned for the opening's extra scroll distance.
    offset: ["start start", "end end"],
  });
  const posterScale = useTransform(scrollYProgress, [0, 0.46, 1], [1, 1, 0.91]);
  const posterY = useTransform(scrollYProgress, [0, 0.46, 1], ["0%", "0%", "-5%"]);
  const posterOpacity = useTransform(scrollYProgress, [0, 0.56, 1], [1, 1, 0.55]);
  const captionOpacity = useTransform(scrollYProgress, [0, 0.52, 0.88], [1, 1, 0]);
  const stickyRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The intro copy's height depends on language, fonts and zoom, so the
    // poster reads how much of the bottom it takes and stays clear of it.
    const sticky = stickyRef.current;
    const actions = actionsRef.current;
    if (!sticky || !actions) return;
    const update = () => {
      sticky.style.setProperty("--v2-copy-clearance", `${sticky.clientHeight - actions.offsetTop}px`);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(sticky);
    observer.observe(actions);
    void document.fonts?.ready.then(update);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="v2-opening" ref={openingRef} id="home" aria-label={t("introduction")}>
      <div className="v2-hero-sticky" ref={stickyRef}>
        <motion.div
          className="v2-opening-art"
          style={prefersReducedMotion ? undefined : {
            scale: posterScale,
            y: posterY,
            opacity: posterOpacity,
          }}
        >
          <WavingPortfolioLanding
            name={identity.name}
            year="PORTFOLIO / 2026"
            roles={["FULL-STACK DEVELOPER", "DATA & AI ENGINEERING"]}
            greeting={language === "th" ? "สวัสดี!" : "HELLO!"}
            title="Portfolio"
            signature="NA/METH"
            accent="#B84F3A"
            paper="#F5F1E8"
            ink="#1E292C"
            height="100%"
            onIntroChange={setIntroComplete}
          />
        </motion.div>
        <motion.div
          ref={actionsRef}
          className="v2-opening-actions"
          style={prefersReducedMotion ? undefined : { opacity: captionOpacity }}
          onFocusCapture={() => setFocusRequested(true)}
        >
          <motion.div
            className="v2-opening-message"
            initial="hidden"
            animate={revealCopy ? "visible" : "hidden"}
            variants={revealVariants}
            transition={revealTransition(0.06)}
          >
            <p>{t("heroDescription")}</p>
            <p className="v2-internship-line">
              <span className="v2-availability-dot" aria-hidden="true" />
              {language === "th"
                ? "มองหาที่ฝึกงาน Full-stack / Data / AI Engineering"
                : "Looking for a Full-stack / Data / AI Engineering internship"}
            </p>
            <p className="v2-internship-dates">
              {language === "th" ? "พร้อมฝึกงาน 4 ม.ค. – 23 เม.ย. 2570" : "Available Jan 4 – Apr 23, 2027"}
            </p>
          </motion.div>
          <nav className="v2-opening-links" aria-label={language === "th" ? "ลิงก์สำคัญ" : "Explore portfolio"}>
            <motion.a
              className="v2-editorial-action v2-editorial-primary"
              href="#work"
              initial="hidden"
              animate={revealCopy ? "visible" : "hidden"}
              variants={revealVariants}
              transition={revealTransition(0.26)}
            >
              <span className="v2-action-number" aria-hidden="true">01</span>
              <span className="v2-action-label">{t("exploreWork")}</span>
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.7} />
            </motion.a>
            <motion.a
              className="v2-editorial-action v2-editorial-secondary"
              href={assetUrl("assets/resume.pdf")}
              download="resume.pdf"
              initial="hidden"
              animate={revealCopy ? "visible" : "hidden"}
              variants={revealVariants}
              transition={revealTransition(0.43)}
            >
              <span className="v2-action-number" aria-hidden="true">02</span>
              <span className="v2-action-label">{t("resume")}</span>
              <Download aria-hidden="true" size={17} strokeWidth={1.7} />
            </motion.a>
          </nav>
        </motion.div>
        <motion.a
          className="v2-opening-scroll"
          href="#about"
          initial="hidden"
          animate={revealCopy ? "visible" : "hidden"}
          variants={revealVariants}
          transition={revealTransition(0.69)}
          onFocus={() => setFocusRequested(true)}
        >
          <span className="v2-scroll-stem" aria-hidden="true" />
          <span className="v2-scroll-text">{t("scroll")}</span>
          <ArrowDown aria-hidden="true" size={15} strokeWidth={1.7} />
        </motion.a>
      </div>
    </section>
  );
}


function Contact() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  return (
    <motion.section
      className="v2-contact"
      id="contact"
      aria-labelledby="v2-contact-heading"
      initial={reduce ? false : { backgroundColor: "#EAE4D9" }}
      whileInView={reduce ? undefined : { backgroundColor: "#D6DDD3" }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: reduce ? 0 : 1.1 }}
    >
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
    </motion.section>
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
    <div className={`portfolio-v2 ${project ? "v2-case-page" : "v2-homepage"}`} lang={language}>
      <a className="v2-skip-link" href="#main-content">{language === "th" ? "ข้ามไปยังเนื้อหา" : "Skip to content"}</a>
      <Header caseStudy={Boolean(project)} scrolled={scrolled} onBackToWork={() => navigateHome("work")} onBackToTop={() => navigateHome("home")} />
      {project ? <CaseStudy project={project} onBackToWork={() => navigateHome("work")} /> : (
        <main id="main-content">
          <Hero />
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
  );
}
