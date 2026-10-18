import type { IconType } from "react-icons";
import {
  SiCss3, SiDocker, SiDotnet, SiExpress, SiFastapi, SiGit, SiGithub, SiGithubactions, SiGithubpages,
  SiHtml5, SiHuggingface, SiJavascript, SiMongodb, SiMongoose, SiMysql, SiN8N, SiNodedotjs, SiPandas,
  SiPostman, SiPython, SiRailway, SiReact, SiRender, SiTailwindcss, SiTypescript, SiVercel, SiVite, SiVitest,
} from "react-icons/si";
import {
  TbApi, TbBrain, TbBrandCSharp, TbCode, TbDatabase, TbRocket, TbSql, TbTestPipe,
  TbTestPipe2, TbTool, TbTopologyStar3, TbVectorTriangle, TbChartDots3, TbAutomation, TbLayersSubtract,
} from "react-icons/tb";
import type { Language } from "@/lib/content";

type Localized = Record<Language, string>;
export type StackItem = { name: string; icon: IconType; color: string };
export type StackGroup = { id: string; icon: IconType; label: Localized; caption: Localized; items: StackItem[] };

/**
 * Languages and tools, grouped the way they are used. Every entry appears in
 * at least one public project repository; edit here to add or remove items.
 * `color` is the brand colour, tuned to stay visible on a dark card.
 */
export const stack: ReadonlyArray<StackGroup> = [
  {
    id: "languages",
    icon: TbCode,
    label: { en: "Programming languages", th: "ภาษาโปรแกรม" },
    caption: { en: "What my projects are written in", th: "ภาษาที่ใช้เขียนโปรเจกต์" },
    items: [
      { name: "C#", icon: TbBrandCSharp, color: "#B07FE6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#4F9BEA" },
      { name: "Python", icon: SiPython, color: "#FFD43B" },
      { name: "SQL", icon: TbSql, color: "#9CC8F0" },
    ],
  },
  {
    id: "web",
    icon: TbLayersSubtract,
    label: { en: "Web development", th: "พัฒนาเว็บ" },
    caption: { en: "Frontends and the servers behind them", th: "หน้าเว็บและระบบหลังบ้าน" },
    items: [
      { name: "HTML", icon: SiHtml5, color: "#F06529" },
      { name: "CSS", icon: SiCss3, color: "#3D8FE0" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Vite", icon: SiVite, color: "#A78BFA" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
      { name: "Node.js", icon: SiNodedotjs, color: "#6CC24A" },
      { name: "Express", icon: SiExpress, color: "#E5E7EB" },
      { name: "ASP.NET Core", icon: SiDotnet, color: "#A88BF0" },
      { name: "FastAPI", icon: SiFastapi, color: "#26B3A0" },
    ],
  },
  {
    id: "databases",
    icon: TbDatabase,
    label: { en: "Databases", th: "ฐานข้อมูล" },
    caption: { en: "Documents, tables and vectors", th: "ทั้งแบบเอกสาร ตาราง และเวกเตอร์" },
    items: [
      { name: "MongoDB", icon: SiMongodb, color: "#4DB33D" },
      { name: "MongoDB Atlas", icon: SiMongodb, color: "#4DB33D" },
      { name: "Mongoose", icon: SiMongoose, color: "#C0504D" },
      { name: "MySQL", icon: SiMysql, color: "#5D9FD0" },
      { name: "Entity Framework Core", icon: SiDotnet, color: "#A88BF0" },
      { name: "ChromaDB", icon: TbVectorTriangle, color: "#F5B83D" },
    ],
  },
  {
    id: "data-ai",
    icon: TbBrain,
    label: { en: "Data & AI", th: "ข้อมูลและ AI" },
    caption: { en: "Cleaning data, retrieval and LLMs", th: "ทำความสะอาดข้อมูล ระบบค้นข้อมูล และ LLM" },
    items: [
      { name: "Pandas", icon: SiPandas, color: "#9B8CF0" },
      { name: "Data cleaning", icon: TbChartDots3, color: "#7DD3C0" },
      { name: "RAG", icon: TbTopologyStar3, color: "#F59E6B" },
      { name: "LLM APIs", icon: TbBrain, color: "#F0A6CA" },
      { name: "Hugging Face", icon: SiHuggingface, color: "#FFD21E" },
    ],
  },
  {
    id: "testing",
    icon: TbTestPipe,
    label: { en: "Testing & API tools", th: "ทดสอบและเครื่องมือ API" },
    caption: { en: "Checking that it actually works", th: "ตรวจว่าระบบทำงานได้จริง" },
    items: [
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "REST APIs", icon: TbApi, color: "#9CC8F0" },
      { name: "xUnit", icon: TbTestPipe2, color: "#A88BF0" },
      { name: "Vitest", icon: SiVitest, color: "#8BC34A" },
      { name: "Playwright", icon: TbTestPipe, color: "#45BA4B" },
    ],
  },
  {
    id: "automation",
    icon: TbAutomation,
    label: { en: "Automation & CI", th: "งานอัตโนมัติและ CI" },
    caption: { en: "Workflows that run without me", th: "ให้ระบบทำงานแทนเรา" },
    items: [
      { name: "n8n", icon: SiN8N, color: "#EA4B71" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#4F9BEA" },
    ],
  },
  {
    id: "tools",
    icon: TbTool,
    label: { en: "Development tools", th: "เครื่องมือพัฒนา" },
    caption: { en: "Versioning and containers", th: "จัดการเวอร์ชันและ container" },
    items: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#E5E7EB" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
    ],
  },
  {
    id: "deploy",
    icon: TbRocket,
    label: { en: "Deploy", th: "Deploy" },
    caption: { en: "Where my projects run live", th: "ที่ที่โปรเจกต์ของผมรันอยู่จริง" },
    items: [
      { name: "Vercel", icon: SiVercel, color: "#E5E7EB" },
      { name: "Render", icon: SiRender, color: "#E5E7EB" },
      { name: "Railway", icon: SiRailway, color: "#E5E7EB" },
      { name: "Hugging Face Spaces", icon: SiHuggingface, color: "#FFD21E" },
      { name: "GitHub Pages", icon: SiGithubpages, color: "#E5E7EB" },
    ],
  },
];
