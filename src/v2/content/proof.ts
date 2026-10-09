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
const thaiPreview = "https://raw.githubusercontent.com/namethzz/THAITAY/main/preview";

const proof = [
  {
    stage: {
      en: "In progress — material data preparation; forecasting is a future milestone.",
      th: "กำลังพัฒนา — เตรียมข้อมูลราคาวัสดุ ส่วนการพยากรณ์เป็นเป้าหมายถัดไป",
    },
    screenshots: [
      {
        src: thaiPreview + "/desktop.png",
        caption: { en: "Desktop interface", th: "หน้าเว็บบนคอมพิวเตอร์" },
        alt: { en: "THAI TAY actual desktop UI screenshot from its repository", th: "ภาพหน้าจอเว็บ THAI TAY จาก Repository จริง" },
      },
      {
        src: thaiPreview + "/materials.png",
        caption: { en: "Material browsing interface", th: "หน้าสำรวจรายการวัสดุ" },
        alt: { en: "Material price browser interface in THAI TAY", th: "หน้ารายการวัสดุของ THAI TAY" },
      },
      {
        src: thaiPreview + "/analysis.png",
        caption: { en: "Price analysis interface", th: "หน้าวิเคราะห์ราคา" },
        alt: { en: "Data analysis screen in THAI TAY", th: "หน้าวิเคราะห์ข้อมูลใน THAI TAY" },
      },
    ],
    engineering: [
      {
        title: { en: "Build the material browser", th: "พัฒนาหน้าสำรวจวัสดุ" },
        description: {
          en: "The Materials page organizes the UI for looking through structural material information.",
          th: "หน้า Materials จัดรูปแบบการค้นดูข้อมูลรายการวัสดุโครงสร้าง",
        },
        source: thaiRepo + "/frontend/src/pages/Materials.tsx",
      },
      {
        title: { en: "Explore price data visually", th: "นำเสนอข้อมูลราคาผ่านกราฟ" },
        description: {
          en: "The Analysis page connects the interface to exploration of historical prices.",
          th: "หน้า Analysis รองรับการสำรวจแนวโน้มราคาย้อนหลังผ่าน UI",
        },
        source: thaiRepo + "/frontend/src/pages/Analysis.tsx",
      },
      {
        title: { en: "Develop the overview", th: "สร้างหน้า Overview" },
        description: {
          en: "The project overview introduces the material-price problem and entry points.",
          th: "หน้า Overview อธิบายขอบเขตข้อมูลราคาและทางเข้าส่วนต่าง ๆ ของเว็บไซต์",
        },
        source: thaiRepo + "/frontend/src/pages/Overview.tsx",
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
          en: "Frontend components for presenting the chatbot conversation.",
          th: "คอมโพเนนต์ฝั่ง Frontend สำหรับแสดงบทสนทนา",
        },
        source: cropsRepo + "/frontend/src/components/ChatArea.jsx",
      },
      {
        title: { en: "Crop filters and discovery", th: "การเลือกข้อมูลพืช" },
        description: {
          en: "A component for filtering crop-related information in the interface.",
          th: "คอมโพเนนต์สำหรับเลือกและกรองข้อมูลที่เกี่ยวข้องกับพืช",
        },
        source: cropsRepo + "/frontend/src/components/CropFilterBar.jsx",
      },
    ],
  },
  {
    stage: { en: "Implemented e-commerce project — public storefront and source available.", th: "โปรเจกต์ร้านค้าออนไลน์ — มีหน้าร้านและ Source Code ให้ตรวจสอบ" },
    screenshots: [{
      src: assetUrl("assets/work/otw-storefront.png"),
      caption: { en: "Actual deployed storefront — captured Oct 2026", th: "ภาพหน้าร้านจริงจากเว็บที่ Deploy — ต.ค. 2569" },
      alt: { en: "Actual screenshot of the deployed OTW.SHOP storefront", th: "ภาพหน้าจอเว็บไซต์ OTW.SHOP ที่เปิดใช้งานจริง" },
    }],
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
