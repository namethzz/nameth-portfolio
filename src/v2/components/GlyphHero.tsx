import { ArrowUpRight, Download } from "lucide-react";
import { useEffect, useState } from "react";
import GlyphPortal from "@/components/ui/glyph-portal";
import { assetUrl } from "@/lib/assets";
import { useLanguage } from "@/lib/language";
import { identity } from "@/src/v2/content/identity";

// The portal measures the letters once when it mounts, so the face must be
// loaded first; Manrope 700 is the heaviest weight the site ships.
const FONT = '"Manrope", "Arial Black", Arial, sans-serif';
let fontLoad: Promise<unknown> | undefined;

/**
 * The opening: NAMETH on paper. Scrolling flies the camera into one of its
 * letters, and the inside of the letter is the sky the About section starts
 * in, so the page falls through the name into the sky.
 */
export default function GlyphHero() {
  const { language, t } = useLanguage();
  const thai = language === "th";
  const [fontReady, setFontReady] = useState(false);

  useEffect(() => {
    let live = true;
    const done = () => { if (live) setFontReady(true); };
    fontLoad ??= document.fonts?.load(`700 100px "Manrope"`, "NAMETH") ?? Promise.resolve();
    // Never hold the page on a slow font: fall back to the static poster.
    const timeout = window.setTimeout(done, 1600);
    void fontLoad.then(done, done);
    return () => { live = false; clearTimeout(timeout); };
  }, []);

  return (
    <div className="v2-glyph-hero" id="home">
      {fontReady ? (
        <GlyphPortal
          word="NAMETH"
          fontFamily={FONT}
          fontWeight={700}
          scrollLength={1.7}
          enterLabel={thai ? "เลื่อนลงเพื่อเข้าไปข้างใน" : "Scroll to step inside"}
          style={{
            "--gp-paper": "var(--nm-paper)",
            "--gp-ink": "var(--nm-ink)",
            "--gp-field": "#3876ba",
            "--gp-foreground": "#fff",
          }}
          background={<span className="v2-glyph-sky" />}
          front={
            <div className="v2-glyph-front">
              <p className="v2-glyph-eyebrow">
                {identity.headline} / {identity.year}
                <span aria-hidden="true"> · </span>
                {identity.roles.join(" · ")}
              </p>
              <div className="v2-glyph-below">
                <h1>{identity.name}</h1>
                <p className="v2-glyph-availability">
                  <span className="v2-availability-dot" aria-hidden="true" />
                  {thai
                    ? "มองหาที่ฝึกงาน Full-stack / Data / AI Engineering · 4 ม.ค. – 23 เม.ย. 2570"
                    : "Looking for a Full-stack / Data / AI Engineering internship · Jan 4 – Apr 23, 2027"}
                </p>
                <nav className="v2-glyph-actions" aria-label={thai ? "ลิงก์สำคัญ" : "Explore portfolio"}>
                  <a className="v2-glyph-action is-primary" href="#work">
                    {t("exploreWork")} <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
                  </a>
                  <a className="v2-glyph-action" href={assetUrl("assets/resume.pdf")} download="resume.pdf">
                    {t("resume")} <Download aria-hidden="true" size={16} strokeWidth={1.8} />
                  </a>
                </nav>
              </div>
            </div>
          }
        >
          <div className="v2-glyph-inside">
            <p className="v2-glyph-greeting">{thai ? "สวัสดี!" : "HELLO!"}</p>
            <p className="v2-glyph-intro">{t("heroDescription")}</p>
          </div>
        </GlyphPortal>
      ) : (
        <div className="v2-glyph-placeholder" aria-hidden="true" />
      )}
    </div>
  );
}
