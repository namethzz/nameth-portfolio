import { motion, useReducedMotion } from "framer-motion";
import { TbRefresh } from "react-icons/tb";
import { useLanguage } from "@/lib/language";
import { folio, pick, THAI_NAME } from "@/src/folio/content";
import { Flower } from "@/src/folio/decor";
import { EASE, FitWord, Reveal } from "@/src/folio/motion";
import { identity } from "@/src/v2/content/identity";

/**
 * The last screen, like the end of a game: thanks for reading, the proverb
 * I live by, a level bar that never fills, and a button to play again.
 */
export default function Ending() {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const e = folio.ending;
  return (
    <section className="fo-section is-navy fo-ending" aria-labelledby="fo-ending-title">
      <Flower className="fo-ending-flower is-left" />
      <Flower className="fo-ending-flower is-right" />
      <div className="fo-wrap">
        <h2 id="fo-ending-title" className="fo-heading">
          <FitWord text={"THANKS FOR\nREADING"} fit={70} />
          <span className="fo-sr-only">{language === "th" ? "ขอบคุณที่อ่านมาถึงตรงนี้" : "Thanks for reading"}</span>
        </h2>

        <Reveal className="fo-ending-thanks">
          <p>{pick(e.thanks, language)}</p>
        </Reveal>

        <motion.blockquote
          className="fo-proverb"
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {/* One line per half, so the proverb never breaks mid-phrase. */}
          <p className="fo-proverb-th" lang="th">
            {e.proverb.split(" ").map((part, index, parts) => (
              <span key={part}>{index === 0 ? "“" : ""}{part}{index === parts.length - 1 ? "”" : ""}</span>
            ))}
          </p>
          {language === "en" ? <p className="fo-proverb-en">{pick(e.proverbEn, language)}</p> : null}
          <footer>
            <span className="fo-proverb-sign" lang="en">Nameth</span>
            <span>{language === "th" ? THAI_NAME : identity.name}</span>
          </footer>
        </motion.blockquote>

        <Reveal className="fo-endless">
          <div className="fo-endless-top">
            <span className="fo-endless-lv" lang="en">LV. ∞</span>
            <span className="fo-endless-status"><i aria-hidden="true" />{pick(e.status, language)}</span>
          </div>
          <span className="fo-endless-bar" aria-hidden="true"><i /></span>
          <p>{pick(e.farming, language)}</p>
        </Reveal>

        <button
          type="button"
          className="fo-again"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
        >
          <TbRefresh aria-hidden="true" /> {pick(e.again, language)}
        </button>
      </div>
    </section>
  );
}
