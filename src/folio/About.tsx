import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { useState } from "react";
import { TbArrowRight, TbRotate } from "react-icons/tb";
import { assetUrl } from "@/lib/assets";
import { useLanguage } from "@/lib/language";
import { identityCopy } from "@/src/v2/content/identity";
import { THAI_NAME, folio, pick, sections } from "@/src/folio/content";
import { Barcode, Contours, Guilloche } from "@/src/folio/decor";
import { EASE, Heading, Reveal } from "@/src/folio/motion";

/** How each print lies in the pile when it is on top. */
const TILT = [-4, 3.5, -1.5];
/** Where the prints underneath peek out. */
const BEHIND = [
  { x: 0, y: 0, rotate: 0, scale: 1 },
  { x: 22, y: 14, rotate: 6, scale: 0.96 },
  { x: -20, y: 26, rotate: -7, scale: 0.92 },
];

/**
 * About me: my words, a pile of real photos you can swipe or tap through,
 * and a developer ID card that flips over to show what I do away from the
 * keyboard and where I'm heading.
 */
export default function About() {
  const { language, t } = useLanguage();
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
        <div className="fo-about-intro">
          <Heading id="fo-about-title" word={sections.about.word} label={pick(sections.about.label, language)} fit={50} />
          <div className="fo-copy">
            <Reveal as="p">{identityCopy[language].aboutBody}</Reveal>
            <Reveal as="p" delay={0.06}>{t("about3")}</Reveal>
          </div>
        </div>
        <PhotoStack />
        <IdCard />
      </div>
    </section>
  );
}

function PhotoStack() {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const photos = folio.about.photos;
  const [order, setOrder] = useState(() => photos.items.map((_, index) => index));
  const next = () => setOrder((current) => [...current.slice(1), current[0]]);
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 70 || Math.abs(info.velocity.x) > 450) next();
  };

  return (
    <motion.div
      className="fo-photos"
      initial={reduce ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="fo-photo-pile">
        {order.map((photoIndex, depth) => {
          const photo = photos.items[photoIndex];
          const top = depth === 0;
          const place = BEHIND[depth] ?? BEHIND[BEHIND.length - 1];
          return (
            <motion.figure
              key={photo.src}
              className={"fo-print" + (top ? " is-top" : "")}
              style={{ zIndex: photos.items.length - depth }}
              animate={{ x: place.x, y: place.y, rotate: TILT[photoIndex] + place.rotate, scale: place.scale }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 26 }}
              drag={top && !reduce ? "x" : false}
              dragSnapToOrigin
              dragElastic={0.7}
              onDragEnd={onDragEnd}
              onTap={top ? next : undefined}
              whileDrag={{ scale: 1.03, cursor: "grabbing" }}
              aria-hidden={!top}
            >
              <img src={assetUrl(photo.src)} alt={pick(photo.alt, language)} width={photo.width} height={photo.height} loading="lazy" decoding="async" draggable={false} />
              <figcaption>
                <span className="fo-print-tag" lang="en">{photo.tag}</span>
                <span className="fo-print-caption">{pick(photo.caption, language)}</span>
              </figcaption>
            </motion.figure>
          );
        })}
      </div>
      <div className="fo-photo-controls">
        <span className="fo-photo-count">{String(order[0] + 1).padStart(2, "0")} / {String(photos.items.length).padStart(2, "0")}</span>
        <span className="fo-photo-hint">{pick(photos.hint, language)}</span>
        <button type="button" className="fo-round-button" onClick={next} aria-label={language === "th" ? "รูปถัดไป" : "Next photo"}>
          <TbArrowRight aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}

function IdCard() {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const a = folio.about;
  const [flipped, setFlipped] = useState(false);
  const flip = () => setFlipped((value) => !value);

  return (
    <motion.div
      className="fo-id"
      initial={reduce ? false : { opacity: 0, y: 40, rotate: 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className={"fo-id-card" + (flipped ? " is-flipped" : "")} onClick={flip}>
        {/* Front: the ID itself. */}
        <div className="fo-id-face is-front" aria-hidden={flipped}>
          <Guilloche />
          <div className="fo-id-head">
            <span>{pick(a.card.title, language)}</span>
            <span className="fo-id-no">{a.card.number}</span>
          </div>
          <div className="fo-id-body">
            <img className="fo-id-photo" src={assetUrl("assets/about/id-photo.webp")} alt={pick(a.card.photoAlt, language)} width={600} height={800} loading="lazy" decoding="async" />
            <div className="fo-id-info">
              <p className="fo-id-name" lang="en">NAMETH<br />WONGMONGKOL</p>
              <p className="fo-id-thai" lang="th">{THAI_NAME}</p>
              <dl className="fo-id-facts">
                {a.facts.map((fact) => (
                  <div key={fact.key.en}>
                    <dt>{pick(fact.key, language)}</dt>
                    <dd>{pick(fact.value, language)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="fo-id-foot" aria-hidden="true">
            <span className="fo-id-chip" />
            <Barcode code={a.card.number} />
          </div>
        </div>

        {/* Back: hobbies as stamps, and the long-term goal. */}
        <div className="fo-id-face is-back" aria-hidden={!flipped}>
          <Guilloche className="is-faint" />
          <div className="fo-id-head">
            <span>{pick(a.stampsTitle, language)}</span>
            <span className="fo-id-no">{a.card.number}</span>
          </div>
          <ul className="fo-stamps">
            {a.hobbies.map((hobby, index) => (
              <li key={hobby.en} className={`fo-stamp ${index % 2 ? "is-rect" : "is-round"} ${index === 1 || index === 2 ? "is-navy" : "is-red"}`} style={{ "--r": `${[-10, 6, 4, -7][index]}deg`, "--d": `${index * 0.12}s` } as never}>
                <span className="fo-stamp-small">NW · {String(index + 1).padStart(2, "0")}</span>
                <span className="fo-stamp-big">{pick(hobby, language)}</span>
              </li>
            ))}
          </ul>
          <p className="fo-stamp is-goal" style={{ "--r": "-3deg", "--d": "0.5s" } as never}>
            <span className="fo-stamp-big">{pick(a.goalStamp, language)}</span>
          </p>
          <p className="fo-id-goal">{pick(a.goal, language)}</p>
        </div>
      </div>
      <button type="button" className="fo-id-flip" onClick={flip} aria-pressed={flipped}>
        <TbRotate aria-hidden="true" /> {pick(flipped ? a.card.flipBack : a.card.flip, language)}
      </button>
    </motion.div>
  );
}
