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
    principlesTitle: { en: "What I hold to", th: "สิ่งที่ผมยึดถือ" },
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
      en: "Games taught me to farm levels. One day I want to build a game of my own, and the full-stack, data and AI work I do now is how I get there.",
      th: "เกมสอนให้ผมรู้จักการฟาร์มเลเวล สักวันผมอยากสร้างเกมของตัวเอง และงาน Full-stack ข้อมูล และ AI ที่ทำอยู่ตอนนี้คือทางที่จะพาผมไปถึง",
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
      en: "No percentage bars. I matched each tool below to the projects that use it.",
      th: "ไม่มีหลอดเปอร์เซ็นต์ ผมจับคู่เครื่องมือแต่ละตัวกับโปรเจกต์ที่ใช้มันจริง",
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
  mindset: {
    lead: {
      en: "I treat learning the way I used to treat a game: farm the levels, then take on the boss.",
      th: "ผมเรียนรู้แบบเดียวกับที่เคยเล่นเกม ฟาร์มเลเวลให้พอ แล้วค่อยไปสู้บอส",
    },
    hud: { level: { en: "Level", th: "เลเวล" }, xp: { en: "XP", th: "XP" }, inventory: { en: "Inventory", th: "ไอเทม" } },
    stages: [
      {
        item: { en: "Sword", th: "ดาบ" },
        title: { en: "Farming levels", th: "ฟาร์มเลเวล" },
        text: {
          en: "I grew up farming levels in games. I ground away so I could beat the boss, find the drop I wanted and buy better armour and a better sword, and I had fun doing it.",
          th: "ตอนเด็กผมชอบเล่นเกม และชอบฟาร์มเลเวลให้สู้บอสได้ หาของที่อยากได้ ซื้อชุดเกราะดี ๆ กับดาบดี ๆ แล้วผมก็สนุกไปกับมัน",
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
          en: "I'm proud of each project on this site. I put a lot of thought into each one before I called it done.",
          th: "ผมภูมิใจกับงานทุกชิ้นที่ทำ เพราะผมคิดกับงานแต่ละชิ้นเยอะมาก",
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
