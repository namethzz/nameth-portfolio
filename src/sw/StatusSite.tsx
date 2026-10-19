import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useLanguage } from "@/lib/language";
import { getProjects } from "@/lib/projects";
import { identity } from "@/src/v2/content/identity";
import { getProjectIndex, homePath, projectHref, sectionHref } from "@/src/v2/lib/routes";
import { pick, sw } from "@/src/sw/content";
import Home, { EMAIL, GITHUB } from "@/src/sw/Home";
import QuestDetail from "@/src/sw/QuestDetail";

/**
 * The portfolio as a fantasy-webtoon status screen: a status window, the
 * quest log of projects, skills, passive skills (hobbies), the game I want to
 * build as a locked final quest, and a party invite to get in touch.
 */
export default function StatusSite() {
  const { language, setLanguage, t } = useLanguage();
  const projects = getProjects(language);
  const [routeIndex, setRouteIndex] = useState(() => getProjectIndex());
  const project = routeIndex < 0 ? undefined : projects[routeIndex];

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
  function backToWork() {
    transition(() => {
      window.history.pushState(null, "", sectionHref("work"));
      flushSync(() => setRouteIndex(-1));
      document.getElementById("work")?.scrollIntoView({ behavior: "instant" });
    });
  }

  const navigation = [
    { id: "status", label: pick(sw.nav.status, language) },
    { id: "work", label: pick(sw.nav.quests, language) },
    { id: "skills", label: pick(sw.nav.skills, language) },
    { id: "about", label: pick(sw.nav.passives, language) },
    { id: "contact", label: pick(sw.nav.contact, language) },
  ] as const;

  return (
    <div className="sw-site" lang={language}>
      <a className="sw-skip" href="#main-content">{pick(sw.skip, language)}</a>
      <header className="sw-header">
        <a
          className="sw-brand"
          href={sectionHref("home")}
          onClick={(event) => {
            if (!project) return;
            event.preventDefault();
            transition(() => {
              window.history.pushState(null, "", homePath);
              flushSync(() => setRouteIndex(-1));
              window.scrollTo({ top: 0, behavior: "instant" });
            });
          }}
          aria-label={identity.name + " — home"}
        >
          NAMETH<span aria-hidden="true">_</span>
        </a>
        <nav className="sw-nav" aria-label={t("navigation")}>
          {navigation.map((item) => (
            <a
              key={item.id}
              href={sectionHref(item.id)}
              onClick={(event) => {
                if (!project) return;
                event.preventDefault();
                transition(() => {
                  window.history.pushState(null, "", sectionHref(item.id));
                  flushSync(() => setRouteIndex(-1));
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "instant" });
                });
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="sw-lang" role="group" aria-label={t("language")}>
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
      </header>

      {project ? (
        <QuestDetail
          project={project}
          index={routeIndex}
          total={projects.length}
          nextName={projects[(routeIndex + 1) % projects.length].name}
          onBack={backToWork}
          onOpen={openProject}
        />
      ) : (
        <Home projects={projects} onOpen={openProject} />
      )}

      <footer className="sw-footer">
        <span>© {identity.year} {identity.name}</span>
        <span className="sw-footer-links">
          <a href={`mailto:${EMAIL}`}>Email</a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={project ? sectionHref("home") : "#home"}>{pick(sw.top, language)} ↑</a>
        </span>
      </footer>
    </div>
  );
}
