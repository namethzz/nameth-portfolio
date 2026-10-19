import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import type { IconType } from "react-icons";
import { TbBlocks, TbHammer, TbRobot, TbSword, TbTrendingUp } from "react-icons/tb";
import { useLanguage } from "@/lib/language";
import { folio, pick, sections } from "@/src/folio/content";
import { EASE, Heading, Reveal } from "@/src/folio/motion";

/** The item each stage unlocks, in stage order. */
const ITEMS: IconType[] = [TbSword, TbTrendingUp, TbRobot, TbBlocks, TbHammer];

/**
 * How I think, told the way I used to play: five stages from farming levels
 * in games to the way I learn and build now. A game HUD sits beside them;
 * the level, the XP bar and the inventory fill up as you scroll through.
 */
export default function Mindset() {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const m = folio.mindset;
  const total = m.stages.length;
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 65%"] });
  const xp = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const [level, setLevel] = useState(reduce ? total : 1);
  const [percent, setPercent] = useState(reduce ? 100 : 0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduce) return;
    setLevel(Math.min(total, Math.max(1, Math.floor(value * total) + 1)));
    setPercent(Math.round(Math.min(1, Math.max(0, value)) * 100));
  });

  return (
    <section className="fo-section is-navy fo-mindset" id="mindset" aria-labelledby="fo-mindset-title">
      <div className="fo-wrap">
        <div className="fo-mindset-head">
          <Heading id="fo-mindset-title" word={sections.mindset.word} label={pick(sections.mindset.label, language)} fit={50} />
          <Reveal as="p" className="fo-lead">{pick(m.lead, language)}</Reveal>
        </div>

        <div className="fo-mindset-grid">
          <aside className="fo-hud" aria-hidden="true">
            <div className="fo-hud-level">
              <span className="fo-hud-label">{pick(m.hud.level, language)}</span>
              <span className="fo-hud-lv">
                LV.
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.b
                    key={level}
                    initial={{ y: "70%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-70%", opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    {String(level).padStart(2, "0")}
                  </motion.b>
                </AnimatePresence>
              </span>
              <span className="fo-hud-of">/ {String(total).padStart(2, "0")}</span>
            </div>
            <p className="fo-hud-quest">{pick(m.stages[level - 1].title, language)}</p>
            <div className="fo-xp">
              <span className="fo-hud-label">{pick(m.hud.xp, language)}</span>
              <span className="fo-xp-bar"><motion.i style={{ scaleX: reduce ? 1 : xp }} /></span>
              <span className="fo-xp-num">{percent}%</span>
            </div>
            <div className="fo-inventory">
              <span className="fo-hud-label">{pick(m.hud.inventory, language)}</span>
              <ul>
                {ITEMS.map((Icon, index) => (
                  <li key={index} className={index < level ? "is-unlocked" : ""}>
                    <Icon />
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <ol className="fo-stages" ref={ref}>
            {m.stages.map((stage, index) => {
              const Icon = ITEMS[index];
              return (
                <li key={stage.title.en} className={"fo-stage" + (index < level ? " is-reached" : "")}>
                  <div className="fo-stage-top">
                    <span className="fo-stage-lv" lang="en">LV.{String(index + 1).padStart(2, "0")}</span>
                    <span className="fo-stage-item"><Icon aria-hidden="true" /> +1 {pick(stage.item, language)}</span>
                  </div>
                  <h3 className="fo-stage-title">{pick(stage.title, language)}</h3>
                  <p>{pick(stage.text, language)}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
