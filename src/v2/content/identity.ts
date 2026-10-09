import type { Language } from "@/lib/content";
import { getProjects } from "@/lib/projects";

/**
 * Canonical brand metadata for Portfolio v2.
 * Existing bilingual project descriptions stay in lib/content.ts.
 */
export const identity = {
  name: "Nameth Wongmongkol",
  wordmark: "NAMETH®",
  headline: "PORTFOLIO",
  year: "2026",
  roles: ["Software Developer", "Data Enthusiast"],
  coreValues: ["curiosity", "craftsmanship", "purpose", "responsibility"],
} as const;

export const identityCopy = {
  en: {
    motto: "I start with curiosity, build with care, and create with purpose.",
    heroIntro: "I build digital experiences with care, clarity, and curiosity.",
    aboutHeadline: "Curious enough to start. Careful enough to finish.",
    aboutBody:
      "I enjoy starting from zero, teaching myself what I do not yet know, and turning ideas into useful work. I aim to deliver work I can stand behind and contribute to the people around me.",
    values: [
      { id: "curiosity", title: "Curiosity", description: "Learning by exploring and doing." },
      { id: "craftsmanship", title: "Craftsmanship", description: "Caring about quality and the details." },
      { id: "purpose", title: "Purpose", description: "Building things people can actually use." },
      { id: "responsibility", title: "Responsibility", description: "Following through and supporting the team." },
    ],
    actions: { work: "Explore Work", resume: "Download Resume", contact: "Contact Me" },
    sectionLabels: { work: "Selected Work", about: "About Me", skills: "Capabilities", contact: "Contact" },
    contactHeadline: "Have something in mind?",
    contactDescription: "Let's create something meaningful.",
  },
  th: {
    motto: "เริ่มต้นด้วยความอยากรู้ ลงมือสร้างด้วยความใส่ใจ และมุ่งให้สิ่งที่ทำมีประโยชน์จริง",
    heroIntro: "ผมชอบสร้างประสบการณ์ดิจิทัลที่มีประโยชน์ ด้วยความใส่ใจ ความชัดเจน และความอยากเรียนรู้",
    aboutHeadline: "กล้าที่จะเริ่มจากศูนย์ และตั้งใจทำให้ดีจนจบ",
    aboutBody:
      "ผมชอบเริ่มต้นสิ่งใหม่ เรียนรู้ด้วยตัวเองในสิ่งที่ยังไม่เป็น และเปลี่ยนไอเดียให้เป็นงานที่ใช้ประโยชน์ได้จริง ผมให้ความสำคัญกับคุณภาพของสิ่งที่ส่งต่อ และอยากเป็นคนที่ช่วยทีมได้",
    values: [
      { id: "curiosity", title: "ความอยากรู้", description: "เรียนรู้ผ่านการสำรวจและลงมือทำ" },
      { id: "craftsmanship", title: "ความใส่ใจ", description: "ให้ความสำคัญกับคุณภาพและรายละเอียด" },
      { id: "purpose", title: "เป้าหมาย", description: "สร้างงานที่มีประโยชน์ต่อผู้ใช้งาน" },
      { id: "responsibility", title: "ความรับผิดชอบ", description: "ทำงานให้สำเร็จและช่วยเหลือทีม" },
    ],
    actions: { work: "ดูผลงาน", resume: "ดาวน์โหลดเรซูเม่", contact: "ติดต่อผม" },
    sectionLabels: { work: "ผลงาน", about: "ตัวตน", skills: "ความสามารถ", contact: "ติดต่อ" },
    contactHeadline: "มีอะไรที่อยากสร้างร่วมกันไหม?",
    contactDescription: "มาสร้างสิ่งที่มีประโยชน์ร่วมกัน",
  },
} as const;

/**
 * Preserve live project data and existing links from v1; enrich with v2 identity copy.
 * Do not duplicate descriptions or make unverified impact claims here.
 */
export function getPortfolioV2Content(language: Language) {
  return {
    identity,
    copy: identityCopy[language],
    projects: getProjects(language),
  };
}
