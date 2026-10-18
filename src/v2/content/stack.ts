import type { Language } from "@/lib/content";

type Localized = Record<Language, string>;

/**
 * Languages and tools, grouped the way they are used. Every entry appears in
 * at least one public project repository; edit here to add or remove items.
 */
export const stack: ReadonlyArray<{ id: string; label: Localized; caption: Localized; items: string[] }> = [
  {
    id: "languages",
    label: { en: "Languages", th: "ภาษาที่เขียน" },
    caption: { en: "Markup, styling and programming", th: "ภาษาสำหรับหน้าเว็บและเขียนโปรแกรม" },
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "C#", "Python", "SQL"],
  },
  {
    id: "frontend",
    label: { en: "Frontend", th: "Frontend" },
    caption: { en: "Interfaces people use", th: "หน้าเว็บที่ผู้ใช้เห็น" },
    items: ["React", "Vite", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: { en: "Backend", th: "Backend" },
    caption: { en: "APIs and server logic", th: "API และระบบหลังบ้าน" },
    items: ["Node.js", "Express", "ASP.NET Core", "Entity Framework Core", "FastAPI"],
  },
  {
    id: "databases",
    label: { en: "Databases", th: "ฐานข้อมูล" },
    caption: { en: "Documents, tables and vectors", th: "ทั้งแบบเอกสาร ตาราง และเวกเตอร์" },
    items: ["MongoDB", "MongoDB Atlas", "Mongoose", "MySQL", "ChromaDB"],
  },
  {
    id: "data-ai",
    label: { en: "Data & AI", th: "ข้อมูลและ AI" },
    caption: { en: "Cleaning data, retrieval and LLMs", th: "ทำความสะอาดข้อมูล ระบบค้นข้อมูล และ LLM" },
    items: ["Pandas", "RAG", "LLM APIs"],
  },
  {
    id: "tools",
    label: { en: "Tools", th: "เครื่องมือ" },
    caption: { en: "Versioning, testing and automation", th: "จัดการเวอร์ชัน ทดสอบ และอัตโนมัติ" },
    items: ["Git", "GitHub", "GitHub Actions", "Docker", "Postman", "n8n"],
  },
  {
    id: "deploy",
    label: { en: "Deploy", th: "Deploy" },
    caption: { en: "Where my projects run", th: "ที่ที่โปรเจกต์ของผมรันอยู่" },
    items: ["Vercel", "Render", "Railway", "Hugging Face Spaces", "GitHub Pages"],
  },
];
