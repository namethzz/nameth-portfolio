import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import { SiFacebook, SiGithub, SiInstagram } from "react-icons/si";
import { TbArrowUpRight, TbCheck, TbCopy, TbDownload, TbMail } from "react-icons/tb";
import { assetUrl } from "@/lib/assets";
import { useLanguage } from "@/lib/language";
import { EMAIL, FACEBOOK, GITHUB, HANDLE, INSTAGRAM, folio, pick, sections } from "@/src/folio/content";
import { Torus } from "@/src/folio/decor";
import { EASE, Heading, Reveal } from "@/src/folio/motion";

type Social = { name: string; handle: string; href: string; icon: IconType; tone: string };

/** Each channel in its own brand colour. */
const SOCIALS: Social[] = [
  { name: "GitHub", handle: HANDLE, href: GITHUB, icon: SiGithub, tone: "#0d1117" },
  { name: "Facebook", handle: "Nameth Wongmongkol", href: FACEBOOK, icon: SiFacebook, tone: "#1877f2" },
  { name: "Instagram", handle: "@nameth_z", href: INSTAGRAM, icon: SiInstagram, tone: "linear-gradient(135deg, #feda75, #fa7e1e 25%, #d62976 50%, #962fbf 75%, #4f5bd5)" },
];

/**
 * Contact, kept to one clear action: a big email card (tap to write, or
 * copy the address), three channels as app-style tiles, and the résumé.
 */
export default function Contact() {
  const { language } = useLanguage();
  const c = folio.contact;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      return;
    } catch {
      // Older browsers, or no clipboard permission: copy from a hidden field.
    }
    const field = document.createElement("textarea");
    field.value = EMAIL;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    field.remove();
    setCopied(ok);
  }

  return (
    <section className="fo-section is-mist fo-contact" id="contact" aria-labelledby="fo-contact-title">
      <Torus className="fo-contact-torus" />
      <div className="fo-wrap">
        <Heading id="fo-contact-title" word={sections.contact.word} label={pick(sections.contact.label, language)} fit={88} />

        <div className="fo-contact-grid">
          <div className="fo-contact-intro">
            <Reveal as="p" className="fo-contact-status"><i aria-hidden="true" />{pick(c.status, language)}</Reveal>
            <Reveal as="p" className="fo-lead" delay={0.05}>{pick(c.lead, language)}</Reveal>
            <Reveal delay={0.1}>
              <a className="fo-contact-resume" href={assetUrl("assets/resume.pdf")} download="resume.pdf">
                <TbDownload aria-hidden="true" /> {pick(c.resume, language)}
              </a>
            </Reveal>
          </div>

          <div className="fo-contact-channels">
            <Reveal className="fo-mailcard">
              <a className="fo-mailcard-main" href={`mailto:${EMAIL}`}>
                <span className="fo-mailcard-icon" aria-hidden="true"><TbMail /></span>
                <span className="fo-mailcard-text">
                  <span className="fo-mailcard-label">{pick(c.email, language)}</span>
                  <span className="fo-mailcard-address">{EMAIL}</span>
                </span>
                <span className="fo-mailcard-go">{pick(c.send, language)} <TbArrowUpRight aria-hidden="true" /></span>
              </a>
              <button type="button" className={"fo-mailcard-copy" + (copied ? " is-done" : "")} onClick={copy} aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "done" : "copy"}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.2, ease: EASE }}
                  >
                    {copied ? <TbCheck aria-hidden="true" /> : <TbCopy aria-hidden="true" />}
                    {pick(copied ? c.copied : c.copy, language)}
                  </motion.span>
                </AnimatePresence>
              </button>
            </Reveal>

            <h3 className="fo-kicker fo-contact-kicker">{pick(c.socials, language)}</h3>
            <ul className="fo-socials">
              {SOCIALS.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Reveal as="li" key={social.name} delay={0.08 + index * 0.06}>
                    <a className="fo-social" href={social.href} target="_blank" rel="noopener noreferrer" style={{ "--tone": social.tone } as CSSProperties}>
                      <span className="fo-social-icon" aria-hidden="true"><Icon /></span>
                      <span className="fo-social-name">{social.name}</span>
                      <span className="fo-social-handle">{social.handle}</span>
                      <TbArrowUpRight aria-hidden="true" className="fo-social-arrow" />
                    </a>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
