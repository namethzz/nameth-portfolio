import { motion, useReducedMotion } from "framer-motion";
import { assetUrl } from "@/lib/assets";
import { useLanguage } from "@/lib/language";
import { identityCopy } from "@/src/v2/content/identity";
import { THAI_NAME, folio, pick, sections } from "@/src/folio/content";
import { Contours, Guilloche } from "@/src/folio/decor";
import { EASE, Heading, Reveal } from "@/src/folio/motion";

/** Where each stamp lands on the visa page (desktop), and how it's tilted. */
const STAMPS = [
  { shape: "round", ink: "red", x: 3, y: 4, r: -12 },
  { shape: "rect", ink: "navy", x: 46, y: 6, r: 7 },
  { shape: "rect", ink: "red", x: 24, y: 68, r: 5 },
  { shape: "round", ink: "navy", x: 64, y: 40, r: -8 },
] as const;

/**
 * About me as an open passport: the data page with my photo and details on
 * the left, and a visa page on the right where my hobbies are ink stamps and
 * the long-term goal is the next destination.
 */
export default function Passport() {
  const { language, t } = useLanguage();
  const reduce = useReducedMotion();
  const a = folio.about;
  const p = a.pass;
  const stamp = (index: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, scale: 1.9 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true, amount: 0.4 },
          transition: { type: "spring" as const, stiffness: 420, damping: 18, delay: 0.25 + index * 0.18 },
        };

  return (
    <section className="fo-section is-mist fo-about" id="about" aria-labelledby="fo-about-title">
      <Contours className="fo-about-contours" rings={11} seed={1.3} />
      {/* Roughens the stamp edges so they read as ink, not vector boxes. */}
      <svg className="fo-ink-defs" aria-hidden="true" focusable="false">
        <filter id="fo-ink">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="2.4" />
        </filter>
      </svg>
      <div className="fo-wrap">
        <div className="fo-about-head">
          <Heading id="fo-about-title" word={sections.about.word} label={pick(sections.about.label, language)} fit={48} />
          <div className="fo-copy">
            <Reveal as="p">{identityCopy[language].aboutBody}</Reveal>
            <Reveal as="p" delay={0.06}>{t("about3")}</Reveal>
          </div>
        </div>

        <motion.div
          className="fo-pass"
          initial={reduce ? false : { opacity: 0, y: 60, rotate: 3 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE }}
        >
          {/* Data page. */}
          <div className="fo-pass-page is-data">
            <div className="fo-pass-head">
              <span>{pick(p.title, language)}</span>
              <span className="fo-pass-no">{p.number}</span>
            </div>
            <div className="fo-pass-body">
              <div className="fo-pass-photo">
                <Guilloche />
                <img src={assetUrl("assets/hero/portrait.webp")} alt={pick(p.photoAlt, language)} width={838} height={841} loading="lazy" decoding="async" />
              </div>
              <dl className="fo-pass-fields">
                <div className="is-wide"><dt>{pick(p.surname, language)}</dt><dd lang="en">WONGMONGKOL</dd></div>
                <div className="is-wide"><dt>{pick(p.given, language)}</dt><dd lang="en">NAMETH</dd></div>
                <div className="is-wide"><dt>{pick(p.thai, language)}</dt><dd lang="th">{THAI_NAME}</dd></div>
                {a.facts.map((fact) => (
                  <div key={fact.key.en} className={fact.key.en === "Focus" ? "is-wide" : undefined}>
                    <dt>{pick(fact.key, language)}</dt>
                    <dd>{pick(fact.value, language)}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="fo-pass-mrz" aria-hidden="true">
              {p.mrz.map((line) => <span key={line}>{line}</span>)}
            </div>
          </div>

          {/* Visa page: hobbies as stamps, the goal as the next destination. */}
          <div className="fo-pass-page is-visa">
            <Guilloche className="is-faint" />
            <h3 className="fo-pass-visa-title">{pick(a.stampsTitle, language)}</h3>
            <ul className="fo-stamps">
              {a.hobbies.map((hobby, index) => {
                const place = STAMPS[index];
                return (
                  <motion.li
                    key={hobby.en}
                    className={`fo-stamp is-${place.shape} is-${place.ink}`}
                    style={{ "--x": `${place.x}%`, "--y": `${place.y}%`, "--r": `${place.r}deg` } as never}
                    {...stamp(index)}
                  >
                    <span className="fo-stamp-small">NW · {String(index + 1).padStart(2, "0")}</span>
                    <span className="fo-stamp-big">{pick(hobby, language)}</span>
                  </motion.li>
                );
              })}
            </ul>
            <motion.div className="fo-stamp is-goal" {...stamp(4)}>
              <span className="fo-stamp-big">{pick(a.goalStamp, language)}</span>
            </motion.div>
            <p className="fo-pass-goal">{pick(a.goal, language)}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
