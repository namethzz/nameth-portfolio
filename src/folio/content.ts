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
export const FACEBOOK = "https://www.facebook.com/nameth.wongmongkol";
export const INSTAGRAM = "https://www.instagram.com/nameth_z/";
export const THAI_NAME = "ณเมธ วงค์มงคล";

/** Section ids in page order, with their giant word (lines split on \n). Projects follow as project-1 … project-5. */
export const sections = {
  contents: { word: "TABLE OF CONTENTS", label: { en: "Table of contents", th: "สารบัญ" } },
  introduction: { word: "INTRODUCTION", label: { en: "Introduction", th: "แนะนำตัว" } },
  mindset: { word: "LEVEL UP", label: { en: "How I think", th: "วิธีคิดของผม" } },
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
  marquee: {
    intro: ["FULL-STACK", "DATA ENGINEERING", "AI ENGINEERING", "INTERNSHIP · JAN 4 – APR 23, 2027", "FIVE PROJECTS SHIPPED"],
  },
  contents: {
    factsTitle: { en: "In short", th: "สรุปสั้น ๆ" },
    facts: {
      projects: { en: "projects", th: "โปรเจกต์" },
      live: { en: "live demos", th: "เว็บที่เปิดใช้จริง" },
      internship: { en: "internship term", th: "ช่วงฝึกงาน" },
      internshipValue: { en: "Jan – Apr 2027", th: "ม.ค. – เม.ย. 2570" },
    },
    items: [
      { href: "introduction", word: "INTRODUCTION", desc: { en: "Where I'm coming from", th: "แนะนำตัว" } },
      { href: "mindset", word: "LEVEL UP", desc: { en: "How I think", th: "วิธีคิดของผม" } },
      { href: "about", word: "ABOUT ME", desc: { en: "My ID page", th: "เกี่ยวกับผม" } },
      { href: "education", word: "EDUCATION", desc: { en: "The route so far", th: "เส้นทางการเรียน" } },
      { href: "skills", word: "SKILLS", desc: { en: "Tools, with proof", th: "ทักษะพร้อมหลักฐาน" } },
      { href: "experience", word: "EXPERIENCE", desc: { en: "Roles I've taken on", th: "บทบาทที่รับผิดชอบ" } },
      { href: "work", word: "PROJECTS", desc: { en: "Five builds, all live", th: "ผลงาน 5 ชิ้นที่เปิดใช้งานจริง" } },
      { href: "contact", word: "CONTACT", desc: { en: "Say hello", th: "ทักมาคุยกัน" } },
    ],
  },
  about: {
    card: {
      title: { en: "Developer ID", th: "บัตรประจำตัวนักพัฒนา" },
      number: "NW-2027-CS",
      photoAlt: { en: "ID photo of Nameth Wongmongkol", th: "รูปประจำตัวของณเมธ วงค์มงคล" },
      flip: { en: "Flip the card", th: "พลิกบัตร" },
      flipBack: { en: "Flip back", th: "พลิกกลับ" },
    },
    photos: {
      hint: { en: "Tap or swipe the photos", th: "แตะหรือปัดรูปเพื่อดูใบถัดไป" },
      items: [
        {
          src: "assets/about/sports.webp",
          width: 720,
          height: 900,
          caption: { en: "Game day. Sports, as part of a team.", th: "วันแข่ง กีฬาที่ได้เล่นเป็นทีม" },
          alt: { en: "Nameth holding a ball on a sports field", th: "ณเมธถือลูกบอลอยู่ในสนามกีฬา" },
          tag: "#teamsports",
        },
        {
          src: "assets/about/mountain.webp",
          width: 900,
          height: 1125,
          caption: { en: "Morning above a sea of mist.", th: "เช้าที่ได้มองทะเลหมอก" },
          alt: { en: "Selfie of Nameth with misty mountains behind", th: "ณเมธถ่ายเซลฟี่โดยมีภูเขาและทะเลหมอกด้านหลัง" },
          tag: "#offline",
        },
        {
          src: "assets/about/swing.webp",
          width: 900,
          height: 1125,
          caption: { en: "Away from the keyboard.", th: "วันที่ได้พักจากหน้าจอ" },
          alt: { en: "Nameth in sunglasses on a garden swing", th: "ณเมธใส่แว่นกันแดดนั่งบนชิงช้าในสวน" },
          tag: "#weekend",
        },
      ],
    },
    facts: [
      { key: { en: "Focus", th: "สายงาน" }, value: { en: "Full-stack · Data & AI engineering", th: "Full-stack · Data & AI Engineering" } },
      { key: { en: "GitHub", th: "GitHub" }, value: { en: "@namethzz", th: "@namethzz" } },
      { key: { en: "University", th: "มหาวิทยาลัย" }, value: { en: "Sripatum University", th: "มหาวิทยาลัยศรีปทุม" } },
      { key: { en: "Internship", th: "ฝึกงาน" }, value: { en: "Jan 4 – Apr 23, 2027", th: "4 ม.ค. – 23 เม.ย. 2570" } },
    ],
    stampsTitle: { en: "Away from the keyboard", th: "เมื่อไม่ได้อยู่หน้าจอ" },
    hobbies: [
      { en: "Webtoons & manga", th: "เว็บตูนและมังงะ" },
      { en: "Music on", th: "ฟังเพลง" },
      { en: "Plays music", th: "เล่นดนตรี" },
      { en: "Team sports", th: "กีฬาเป็นทีม" },
    ],
  },
  education: {
    stops: [
      {
        when: "2023",
        tag: { en: "Enrolled", th: "เริ่มเรียน" },
        title: { en: "Sripatum University", th: "มหาวิทยาลัยศรีปทุม" },
        text: { en: "B.Sc. Computer Science & Software Development, still in progress.", th: "วท.บ. วิทยาการคอมพิวเตอร์และการพัฒนาซอฟต์แวร์ กำลังศึกษาอยู่" },
      },
      {
        when: "NOW",
        tag: { en: "Self-study", th: "เรียนรู้ด้วยตัวเอง" },
        title: { en: "Machine learning", th: "Machine Learning" },
      },
      {
        when: "2027",
        tag: { en: "Jan 4 – Apr 23", th: "4 ม.ค. – 23 เม.ย." },
        title: { en: "Internship term", th: "ช่วงฝึกงาน" },
        text: { en: "The programme's internship term, and when I'm looking to join a team.", th: "ช่วงฝึกงานของหลักสูตร และเป็นช่วงที่ผมกำลังมองหาทีมที่จะเข้าไปฝึกงานด้วย" },
        open: { en: "Open to offers", th: "เปิดรับอยู่" },
      },
      {
        when: "NEXT",
        tag: { en: "The road ahead", th: "ทางข้างหน้า" },
        title: { en: "Data, AI or games", th: "Data, AI หรือเกม" },
        text: { en: "I want to become a data engineer, an AI engineer or a game developer, and one day build a game of my own.", th: "ผมอยากเป็น Data Engineer, AI Engineer หรือ Game Developer และสักวันจะสร้างเกมของตัวเอง" },
      },
    ],
    nowAlt: { en: "THAI TAY material page with its price forecast", th: "หน้าวัสดุของ THAI TAY พร้อมราคาคาดการณ์" },
  },
  skills: {
    lead: {
      en: "Four things I can build today, the tools I use for each, and the projects where I did it.",
      th: "สี่อย่างที่ผมทำได้ตอนนี้ เครื่องมือที่ใช้ในแต่ละอย่าง และโปรเจกต์ที่ผมทำมาแล้วจริง",
    },
    cards: [
      {
        title: { en: "Full-stack web apps", th: "เว็บแอป Full-stack" },
        can: {
          en: "I build the screens in React, the API in Node.js or ASP.NET Core, and keep the data in MongoDB or MySQL.",
          th: "ผมทำหน้าเว็บด้วย React ทำ API ด้วย Node.js หรือ ASP.NET Core และเก็บข้อมูลใน MongoDB หรือ MySQL",
        },
        tools: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "C#", "ASP.NET Core", "MongoDB", "MySQL"],
        projects: [3, 4, 2],
      },
      {
        title: { en: "Clean, ready data", th: "ข้อมูลที่สะอาดและพร้อมใช้" },
        can: {
          en: "I collect messy public data, find the rows that are wrong, and shape it for a model or an app.",
          th: "ผมรวบรวมข้อมูลสาธารณะที่รก หาแถวที่ผิด แล้วจัดรูปให้พร้อมส่งต่อให้โมเดลหรือแอป",
        },
        tools: ["Python", "Pandas", "Data cleaning"],
        projects: [0, 1],
      },
      {
        title: { en: "AI on real data", th: "AI ที่ตอบจากข้อมูลจริง" },
        can: {
          en: "I build retrieval (RAG) so a chatbot answers from real data, then deploy the whole pipeline.",
          th: "ผมทำระบบค้นข้อมูล (RAG) ให้แชตบอตตอบจากข้อมูลจริง แล้ว deploy ทั้งระบบ",
        },
        tools: ["RAG", "ChromaDB", "FastAPI", "LLM APIs", "Hugging Face"],
        projects: [1],
      },
      {
        title: { en: "Tested and live", th: "ทดสอบแล้วขึ้นระบบจริง" },
        can: {
          en: "I write unit and end-to-end tests, run them in CI, and deploy to Render, Vercel or Railway.",
          th: "ผมเขียน unit test และ end-to-end test ให้รันใน CI แล้ว deploy ขึ้น Render, Vercel หรือ Railway",
        },
        tools: ["Vitest", "xUnit", "GitHub Actions", "Docker", "Render", "Vercel", "Railway"],
        projects: [3, 4],
      },
    ],
    skill: { en: "Skill", th: "สกิล" },
    usedIn: { en: "Built in", th: "ทำจริงใน" },
    training: { en: "In training", th: "กำลังฝึก" },
  },
  mindset: {
    lead: {
      en: "Keep at it and don't give up. Collect as much knowledge as you can, and you'll use it when the time comes.",
      th: "ทำมันไปเรื่อย ๆ อย่ายอมแพ้ เก็บวิชาความรู้ให้ได้เยอะ ๆ ถึงเวลาจะได้ใช้มันเอง",
    },
    hud: { level: { en: "Level", th: "เลเวล" }, xp: { en: "XP", th: "XP" }, inventory: { en: "Inventory", th: "ไอเทม" } },
    stages: [
      {
        item: { en: "Sword", th: "ดาบ" },
        title: { en: "Farming levels", th: "ฟาร์มเลเวล" },
        text: {
          en: "I grew up farming levels in games so I could beat the boss, find the drop I wanted and buy better armour and a better sword. The stronger my character got, the more fun the game became.",
          th: "ตอนเด็กผมชอบเล่นเกม และชอบฟาร์มเลเวลให้สู้บอสได้ หาของที่อยากได้ ซื้อชุดเกราะดี ๆ กับดาบดี ๆ มันทำให้ผมสนุกกับเกมได้มากขึ้น เพราะตัวละครของผมเก่งขึ้น",
        },
      },
      {
        item: { en: "Skill tree", th: "ต้นสกิล" },
        title: { en: "Real-life XP", th: "XP ในชีวิตจริง" },
        text: {
          en: "Growing up, I found real life runs on the same rule. The more I level up my skills, the more I can do and the more value I can create. I need a good plan and a lot of study to get there.",
          th: "พอโตขึ้น ชีวิตจริงก็บอกผมแบบเดียวกัน ถ้าเราอัปสกิลตัวเองให้เก่งขึ้น เราจะทำอะไรได้มากกว่าเดิม และสร้างคุณค่าให้ตัวเองได้ แค่ต้องวางแผนชีวิตให้ดีและเรียนให้เยอะ",
        },
      },
      {
        item: { en: "Companion", th: "ผู้ช่วย" },
        title: { en: "A new training ground", th: "สนามฝึกใหม่" },
        text: {
          en: "Learning is wide open now. AI lets me keep levelling up one skill after another, and that makes learning fun for me.",
          th: "ทุกวันนี้การเรียนรู้เปิดกว้างมาก มี AI ที่ช่วยให้ผมอัปสกิลได้เรื่อย ๆ และทำให้ผมสนุกกับการเรียนรู้สิ่งต่าง ๆ",
        },
      },
      {
        item: { en: "Foundation", th: "พื้นฐาน" },
        title: { en: "Basics first", th: "พื้นฐานมาก่อน" },
        text: {
          en: "AI makes writing code easier. I take that as my cue to go back over the fundamentals of programming more often.",
          th: "AI ทำให้การเขียนโค้ดสบายขึ้น แต่ผมไม่เคยลืมคำว่าพื้นฐาน ยิ่งมี AI ผมยิ่งต้องกลับไปทบทวนพื้นฐานการเขียนโค้ดไว้ก่อน",
        },
      },
      {
        item: { en: "Crafting", th: "งานคราฟต์" },
        title: { en: "Thought through", th: "คิดกับทุกงาน" },
        text: {
          en: "I'm proud of each project I've made, because I thought each one through many times.",
          th: "ผมภูมิใจกับงานทุกชิ้นที่ได้ทำ เพราะแต่ละงานผ่านการคิดมาหลายรอบมาก",
        },
      },
    ],
  },
  ending: {
    proverb: "ลำบากวันนี้ สบายตอนไหนไม่รู้",
    proverbEn: { en: "Hard today. Easy someday, whenever that turns out to be.", th: "ลำบากวันนี้ สบายวันไหนก็ยังไม่รู้" },
    farming: {
      en: "I keep farming my level every day so that one day I make it.",
      th: "ทุกวันนี้ผมยังฟาร์มเลเวลของตัวเองทุกวัน เพื่อให้สักวันผมประสบความสำเร็จ",
    },
    thanks: {
      en: "I don't know if anyone sees what I tried to do here, or reads this far. If you did, I'm glad, and thank you.",
      th: "ผมไม่รู้ว่าจะมีใครเห็นสิ่งที่ผมตั้งใจทำไหม หรือจะมีใครอ่านมาถึงตรงนี้หรือเปล่า แต่ถ้าคุณอ่านมาถึงตรงนี้ ผมดีใจและขอบคุณมากครับ",
    },
    status: { en: "Still farming", th: "ยังฟาร์มอยู่" },
    again: { en: "Play again", th: "เล่นอีกรอบ" },
  },
  experience: {
    lead: {
      en: "I'm a student, so my experience is the roles I've taken on in real projects, alone and in a team, from the first idea to deployment.",
      th: "ผมยังเป็นนักศึกษา ประสบการณ์ของผมจึงเป็นบทบาทที่รับผิดชอบในโปรเจกต์จริง ทั้งทำคนเดียว ทำเป็นทีม และตั้งแต่ไอเดียแรกจนถึงขึ้นระบบ",
    },
  },
  work: {
    count: { en: "projects", th: "โปรเจกต์" },
    live: { en: "live demos", th: "เปิดใช้งานจริง" },
    swipe: { en: "Swipe for the next project", th: "ปัดเพื่อดูโปรเจกต์ถัดไป" },
    screen: { en: "Screen", th: "หน้าจอ" },
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
    glance: { en: "At a glance", th: "ภาพรวม" },
    status: { en: "Status", th: "สถานะ" },
    stage: { en: "Where it stands", th: "ความคืบหน้าล่าสุด" },
    category: { en: "Category", th: "ประเภทงาน" },
    part: { en: "Part", th: "ตอนที่" },
    note: { en: "Note from the build", th: "บันทึกจากการทำงาน" },
    enlarge: { en: "View larger", th: "ดูภาพใหญ่" },
    close: { en: "Close", th: "ปิด" },
    prevShot: { en: "Previous screen", th: "ภาพก่อนหน้า" },
    nextShot: { en: "Next screen", th: "ภาพถัดไป" },
    file: { en: "Source file", th: "ไฟล์โค้ด" },
  },
  contact: {
    status: { en: "Open to internships · Jan 4 – Apr 23, 2027", th: "เปิดรับฝึกงาน · 4 ม.ค. – 23 เม.ย. 2570" },
    lead: {
      en: "Want me on your team as an intern, or curious about one of these projects? Message me on any of these.",
      th: "อยากชวนผมไปฝึกงาน หรือสนใจโปรเจกต์ไหนในนี้ ทักมาได้ทุกช่องทางเลยครับ",
    },
    email: { en: "Email", th: "อีเมล" },
    send: { en: "Send an email", th: "ส่งอีเมล" },
    copy: { en: "Copy", th: "คัดลอก" },
    copied: { en: "Copied", th: "คัดลอกแล้ว" },
    socials: { en: "Elsewhere", th: "ช่องทางอื่น" },
    resume: { en: "Download résumé (PDF)", th: "ดาวน์โหลดเรซูเม่ (PDF)" },
  },
} as const;

/**
 * Each project's own accent, sampled from its real screenshots, so the cards
 * carry the colour of the product they show. `ink` is a lighter version that
 * stays readable on the navy cards.
 */
export const projectMeta = [
  { short: "THAI TAY", accent: "#e2622f", ink: "#f39a6f" },
  { short: "CROPS", accent: "#6fbf45", ink: "#9bdc72" },
  { short: "OTW", accent: "#c08a4a", ink: "#e0b07a" },
  { short: "AIRCLEAN", accent: "#2f6fdc", ink: "#7eaaf5" },
  { short: "KICKHUB", accent: "#b6e85a", ink: "#cdf185" },
] as const;

/** Picks the current language from a localized pair. */
export const pick = (value: Localized, language: Language) => value[language];
