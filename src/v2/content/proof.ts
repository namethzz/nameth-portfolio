import type { Language } from "@/lib/content";
import { assetUrl } from "@/lib/assets";

type Localized = Record<Language, string>;
export type ProofItem = {
  title: Localized;
  description: Localized;
  source: string;
};
export type EvidenceImage = {
  src: string;
  caption: Localized;
  alt: Localized;
};

/**
 * Verifiable project material. Keep links tied to public files in the
 * original repositories; no fictional results or invented screenshots.
 */
const thaiRepo = "https://github.com/namethzz/THAITAY/blob/main";
const otwRepo = "https://github.com/namethzz/OTW/blob/main";
const cropsRepo = "https://github.com/namethzz/chatbot-project/blob/main";
const airRepo = "https://github.com/namethzz/Air-clean-/blob/main";
const kickRepo = "https://github.com/namethzz/kickhub/blob/main";

const proof = [
  {
    stage: {
      en: "Frontend complete (v0.10) — backend and price forecasting model in progress; prices on the site are labelled sample data.",
      th: "หน้าเว็บเสร็จแล้ว (v0.10) — กำลังทำ Backend และโมเดลพยากรณ์ราคา ราคาบนเว็บตอนนี้เป็นข้อมูลตัวอย่างที่มีป้ายบอก",
    },
    screenshots: [
      {
        src: assetUrl("assets/work/thaitay-home.jpg"),
        caption: { en: "Live site — search from the home page", th: "เว็บจริง — ค้นหาวัสดุจากหน้าแรก" },
        alt: { en: "Actual screenshot of the deployed THAI TAY home page", th: "ภาพหน้าจอจริงของหน้าแรกเว็บไซต์ THAI TAY" },
      },
      {
        src: assetUrl("assets/work/thaitay-material.jpg"),
        caption: { en: "Material page with 1–3 month forecast", th: "หน้าวัสดุพร้อมราคาคาดการณ์ 1–3 เดือน" },
        alt: { en: "THAI TAY material page showing the latest price, forecasts and a cost calculator", th: "หน้าวัสดุของ THAI TAY แสดงราคาล่าสุด ราคาคาดการณ์ และช่องคำนวณต้นทุน" },
      },
      {
        src: assetUrl("assets/work/thaitay-search.jpg"),
        caption: { en: "Search results by category", th: "ผลค้นหาแยกตามหมวดวัสดุ" },
        alt: { en: "THAI TAY search results listing rebar with prices per tonne", th: "ผลค้นหาเหล็กเส้นใน THAI TAY พร้อมราคาต่อตัน" },
      },
    ],
    engineering: [
      {
        title: { en: "One price layer, ready for an API", th: "ชั้นข้อมูลราคาที่รอต่อ API" },
        description: {
          en: "Every page reads prices through this service. It documents the history and forecast endpoints the backend will serve.",
          th: "ทุกหน้าดึงราคาผ่าน service นี้ และระบุรูปแบบ endpoint ราคาย้อนหลังและราคาคาดการณ์ที่ Backend จะต้องส่งให้",
        },
        source: thaiRepo + "/frontend/src/services/priceService.ts",
      },
      {
        title: { en: "Rebar priced per bar", th: "คิดราคาเหล็กเส้นเป็นเส้น" },
        description: {
          en: "Shops quote rebar per tonne but sites count bars, so the standard 0.00617 × d² kg/m weight converts one to the other.",
          th: "ร้านขายเป็นตันแต่หน้างานนับเป็นเส้น จึงแปลงด้วยน้ำหนักมาตรฐาน 0.00617 × ศก.² กก./ม.",
        },
        source: thaiRepo + "/frontend/src/lib/rebar.ts",
      },
      {
        title: { en: "Estimates shared as a link", th: "ส่งใบประมาณราคาเป็นลิงก์" },
        description: {
          en: "The items and prices on the day it was sent are encoded into the link itself, so sharing needs no server.",
          th: "รายการและราคา ณ วันที่ส่งถูกเก็บไว้ในลิงก์ จึงส่งต่อได้โดยไม่ต้องมีเซิร์ฟเวอร์",
        },
        source: thaiRepo + "/frontend/src/lib/shareEstimate.ts",
      },
    ],
  },
  {
    stage: { en: "Team project — data preparation and frontend contribution.", th: "โปรเจกต์กลุ่ม — รับผิดชอบเตรียมข้อมูลและงาน Frontend" },
    screenshots: [] as EvidenceImage[],
    engineering: [
      {
        title: { en: "Chat interface", th: "หน้าสนทนา" },
        description: {
          en: "The chat view brings together the conversation list, messages and the question composer.",
          th: "หน้าแชตที่รวมรายการบทสนทนา ข้อความ และช่องพิมพ์คำถามไว้ด้วยกัน",
        },
        source: cropsRepo + "/frontend/src/components/chat/ChatView.tsx",
      },
      {
        title: { en: "A starting point for farmers", th: "หน้าแรกสำหรับเริ่มถาม" },
        description: {
          en: "The landing page explains what the chatbot answers and offers ready-made questions to start with.",
          th: "หน้าแรกบอกว่าแชตบอตตอบเรื่องอะไรได้บ้าง และมีคำถามตัวอย่างให้กดเริ่มคุยได้ทันที",
        },
        source: cropsRepo + "/frontend/src/components/Landing.tsx",
      },
    ],
  },
  {
    stage: { en: "Implemented e-commerce project — public storefront and source available.", th: "โปรเจกต์ร้านค้าออนไลน์ — มีหน้าร้านและ Source Code ให้ตรวจสอบ" },
    screenshots: [
      {
        src: assetUrl("assets/work/otw-home.png"),
        caption: { en: "Actual deployed storefront — captured Oct 2026", th: "ภาพหน้าร้านจริงจากเว็บที่ Deploy — ต.ค. 2569" },
        alt: { en: "Actual screenshot of the deployed OTW.SHOP storefront", th: "ภาพหน้าจอเว็บไซต์ OTW.SHOP ที่เปิดใช้งานจริง" },
      },
      {
        src: assetUrl("assets/work/otw-shop.png"),
        caption: { en: "Real product catalog and browsing UI", th: "หน้ารายการและค้นดูสินค้าจากเว็บจริง" },
        alt: { en: "Actual product catalog page of OTW.SHOP", th: "ภาพหน้าจอจริงของหน้ารายการสินค้า OTW.SHOP" },
      },
    ],
    engineering: [
      {
        title: { en: "Search, filter and cart", th: "ค้นหา กรองสินค้า และตะกร้า" },
        description: {
          en: "ShopController handles product filtering, sorting, product details and cart actions.",
          th: "ShopController จัดการค้นหา กรอง เรียงลำดับ รายละเอียดสินค้า และตะกร้า",
        },
        source: otwRepo + "/Controllers/ShopController.cs",
      },
      {
        title: { en: "Checkout and promotions", th: "ขั้นตอนสั่งซื้อและโปรโมชั่น" },
        description: {
          en: "CheckoutController checks logged-in state, totals and promotion eligibility during ordering.",
          th: "CheckoutController ตรวจสถานะผู้ใช้ คำนวณยอด และตรวจสิทธิ์โปรโมชั่นขณะสั่งซื้อ",
        },
        source: otwRepo + "/Controllers/CheckoutController.cs",
      },
      {
        title: { en: "Admin workflows", th: "ระบบหลังบ้าน" },
        description: {
          en: "AdminController contains dashboard, product and management workflows.",
          th: "AdminController มีส่วนจัดการ Dashboard สินค้า และงานของผู้ดูแล",
        },
        source: otwRepo + "/Controllers/AdminController.cs",
      },
      {
        title: { en: "Views for both sides", th: "หน้าเว็บฝั่งลูกค้าและแอดมิน" },
        description: {
          en: "The shop and admin views are implemented in ASP.NET Core MVC/Razor.",
          th: "หน้า Shop และ Admin พัฒนาด้วย ASP.NET Core MVC / Razor",
        },
        source: otwRepo + "/Views/Admin/Dashboard.cshtml",
      },
    ],
  },
  {
    stage: { en: "Live full-stack marketplace — deployed on Render with CI and an end-to-end smoke test.", th: "แพลตฟอร์ม Full-stack ที่เปิดใช้งานจริง — Deploy บน Render มี CI และ smoke test ทั้งระบบ" },
    screenshots: [
      {
        src: assetUrl("assets/work/airclean-home.jpg"),
        caption: { en: "Live landing page", th: "หน้าแรกของเว็บจริง" },
        alt: { en: "Actual screenshot of the deployed AirClean landing page", th: "ภาพหน้าจอจริงของหน้าแรกเว็บไซต์ AirClean" },
      },
      {
        // Signed-in screens: the repository's own phone-width captures, placed side by side.
        src: assetUrl("assets/work/airclean-app.jpg"),
        caption: { en: "Request form, quotes and nearby jobs (demo data)", th: "ฟอร์มขอช่าง ข้อเสนอราคา และงานใกล้ช่าง (ข้อมูลตัวอย่าง)" },
        alt: { en: "Three AirClean app screens from the repository: the booking form, a customer comparing quotes, and a technician's nearby jobs", th: "หน้าจอแอป AirClean 3 หน้าจาก Repository: ฟอร์มขอช่าง ลูกค้าเปรียบเทียบข้อเสนอ และงานใกล้ช่าง" },
      },
      {
        src: assetUrl("assets/work/airclean-how.jpg"),
        caption: { en: "How a job works, step by step", th: "ขั้นตอนการใช้งานตั้งแต่ส่งคำขอ" },
        alt: { en: "AirClean landing page section explaining the four steps of a job", th: "ส่วนหนึ่งของหน้าแรก AirClean ที่อธิบายขั้นตอนการใช้งาน 4 ขั้น" },
      },
    ],
    engineering: [
      {
        title: { en: "Distance without the address", th: "บอกระยะโดยไม่เผยที่อยู่" },
        description: {
          en: "FuzzPoint and BlurredDistanceKm measure to a fixed, randomly offset point, so repeated searches can't reveal where a customer lives.",
          th: "FuzzPoint และ BlurredDistanceKm วัดระยะไปยังจุดสุ่มที่เก็บไว้ตายตัว ค้นหาซ้ำกี่ครั้งก็หาที่อยู่ลูกค้าไม่ได้",
        },
        source: airRepo + "/backend/AirClean.Api/Controllers/ApiHelpers.cs",
      },
      {
        title: { en: "Quotes from price lists", th: "ราคาจากใบราคาของช่าง" },
        description: {
          en: "Pricing builds each quote from the technician's own price list and works out the going rate across technicians.",
          th: "Pricing คำนวณข้อเสนอจากใบราคาของช่างแต่ละคน และหาราคากลางจากช่างทั้งหมด",
        },
        source: airRepo + "/backend/AirClean.Api/Services/Pricing.cs",
      },
      {
        title: { en: "Slip checks with the bank", th: "ตรวจสลิปกับธนาคาร" },
        description: {
          en: "SlipVerifier sends PromptPay slips to Slip2Go and checks the account, exact amount, date, and that the slip is unused.",
          th: "SlipVerifier ส่งสลิปพร้อมเพย์ไปตรวจกับ Slip2Go ทั้งบัญชีปลายทาง ยอดเงิน วันที่ และสลิปต้องไม่เคยใช้มาก่อน",
        },
        source: airRepo + "/backend/AirClean.Api/Services/SlipVerifier.cs",
      },
      {
        title: { en: "Web Push from the standards", th: "Web Push ตามมาตรฐาน RFC" },
        description: {
          en: "Payload encryption and VAPID signing written with .NET's built-in cryptography, without a push library.",
          th: "เข้ารหัสข้อความและเซ็น VAPID ด้วย cryptography ที่มากับ .NET โดยไม่ใช้ไลบรารีสำเร็จรูป",
        },
        source: airRepo + "/backend/AirClean.Api/Services/WebPushSender.cs",
      },
    ],
  },
  {
    stage: { en: "Live full-stack web app — deployed on Render with MongoDB Atlas and tested in CI.", th: "เว็บ Full-stack ที่เปิดใช้งานจริง — Deploy บน Render คู่กับ MongoDB Atlas และมี test รันใน CI" },
    screenshots: [
      {
        src: assetUrl("assets/work/kickhub-home.jpg"),
        caption: { en: "Live home page", th: "หน้าแรกของเว็บจริง" },
        alt: { en: "Actual screenshot of the deployed KickHub home page", th: "ภาพหน้าจอจริงของหน้าแรกเว็บไซต์ KickHub" },
      },
      {
        // Signed-in screens: the repository's own phone-width captures, placed side by side.
        src: assetUrl("assets/work/kickhub-app.jpg"),
        caption: { en: "Party search, details and join requests (demo data)", th: "ค้นหาปาร์ตี้ รายละเอียด และคำขอเข้าร่วม (ข้อมูลตัวอย่าง)" },
        alt: { en: "Three KickHub screens from the repository: party search, party details and the host's join requests", th: "หน้าจอ KickHub 3 หน้าจาก Repository: ค้นหาปาร์ตี้ รายละเอียดปาร์ตี้ และหน้าหัวตี้อนุมัติคำขอ" },
      },
      {
        src: assetUrl("assets/work/kickhub-fields.jpg"),
        caption: { en: "Fields listed on the live site", th: "สนามที่ลงไว้บนเว็บจริง" },
        alt: { en: "KickHub home page section listing football fields with prices", th: "ส่วนหนึ่งของหน้าแรก KickHub ที่แสดงสนามฟุตบอลพร้อมราคา" },
      },
    ],
    engineering: [
      {
        title: { en: "Party rules on the server", th: "กติกาปาร์ตี้ฝั่งเซิร์ฟเวอร์" },
        description: {
          en: "partyService checks capacity, positions and start time, and retries when two edits collide.",
          th: "partyService ตรวจที่ว่าง ตำแหน่ง และเวลาเริ่ม และลองใหม่เมื่อมีการแก้ไขชนกัน",
        },
        source: kickRepo + "/Backend/services/partyService.js",
      },
      {
        title: { en: "Search with validated filters", th: "ค้นหาพร้อมตรวจตัวกรอง" },
        description: {
          en: "partySearchService validates every filter and builds the MongoDB query, including open slots per position.",
          th: "partySearchService ตรวจตัวกรองทุกตัวแล้วสร้าง query ของ MongoDB รวมถึงนับที่ว่างแยกตามตำแหน่ง",
        },
        source: kickRepo + "/Backend/services/partySearchService.js",
      },
      {
        title: { en: "Account deletion", th: "ลบบัญชีและข้อมูล" },
        description: {
          en: "Removes a user's data across parties, chats and fields while keeping other players' history intact.",
          th: "ลบข้อมูลของผู้ใช้ออกจากปาร์ตี้ แชต และสนาม โดยไม่กระทบประวัติของผู้เล่นคนอื่น",
        },
        source: kickRepo + "/Backend/services/accountDeletionService.js",
      },
      {
        title: { en: "Sign-in rate limits", th: "จำกัดการลองเข้าสู่ระบบ" },
        description: {
          en: "Only failed logins count toward the limit, so players sharing a campus IP aren't locked out.",
          th: "นับเฉพาะครั้งที่เข้าสู่ระบบไม่สำเร็จ ผู้เล่นที่ใช้ IP เดียวกันจึงไม่โดนล็อกโดยไม่จำเป็น",
        },
        source: kickRepo + "/Backend/middleware/rateLimits.js",
      },
    ],
  },
] satisfies ReadonlyArray<{stage: Localized; screenshots: EvidenceImage[]; engineering: ProofItem[]}>;

export function getProjectProof(number: string, language: Language) {
  const index = Math.max(0, Math.min(proof.length - 1, Number(number) - 1));
  const entry = proof[index];
  return {
    stage: entry.stage[language],
    screenshots: entry.screenshots.map((shot) => ({
      src: shot.src,
      caption: shot.caption[language],
      alt: shot.alt[language],
    })),
    engineering: entry.engineering.map((item) => ({
      title: item.title[language],
      description: item.description[language],
      source: item.source,
    })),
  };
}
