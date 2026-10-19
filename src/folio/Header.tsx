import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import { SiFacebook, SiGithub, SiInstagram } from "react-icons/si";
import { TbMail } from "react-icons/tb";
import { assetUrl } from "@/lib/assets";
import { useLanguage } from "@/lib/language";
import { identity } from "@/src/v2/content/identity";
import { sectionHref } from "@/src/v2/lib/routes";
import { EMAIL, FACEBOOK, GITHUB, INSTAGRAM, folio, pick } from "@/src/folio/content";
import { EASE } from "@/src/folio/motion";

const NAV = ["about", "skills", "work", "contact"] as const;

/**
 * The top bar: my photo and name, the main links on wide screens, a sliding
 * TH/EN switch, and on phones a menu button that opens a full-screen menu
 * of every section plus my channels.
 */
export default function Header({ onProjectPage, goHome }: { onProjectPage: boolean; goHome: (section: string) => void }) {
  const { language, setLanguage, t } = useLanguage();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  // While the menu is open: lock the page, close on Esc or when the screen gets wide.
  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    const wide = window.matchMedia("(min-width: 761px)");
    const onWide = () => { if (wide.matches) setOpen(false); };
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  /** Goes to a section, from the home page or from a project page. */
  const go = (section: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    if (onProjectPage) {
      goHome(section);
      return;
    }
    window.history.replaceState(null, "", section === "home" ? window.location.pathname : `#${section}`);
    // Wait a frame so the page is unlocked before it scrolls.
    requestAnimationFrame(() => {
      if (section === "home") window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      else document.getElementById(section)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
  };

  return (
    <>
      <header className={"fo-header" + (open ? " is-open" : "")}>
        <a className="fo-brand" href={sectionHref("home")} onClick={go("home")} aria-label={identity.name + ", home"}>
          <span className="fo-brand-avatar" aria-hidden="true">
            <img src={assetUrl("assets/header/avatar.webp")} alt="" width={160} height={160} />
            <i />
          </span>
          <span className="fo-brand-name">NAMETH<b>.</b></span>
        </a>

        <nav className="fo-nav" aria-label={t("navigation")}>
          {NAV.map((id) => (
            <a key={id} href={sectionHref(id)} onClick={go(id)}>{pick(folio.nav[id], language)}</a>
          ))}
        </nav>

        <div className="fo-header-tools">
          <div className="fo-lang" role="group" aria-label={t("language")}>
            {(["th", "en"] as const).map((locale) => {
              const active = language === locale;
              return (
                <button
                  key={locale}
                  type="button"
                  lang={locale}
                  aria-label={locale === "en" ? "English" : "ภาษาไทย"}
                  aria-pressed={active}
                  className={active ? "is-active" : ""}
                  onClick={() => setLanguage(locale)}
                >
                  {active ? (
                    <motion.span
                      layoutId="fo-lang-thumb"
                      className="fo-lang-thumb"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 520, damping: 36 }}
                    />
                  ) : null}
                  <span className="fo-lang-text">{locale.toUpperCase()}</span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className="fo-menu-button"
            aria-expanded={open}
            aria-controls="fo-menu"
            aria-label={language === "th" ? (open ? "ปิดเมนู" : "เปิดเมนู") : open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        {reduce ? null : <motion.span className="fo-progress" style={{ scaleX: progress }} aria-hidden="true" />}
      </header>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="fo-menu"
            className="fo-menu"
            aria-label={t("navigation")}
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          >
            <ol className="fo-menu-list">
              {folio.contents.items.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 + index * 0.04, ease: EASE }}
                >
                  <a href={sectionHref(item.href)} onClick={go(item.href)}>
                    <span className="fo-menu-num">{String(index + 1).padStart(2, "0")}</span>
                    <span className="fo-menu-word" lang="en">{item.word}</span>
                    <span className="fo-menu-desc">{pick(item.desc, language)}</span>
                  </a>
                </motion.li>
              ))}
            </ol>
            <motion.div
              className="fo-menu-foot"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
            >
              <p className="fo-menu-status"><i aria-hidden="true" />{pick(folio.contact.status, language)}</p>
              <div className="fo-menu-socials">
                <a href={`mailto:${EMAIL}`} aria-label="Email"><TbMail aria-hidden="true" /></a>
                <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><SiGithub aria-hidden="true" /></a>
                <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><SiFacebook aria-hidden="true" /></a>
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><SiInstagram aria-hidden="true" /></a>
              </div>
            </motion.div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
