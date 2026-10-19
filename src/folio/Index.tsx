import { motion, useReducedMotion } from "framer-motion";
import { TbArrowDownRight } from "react-icons/tb";
import { useLanguage } from "@/lib/language";
import { identityCopy } from "@/src/v2/content/identity";
import { folio, pick, sections } from "@/src/folio/content";
import { Globe } from "@/src/folio/decor";
import { EASE, Heading, Reveal } from "@/src/folio/motion";

/**
 * The table of contents as a magazine index: one big row per section with a
 * page number and a dotted leader. Each row is a large tap target on phones
 * and fills with navy on hover or focus on desktop.
 */
export default function Index() {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const c = folio.contents;
  return (
    <section className="fo-section is-mist fo-contents" id="contents" aria-labelledby="fo-contents-title">
      <div className="fo-wrap">
        <div className="fo-index-side">
          <Heading id="fo-contents-title" word={"TABLE\nOF CONTENTS"} label={pick(sections.contents.label, language)} fit={40} />
          <Reveal className="fo-principles">
            <h3 className="fo-kicker">{pick(c.principlesTitle, language)}</h3>
            <ul>
              {identityCopy[language].values.map((value) => (
                <li key={value.id}><strong>{value.title}</strong> {value.description}</li>
              ))}
            </ul>
          </Reveal>
          <Globe className="fo-index-globe" />
        </div>
        <nav aria-labelledby="fo-contents-title">
          <ol className="fo-index">
            {c.items.map((item, index) => (
              <motion.li
                key={item.href}
                initial={reduce ? false : { opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: index * 0.05, ease: EASE }}
              >
                <a className="fo-index-row" href={`#${item.href}`}>
                  <span className="fo-index-num">{String(index + 1).padStart(2, "0")}</span>
                  <span className="fo-index-word" lang="en">{item.word}</span>
                  <span className="fo-index-leader" aria-hidden="true" />
                  <span className="fo-index-desc">{pick(item.desc, language)}</span>
                  <TbArrowDownRight aria-hidden="true" className="fo-index-arrow" />
                </a>
              </motion.li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
