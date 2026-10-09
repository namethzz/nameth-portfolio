import { ArrowUpRight, Code2, ExternalLink, Images } from "lucide-react";
import type { getProjects } from "@/lib/projects";
import { useLanguage } from "@/lib/language";
import { getProjectProof } from "@/src/v2/content/proof";
import Reveal from "@/src/v2/components/Reveal";

type Project = ReturnType<typeof getProjects>[number];

/**
 * Evidence before adjectives. Authentic captures and code links from existing
 * public projects; no synthetic results or illustrative images called a demo.
 */
export default function ProjectEvidence({ project }: { project: Project }) {
  const { language } = useLanguage();
  const thai = language === "th";
  const proof = getProjectProof(project.number, language);
  return (
    <section className="v2-proof" aria-labelledby="v2-proof-title">
      <Reveal>
        <div className="v2-proof-head">
          <div>
            <p className="v2-kicker">{thai ? "ดูงานจริง" : "THE WORK / VERIFIED"}</p>
            <h2 id="v2-proof-title">{thai ? "เปิดดูสิ่งที่ผมทำ" : "See how it was built."}</h2>
          </div>
          <div className="v2-proof-stage">
            <span aria-hidden="true" className="v2-proof-stage-dot" />
            <p>{proof.stage}</p>
          </div>
        </div>
      </Reveal>
      {proof.screenshots.length > 0 && (
        <div className="v2-proof-gallery" aria-label={thai ? "ภาพหน้าจอโปรเจกต์จริง" : "Screenshots from the actual project"}>
          {proof.screenshots.map((shot, index) => (
            <Reveal key={shot.src} className={index === 0 ? "v2-proof-gallery-feature" : ""} delay={index * 0.06}>
              <figure className="v2-proof-shot">
                <div className="v2-proof-shot-screen">
                  <span className="v2-proof-window-bar" aria-hidden="true"><i/><i/><i/></span>
                  <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" />
                </div>
                <figcaption>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {shot.caption}
                  <Images aria-hidden="true" size={16} />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      )}
      <div className="v2-proof-source">
        <div className="v2-proof-source-heading">
          <Code2 aria-hidden="true" size={22} />
          <div>
            <h3>{thai ? "โค้ดที่เกี่ยวข้อง" : "Inside the code"}</h3>
            <p>{thai ? "กดดูไฟล์ใน GitHub ได้โดยตรง ไม่ต้องเดาจากภาพปก" : "Open the relevant source files and see how each part works."}</p>
          </div>
        </div>
        <div className="v2-proof-source-grid">
          {proof.engineering.map((item, index) => (
            <Reveal key={item.source} delay={index * 0.055}>
              <a className="v2-proof-code-card" href={item.source} target="_blank" rel="noopener noreferrer">
                <span className="v2-proof-code-index">{String(index + 1).padStart(2, "0")} / SOURCE</span>
                <strong>{item.title}</strong>
                <span className="v2-proof-code-description">{item.description}</span>
                <span className="v2-proof-code-visit">{thai ? "ดู Source Code" : "VIEW SOURCE"} <ExternalLink aria-hidden="true" size={15}/></span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="v2-proof-bottom">
        <span>{thai ? "ต้องการดูภาพรวมของโปรเจกต์?" : "Want the full project?"}</span>
        <div className="v2-proof-bottom-links">
          {project.website && <a href={project.website} target="_blank" rel="noopener noreferrer">{thai ? "เปิดเว็บไซต์จริง" : "Open live project"} <ArrowUpRight aria-hidden="true" size={17}/></a>}
          <a href={project.repository} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight aria-hidden="true" size={17}/></a>
        </div>
      </div>
    </section>
  );
}
