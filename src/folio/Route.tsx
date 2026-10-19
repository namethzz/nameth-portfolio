import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { assetUrl } from "@/lib/assets";
import { useLanguage } from "@/lib/language";
import { folio, pick, sections } from "@/src/folio/content";
import { BlockArrow } from "@/src/folio/decor";
import { EASE, Heading } from "@/src/folio/motion";

/**
 * Education as a route: enrolled, learning now, the internship term, and
 * what comes next. The line between the stops draws itself as you scroll;
 * it runs across on wide screens and down on phones.
 */
export default function Route() {
  const { language, t } = useLanguage();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const e = folio.education;

  return (
    <section className="fo-section is-navy fo-education" id="education" aria-labelledby="fo-education-title">
      <div className="fo-wrap">
        <div className="fo-route-head">
          <Heading id="fo-education-title" word={sections.education.word} label={pick(sections.education.label, language)} fit={44} />
          <BlockArrow className="fo-route-arrow" />
        </div>
        <ol className="fo-route" ref={ref}>
          <motion.span className="fo-route-line" style={reduce ? { "--p": 1 } as never : ({ "--p": progress } as never)} aria-hidden="true" />
          {e.stops.map((stop, index) => (
            <motion.li
              key={stop.when}
              className={"fo-stop" + ("open" in stop ? " is-open" : "") + (stop.when === "NOW" ? " is-now" : "")}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: EASE }}
            >
              <span className="fo-stop-dot" aria-hidden="true" />
              <p className="fo-stop-when" lang="en">{stop.when}</p>
              <p className="fo-stop-tag">{pick(stop.tag, language)}</p>
              <h3 className="fo-label">{pick(stop.title, language)}</h3>
              <p className="fo-stop-text">{"text" in stop ? pick(stop.text, language) : t("learning")}</p>
              {"open" in stop ? (
                <p className="fo-open-pill"><span aria-hidden="true" />{pick(stop.open, language)}</p>
              ) : null}
              {stop.when === "NOW" ? (
                <div className="fo-mini-browser">
                  <span className="fo-mini-bar" aria-hidden="true"><i /><i /><i /></span>
                  <img src={assetUrl("assets/work/thaitay-material.jpg")} alt={pick(e.nowAlt, language)} loading="lazy" decoding="async" width={1440} height={900} />
                </div>
              ) : null}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
