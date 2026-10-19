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
  marquee: {
    intro: ["FULL-STACK", "DATA ENGINEERING", "AI ENGINEERING", "INTERNSHIP · JAN 4 – APR 23, 2027", "FIVE PROJECTS SHIPPED"],
  },
  contents: {
    principlesTitle: { en: "What I hold to", th: "สิ่งที่ผมยึดถือ" },
    items: [
      { href: "introduction", word: "INTRODUCTION", desc: { en: "Where I'm coming from", th: "แนะนำตัว" } },
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
      { key: { en: "Personality", th: "บุคลิก" }, value: { en: "INTJ-A, the Architect", th: "INTJ-A นักสถาปัตย์" } },
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
    goalStamp: { en: "Next stop: build a game", th: "ปลายทาง: สร้างเกมของตัวเอง" },
    goal: {
      en: "I grew up playing games, then stopped as I got older. One day I want to build one of my own. The full-stack, data and AI work I'm doing now is the road there.",
      th: "ตอนเด็กผมชอบเล่นเกม พอโตขึ้นก็แทบไม่ได้เล่นอีก สักวันผมอยากสร้างเกมของตัวเอง งาน Full-stack ข้อมูล และ AI ที่ทำอยู่ตอนนี้คือทางที่จะไปถึงตรงนั้น",
    },
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
        title: { en: "Data science", th: "Data Science" },
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
        title: { en: "Toward data science", th: "มุ่งสู่ Data Science" },
        text: { en: "Keep learning toward data science, and one day build a game of my own.", th: "เรียนรู้ต่อไปถึงงาน Data Science และสักวันจะสร้างเกมของตัวเอง" },
      },
    ],
    nowAlt: { en: "THAI TAY material page with its price forecast", th: "หน้าวัสดุของ THAI TAY พร้อมราคาคาดการณ์" },
  },
  skills: {
    lead: {
      en: "No percentage bars. Every tool below is checked against the projects it was actually used in.",
      th: "ไม่มีหลอดเปอร์เซ็นต์ ทุกเครื่องมือด้านล่างเทียบกับโปรเจกต์ที่ใช้จริง",
    },
    disciplines: [
      {
        title: { en: "Full-stack development", th: "พัฒนา Full-stack" },
        desc: { en: "APIs, databases and React frontends that hold up in production: concurrency, payments, privacy and tests in CI.", th: "API ฐานข้อมูล และหน้าเว็บ React ที่ใช้งานจริงได้ ทั้งเรื่องการแก้ข้อมูลพร้อมกัน การจ่ายเงิน ความเป็นส่วนตัว และการทดสอบใน CI" },
        projects: [0, 2, 3, 4],
      },
      {
        title: { en: "Data engineering", th: "Data Engineering" },
        desc: { en: "Collecting, cleaning and checking data until it means what it claims, then shaping it for the systems and models that use it.", th: "รวบรวม ทำความสะอาด และตรวจข้อมูลจนมั่นใจว่าถูกต้อง แล้วจัดรูปให้พร้อมสำหรับระบบและโมเดลที่จะนำไปใช้" },
        projects: [0, 1],
      },
      {
        title: { en: "AI engineering", th: "AI Engineering" },
        desc: { en: "Connecting language models to real data: fixing retrieval for a Thai crop chatbot and deploying its pipeline, and a price forecasting model now in training.", th: "เชื่อมโมเดลภาษาเข้ากับข้อมูลจริง ทั้งแก้ระบบค้นข้อมูลของแชตบอตพืชเศรษฐกิจภาษาไทยและ deploy ทั้งระบบ และโมเดลพยากรณ์ราคาที่กำลังฝึกอยู่" },
        projects: [1, 0],
      },
    ],
    seenIn: { en: "Seen in", th: "ใช้ใน" },
    matrixTitle: { en: "Tool × project", th: "เครื่องมือ × โปรเจกต์" },
    matrixNote: { en: "Each dot is a project that uses the tool.", th: "แต่ละจุดคือโปรเจกต์ที่ใช้เครื่องมือนั้น" },
    used: { en: "used", th: "ใช้" },
    showAll: { en: "Show all tools", th: "ดูเครื่องมือทั้งหมด" },
    showLess: { en: "Show fewer", th: "ย่อรายการ" },
    toolbox: { en: "Also in my toolbox", th: "เครื่องมืออื่นที่ใช้" },
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
    email: { en: "Email address", th: "อีเมล" },
    github: { en: "GitHub", th: "GitHub" },
    resume: { en: "Résumé", th: "เรซูเม่" },
    resumeValue: { en: "Download PDF", th: "ดาวน์โหลด PDF" },
    available: { en: "Available", th: "ช่วงฝึกงาน" },
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
