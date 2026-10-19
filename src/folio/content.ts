import type { Language } from "@/lib/content";

type Localized = Record<Language, string>;

/**
 * Copy for the editorial portfolio. Project descriptions, roles and tools stay
 * in lib/content.ts and lib/projects.ts; this file holds the words the
 * sections add. The giant display words stay in English in both languages
 * (Anton has no Thai), with a Thai label beside them on the Thai version.
 */
export const EMAIL = "nameth.won@spumail.net";
export const GITHUB = "https://github.com/namethzz";
export const HANDLE = "@namethzz";
export const THAI_NAME = "ณเมธ วงค์มงคล";

/** Section ids in page order, with their giant word (lines split on \n). Projects follow as project-1 … project-5. */
export const sections = {
  contents: { word: "TABLE OF CONTENTS", label: { en: "Table of contents", th: "สารบัญ" } },
  introduction: { word: "INTRODUCTION", label: { en: "Introduction", th: "แนะนำตัว" } },
  about: { word: "NAMETH\nWONGMONGKOL", label: { en: "About me", th: "เกี่ยวกับผม" } },
  education: { word: "EDUCATION", label: { en: "Education", th: "การศึกษา" } },
  skills: { word: "PERSONAL\nSKILLS", label: { en: "Personal skills", th: "ทักษะ" } },
  experience: { word: "PROJECT\nEXPERIENCE", label: { en: "Experience", th: "ประสบการณ์" } },
  work: { word: "PROJECT\nPORTFOLIO", label: { en: "Project portfolio", th: "ผลงาน" } },
  contact: { word: "CONTACT ME", label: { en: "Contact", th: "ติดต่อ" } },
} as const satisfies Record<string, { word: string; label: Localized }>;

export type SectionId = keyof typeof sections;

export const folio = {
  nav: {
    about: { en: "About", th: "ตัวตน" },
    skills: { en: "Skills", th: "ทักษะ" },
    work: { en: "Work", th: "ผลงาน" },
    contact: { en: "Contact", th: "ติดต่อ" },
  },
  skip: { en: "Skip to content", th: "ข้ามไปยังเนื้อหา" },
  top: { en: "Back to top", th: "กลับขึ้นบน" },
  contents: {
    items: [
      { href: "introduction", label: { en: "Introduction", th: "แนะนำตัว" } },
      { href: "about", label: { en: "About me", th: "เกี่ยวกับผม" } },
      { href: "education", label: { en: "Education", th: "การศึกษา" } },
      { href: "skills", label: { en: "Personal skills", th: "ทักษะ" } },
      { href: "experience", label: { en: "Experience", th: "ประสบการณ์" } },
      { href: "work", label: { en: "Project portfolio", th: "ผลงานทั้งหมด" } },
      { href: "project-1", label: { en: "Main project", th: "โปรเจกต์หลัก" } },
      { href: "project-2", label: { en: "Team project", th: "โปรเจกต์ทีม" } },
      { href: "contact", label: { en: "Contact", th: "ติดต่อ" } },
    ],
  },
  about: {
    facts: [
      { key: { en: "Thai name", th: "ชื่อภาษาไทย" }, value: { en: THAI_NAME, th: THAI_NAME } },
      { key: { en: "Focus", th: "สายงาน" }, value: { en: "Full-stack · Data & AI engineering", th: "Full-stack · Data & AI Engineering" } },
      { key: { en: "Personality", th: "บุคลิก" }, value: { en: "INTJ-A, the Architect (16Personalities)", th: "INTJ-A นักสถาปัตย์ (16Personalities)" } },
      { key: { en: "Internship", th: "ฝึกงาน" }, value: { en: "Jan 4 – Apr 23, 2027", th: "4 ม.ค. – 23 เม.ย. 2570" } },
    ],
    hobbiesTitle: { en: "Away from the keyboard", th: "เมื่อไม่ได้อยู่หน้าจอ" },
    hobbies: [
      { en: "Fantasy webtoons and manga", th: "อ่านเว็บตูนและมังงะแฟนตาซี" },
      { en: "Listening to music", th: "ฟังเพลง" },
      { en: "Playing music", th: "เล่นดนตรี" },
      { en: "Sports, as part of a team", th: "เล่นกีฬาเป็นทีม" },
    ],
    goalTitle: { en: "One day", th: "สักวันหนึ่ง" },
    goal: {
      en: "I grew up playing games, then stopped as I got older. One day I want to build one of my own. The full-stack, data and AI work I'm doing now is the road there.",
      th: "ตอนเด็กผมชอบเล่นเกม พอโตขึ้นก็แทบไม่ได้เล่นอีก สักวันผมอยากสร้างเกมของตัวเอง งาน Full-stack ข้อมูล และ AI ที่ทำอยู่ตอนนี้คือทางที่จะไปถึงตรงนั้น",
    },
  },
  education: {
    nowTitle: { en: "Self-study · Now", th: "เรียนรู้ด้วยตัวเอง · ตอนนี้" },
    degreeNote: {
      en: "Bachelor's degree in progress. The programme's internship term runs from January 4 to April 23, 2027, and that is when I'm looking to join a team.",
      th: "กำลังศึกษาระดับปริญญาตรี ช่วงฝึกงานของหลักสูตรคือ 4 มกราคม – 23 เมษายน 2570 และเป็นช่วงที่ผมกำลังมองหาทีมที่จะเข้าไปฝึกงานด้วย",
    },
    photoAlt: { en: "Nameth Wongmongkol", th: "ณเมธ วงค์มงคล" },
  },
  skills: {
    lead: {
      en: "Languages and tools from my public projects, grouped by how I use them. No percentage bars: the projects show the level.",
      th: "ภาษาและเครื่องมือที่ใช้ในผลงานจริง จัดกลุ่มตามการใช้งาน ไม่มีหลอดเปอร์เซ็นต์ เพราะผลงานบอกระดับได้ดีกว่า",
    },
    training: { en: "In training", th: "กำลังฝึก" },
  },
  experience: {
    lead: {
      en: "I'm a student, so my experience is the roles I've taken on in real projects: alone, in a team, and from the first idea to deployment.",
      th: "ผมยังเป็นนักศึกษา ประสบการณ์ของผมจึงเป็นบทบาทที่รับผิดชอบในโปรเจกต์จริง ทั้งทำคนเดียว ทำเป็นทีม และตั้งแต่ไอเดียแรกจนถึงขึ้นระบบ",
    },
  },
  work: {
    count: { en: "projects", th: "โปรเจกต์" },
    live: { en: "live demos", th: "เปิดใช้งานจริง" },
  },
  project: {
    label: { en: "Project", th: "โปรเจกต์" },
    main: { en: "Main project", th: "โปรเจกต์หลัก" },
    caseStudy: { en: "Case study", th: "อ่านรายละเอียด" },
    live: { en: "Live demo", th: "เปิดเว็บจริง" },
    role: { en: "My role", th: "หน้าที่ของผม" },
    tools: { en: "Built with", th: "เทคโนโลยีที่ใช้" },
    story: { en: "How it was built", th: "เบื้องหลังการพัฒนา" },
    screens: { en: "Screens from the real project", th: "ภาพหน้าจอจากโปรเจกต์จริง" },
    code: { en: "Inside the code", th: "โค้ดที่เกี่ยวข้อง" },
    viewSource: { en: "View source", th: "ดูโค้ด" },
    back: { en: "All projects", th: "ผลงานทั้งหมด" },
    next: { en: "Next project", th: "โปรเจกต์ถัดไป" },
  },
  contact: {
    email: { en: "Email address", th: "อีเมล" },
    github: { en: "GitHub", th: "GitHub" },
    resume: { en: "Résumé", th: "เรซูเม่" },
    resumeValue: { en: "Download PDF", th: "ดาวน์โหลด PDF" },
    available: { en: "Available", th: "ช่วงฝึกงาน" },
  },
} as const;

/** Picks the current language from a localized pair. */
export const pick = (value: Localized, language: Language) => value[language];
