import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useLanguage } from "@/lib/language";
import { getProjects } from "@/lib/projects";
import { identity } from "@/src/v2/content/identity";
import { getProjectIndex, homePath, projectHref, sectionHref } from "@/src/v2/lib/routes";
import { EMAIL, GITHUB, folio, pick } from "@/src/folio/content";
import Home from "@/src/folio/Home";
import ProjectPage from "@/src/folio/ProjectPage";

/**
 * The portfolio as a printed editorial layout: navy and pale-blue spreads,
 * giant condensed headings, black-and-white photos. The home page and each
 * project page share this shell.
 */
export default function Site() {
  const { language, setLanguage, t } = useLanguage();
  const projects = getProjects(language);
  const [routeIndex, setRouteIndex] = useState(() => getProjectIndex());
  const project = routeIndex < 0 ? undefined : projects[routeIndex];
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    const handleLocation = () => setRouteIndex(getProjectIndex());
    window.addEventListener("popstate", handleLocation);
    return () => window.removeEventListener("popstate", handleLocation);
  }, []);

  function transition(change: () => void) {
    if (typeof document.startViewTransition === "function" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.startViewTransition(change);
    } else {
      change();
    }
  }
  function openProject(index: number) {
    if (!projects[index]) return;
    transition(() => {
      window.history.pushState(null, "", projectHref(index));
      flushSync(() => setRouteIndex(index));
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }
  /** Leaves a project page for a section of the home page. */
  function goHome(section: string) {
    transition(() => {
      window.history.pushState(null, "", section === "home" ? homePath : sectionHref(section));
      flushSync(() => setRouteIndex(-1));
      if (section === "home") window.scrollTo({ top: 0, behavior: "instant" });
      else document.getElementById(section)?.scrollIntoView({ behavior: "instant" });
    });
  }

  const navigation = [
    { id: "about", label: pick(folio.nav.about, language) },
    { id: "skills", label: pick(folio.nav.skills, language) },
    { id: "work", label: pick(folio.nav.work, language) },
    { id: "contact", label: pick(folio.nav.contact, language) },
  ];

  return (
    <div className="fo-site" lang={language}>
      <a className="fo-skip" href="#main-content">{pick(folio.skip, language)}</a>
      <header className="fo-header">
        <a
          className="fo-brand"
          href={sectionHref("home")}
          onClick={(event) => {
            if (!project) return;
            event.preventDefault();
            goHome("home");
          }}
          aria-label={identity.name + " — home"}
        >
          NAMETH
        </a>
        <nav className="fo-nav" aria-label={t("navigation")}>
          {navigation.map((item) => (
            <a
              key={item.id}
              href={sectionHref(item.id)}
              onClick={(event) => {
                if (!project) return;
                event.preventDefault();
                goHome(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="fo-lang" role="group" aria-label={t("language")}>
          {(["th", "en"] as const).map((locale) => (
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
        {reduce ? null : <motion.span className="fo-progress" style={{ scaleX: progress }} aria-hidden="true" />}
      </header>

      {project ? (
        <ProjectPage
          project={project}
          index={routeIndex}
          total={projects.length}
          next={projects[(routeIndex + 1) % projects.length]}
          onBack={() => goHome("work")}
          onOpen={openProject}
        />
      ) : (
        <Home projects={projects} onOpen={openProject} />
      )}

      <footer className="fo-footer">
        <span>© {identity.year} {identity.name}</span>
        <span className="fo-footer-links">
          <a href={`mailto:${EMAIL}`}>Email</a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={project ? sectionHref("home") : "#home"}>{pick(folio.top, language)} ↑</a>
        </span>
      </footer>
    </div>
  );
}
