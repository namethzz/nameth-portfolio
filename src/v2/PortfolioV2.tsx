import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Download, GitBranch as Github, Mail } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Reveal from "@/src/v2/components/Reveal";
import SelectedWork from "@/src/v2/components/SelectedWork";
import { assetUrl } from "@/lib/assets";
import { useLanguage } from "@/lib/language";
import { getProjects } from "@/lib/projects";
import WavingPortfolioLanding from "@/components/ui/waving-portfolio-landing";
import { identity, identityCopy } from "@/src/v2/content/identity";
import { getProjectIndex, previewPath, projectHref, sectionHref } from "@/src/v2/lib/routes";

type Project = ReturnType<typeof getProjects>[number];

function Header({ caseStudy, scrolled, onBackToWork, onBackToTop }: { caseStudy: boolean; scrolled: boolean; onBackToWork: () => void; onBackToTop: () => void }) {
  const { language, setLanguage, t } = useLanguage();
  const navigation = [
    { href: sectionHref("work"), label: t("navWork") },
    { href: sectionHref("about"), label: t("navAbout") },
    { href: sectionHref("skills"), label: t("navSkills") },
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
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="v2-opening" ref={openingRef} id="home" aria-label={t("introduction")}>
      <div className="v2-hero-sticky">
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
            roles={["SOFTWARE DEVELOPER", "DATA ENTHUSIAST"]}
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
          className="v2-opening-actions"
          style={prefersReducedMotion ? undefined : { opacity: captionOpacity }}
          onFocusCapture={() => setFocusRequested(true)}
        >
          <motion.p
            initial="hidden"
            animate={revealCopy ? "visible" : "hidden"}
            variants={revealVariants}
            transition={revealTransition(0.06)}
          >
            {t("heroDescription")}
          </motion.p>
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
          href="#work"
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
        <motion.div
          className="v2-opening-progress"
          aria-hidden="true"
          style={prefersReducedMotion ? { scaleX: 0 } : { scaleX: progressScale }}
        />
      </div>
    </section>
  );
}


function About() {
  const { language, t } = useLanguage();
  const values = identityCopy[language].values;
  const reduce = useReducedMotion();
  return (
    <section className="v2-section v2-about" id="about" aria-labelledby="v2-about-heading">
      <div>
        <Reveal>
          <p className="v2-kicker">02 / {t("aboutKicker")}</p>
          <h2 id="v2-about-heading">{t("aboutTitle")} <em>{t("aboutEm")}</em></h2>
        </Reveal>
        <Reveal delay={0.18}>
          <img className="v2-profile-image" src={assetUrl("assets/nameth-resume.png")} alt={identity.name} loading="lazy" />
        </Reveal>
      </div>
      <div className="v2-about-copy">
        <Reveal><p>{t("about1")}</p></Reveal>
        <Reveal delay={0.08}><p>{t("about2")}</p></Reveal>
        <Reveal delay={0.13}><p>{t("about3")}</p></Reveal>
        <div className="v2-values">
          {values.map((item, index) => (
            <motion.div
              key={item.id}
              className="v2-value"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : index * 0.09 }}
              whileHover={reduce ? undefined : { y: -5 }}
            >
              <span>0{index + 1}</span><strong>{item.title}</strong>
              <small>{item.description}</small>
            </motion.div>
          ))}
        </div>
        <Reveal><p className="v2-education">{t("degree")}<br />{t("university")}</p></Reveal>
      </div>
    </section>
  );
}

function Skills({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const categories = [
    { title: t("web"), description: t("webDesc"), tools: ["React", "TypeScript", "C#", "ASP.NET Core MVC"], project: projects[2], index: 2 },
    { title: t("data"), description: t("dataDesc"), tools: ["Python", "Pandas", "NumPy", "Google Colab"], project: projects[0], index: 0 },
    { title: t("databases"), description: t("databaseDesc"), tools: ["Git / GitHub", "Docker", "Postman", "n8n"], project: projects[1], index: 1 },
  ];
  return (
    <section className="v2-section v2-skills" id="skills" aria-labelledby="v2-skills-heading">
      <div className="v2-section-heading">
        <Reveal><p className="v2-kicker">03 / {t("capabilities")}</p><h2 id="v2-skills-heading">{t("skillsTitle")}</h2></Reveal>
        <Reveal delay={0.1}><p>{t("skillsIntro")}</p></Reveal>
      </div>
      <div className="v2-skill-grid">
        {categories.map((category, index) => (
          <motion.article
            key={category.title}
            className="v2-skill"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : index * 0.12 }}
            whileHover={reduce ? undefined : { y: -6 }}
          >
            <span className="v2-skill-number">0{index + 1}</span>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            <div className="v2-tags">{category.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
            {category.project && <a className="v2-inline-link" href={projectHref(category.index)}>{category.project.name} <ArrowUpRight aria-hidden="true" size={16} /></a>}
          </motion.article>
        ))}
      </div>
      <Reveal><p className="v2-skill-note">{t("learning")}</p></Reveal>
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
      <Reveal><p className="v2-kicker">04 / {t("contactKicker")}</p></Reveal>
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
  return (
    <main id="main-content" className="v2-case-study">
      <div className="v2-case-hero">
        <a className="v2-inline-link" href={sectionHref("work")} onClick={(event) => { event.preventDefault(); onBackToWork(); }}><ArrowLeft size={17} aria-hidden="true" /> {t("navWork")}</a>
        <p className="v2-kicker">{project.number} / {project.category}</p>
        <h1>{project.name}</h1>
        <p className="v2-case-subtitle">{project.subtitle}</p>
        <img src={project.image} alt={project.alt} width="1800" height="1350" style={{ viewTransitionName: "v2-feature-image" }} />
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
          <SelectedWork projects={projects} onNavigate={navigateToProject} />
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
