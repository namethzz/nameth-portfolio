import type { Language } from "@/lib/content";

type Localized = Record<Language, string>;

/**
 * Copy for the status-window site. Project descriptions, roles and tools stay
 * in lib/content.ts and lib/projects.ts; this file only holds the words the
 * new sections add. Game words are labels only: every heading and
 * description underneath them stays plain language.
 */

export type QuestType = "main" | "party" | "solo" | "quest";

/** How each project is labelled in the quest log, in project order. */
export const questTypes: ReadonlyArray<{ type: QuestType; active: boolean }> = [
  { type: "main", active: true }, // THAI TAY: started it, backend and ML still in progress
  { type: "party", active: false }, // Economic Crops Chat: team project
  { type: "quest", active: false }, // OTW.SHOP
  { type: "solo", active: false }, // AirClean: solo developer
  { type: "solo", active: false }, // KickHub: solo developer
];

export const questTypeLabel: Record<QuestType, Localized> = {
  main: { en: "Main quest", th: "เควสต์หลัก" },
  party: { en: "Party quest", th: "เควสต์ทีม" },
  solo: { en: "Solo quest", th: "เควสต์เดี่ยว" },
  quest: { en: "Quest", th: "เควสต์" },
};

export const sw = {
  nav: {
    status: { en: "Status", th: "สถานะ" },
    quests: { en: "Quests", th: "ผลงาน" },
    skills: { en: "Skills", th: "ทักษะ" },
    passives: { en: "Me", th: "ตัวตน" },
    contact: { en: "Contact", th: "ติดต่อ" },
  },
  system: {
    en: "Internship candidate found. Opening status window",
    th: "พบผู้สมัครฝึกงาน กำลังเปิดหน้าต่างสถานะ",
  },
  available: { en: "Open to internships", th: "พร้อมฝึกงาน" },
  thaiName: "ณเมธ วงค์มงคล",
  rows: {
    class: { en: "Class", th: "สายงาน" },
    classValue: { en: "Full-stack developer · Data & AI engineering", th: "Full-stack Developer · Data & AI Engineering" },
    type: { en: "Type", th: "บุคลิก" },
    typeValue: { en: "INTJ-A · The Architect", th: "INTJ-A · นักสถาปัตย์" },
    typeNote: { en: "16Personalities test result", th: "ผลทดสอบ 16Personalities" },
    guild: { en: "Guild", th: "สังกัด" },
    quest: { en: "Seeking", th: "กำลังหา" },
    questValue: {
      en: "Internship · Jan 4 – Apr 23, 2027",
      th: "ที่ฝึกงาน · 4 ม.ค. – 23 เม.ย. 2570",
    },
  },
  stats: {
    projects: { en: "Projects shipped", th: "ผลงาน" },
    live: { en: "Live demos", th: "เปิดใช้งานจริง" },
    languages: { en: "Languages", th: "ภาษาโปรแกรม" },
  },
  actions: {
    quests: { en: "View my work", th: "ดูผลงาน" },
    email: { en: "Email me", th: "ส่งอีเมล" },
  },
  traits: { en: "Traits", th: "สิ่งที่ยึดถือ" },
  objective: { en: "Current objective", th: "ภารกิจตอนนี้" },
  questLog: {
    title: { en: "Quest log", th: "บันทึกเควสต์" },
    lead: {
      en: "Five projects across full-stack, data and AI. Each one shows what I built, my role, and the code behind it.",
      th: "ผลงาน 5 ชิ้นทั้งด้าน Full-stack ข้อมูล และ AI แต่ละชิ้นบอกว่าผมสร้างอะไร รับผิดชอบส่วนไหน และมีโค้ดให้ดู",
    },
    inProgress: { en: "In progress", th: "กำลังทำ" },
    cleared: { en: "Cleared", th: "สำเร็จ" },
    rewards: { en: "Built with", th: "เทคโนโลยีที่ใช้" },
    details: { en: "Quest details", th: "ดูรายละเอียด" },
    live: { en: "Live demo", th: "เปิดเว็บจริง" },
  },
  skills: {
    title: { en: "Skills", th: "ทักษะ" },
    lead: {
      en: "Languages and tools from my public projects, grouped by how I use them. No percentage bars: the projects show the level.",
      th: "ภาษาและเครื่องมือที่ใช้ในผลงานจริง จัดกลุ่มตามการใช้งาน ไม่มีหลอดเปอร์เซ็นต์ เพราะผลงานบอกระดับได้ดีกว่า",
    },
    training: { en: "In training", th: "กำลังฝึก" },
  },
  passives: {
    title: { en: "Passive skills", th: "สกิลติดตัว" },
    lead: {
      en: "What I do away from the keyboard.",
      th: "สิ่งที่ผมทำเมื่อไม่ได้อยู่หน้าจอ",
    },
    items: [
      {
        id: "webtoons",
        title: { en: "Fantasy webtoons and manga", th: "อ่านเว็บตูนและมังงะแฟนตาซี" },
        effect: {
          en: "Where this site's status windows come from.",
          th: "ที่มาของหน้าต่างสถานะในเว็บนี้",
        },
      },
      {
        id: "music",
        title: { en: "Listening to music", th: "ฟังเพลง" },
        effect: { en: "Always something playing.", th: "มีเพลงเปิดอยู่เสมอ" },
      },
      {
        id: "instrument",
        title: { en: "Playing music", th: "เล่นดนตรี" },
        effect: { en: "Practice, repeat, get a little better.", th: "ฝึกซ้ำ ๆ จนดีขึ้นทีละนิด" },
      },
      {
        id: "sports",
        title: { en: "Sports", th: "เล่นกีฬา" },
        effect: { en: "Playing as a team and not giving up early.", th: "เล่นเป็นทีม และไม่ยอมแพ้ง่าย ๆ" },
      },
    ],
  },
  finalQuest: {
    label: { en: "Final quest", th: "เควสต์สุดท้าย" },
    locked: { en: "Locked", th: "ยังล็อกอยู่" },
    title: { en: "Build my own game", th: "สร้างเกมของตัวเอง" },
    story: {
      en: "I grew up playing games, then stopped as I got older. One day I want to make one of my own. Until then, the skills below are what I'm leveling up on the way, and right now that means full-stack, data and AI work.",
      th: "ตอนเด็กผมชอบเล่นเกม พอโตขึ้นก็แทบไม่ได้เล่นอีก วันหนึ่งผมอยากสร้างเกมของตัวเองขึ้นมา ระหว่างทางนี้ ทักษะด้านล่างคือสิ่งที่ผมกำลังเก็บเลเวล และตอนนี้คืองาน Full-stack ข้อมูล และ AI",
    },
    requirements: { en: "Requirements to unlock", th: "เงื่อนไขปลดล็อก" },
    steps: [
      { state: "done", label: { en: "Build full-stack web apps", th: "สร้างเว็บแบบ Full-stack" } },
      { state: "done", label: { en: "Work with real data", th: "ทำงานกับข้อมูลจริง" } },
      { state: "active", label: { en: "Train my first ML model", th: "ฝึกโมเดล ML ตัวแรก" } },
      { state: "locked", label: { en: "Learn a game engine", th: "เรียนรู้ Game Engine" } },
    ],
  },
  invite: {
    label: { en: "Party invite", th: "ชวนเข้าทีม" },
    title: { en: "Looking for a party member?", th: "กำลังหาคนเข้าทีมอยู่ไหม" },
    send: { en: "Send invite", th: "ส่งคำชวน" },
  },
  detail: {
    back: { en: "Quest log", th: "บันทึกเควสต์" },
    role: { en: "My role", th: "หน้าที่ของผม" },
    story: { en: "Quest report", th: "บันทึกการทำเควสต์" },
    proof: { en: "Proof", th: "หลักฐาน" },
    screens: { en: "Screens from the real project", th: "ภาพหน้าจอจากโปรเจกต์จริง" },
    code: { en: "Inside the code", th: "โค้ดที่เกี่ยวข้อง" },
    viewSource: { en: "View source", th: "ดูโค้ด" },
    next: { en: "Next quest", th: "เควสต์ถัดไป" },
  },
  top: { en: "Back to top", th: "กลับขึ้นบน" },
  skip: { en: "Skip to content", th: "ข้ามไปยังเนื้อหา" },
} as const;

/** Picks the current language from a localized pair. */
export const pick = (value: Localized, language: Language) => value[language];
