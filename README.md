# Nameth Wongmongkol — Portfolio

- THAI TAY — Construction Price Intelligence
- Economic Crops Chat — Agricultural data advisory chatbot
- OTW.SHOP — ร้านอาหารเสริมด้วย C# / ASP.NET Core MVC พร้อมลิงก์ https://github.com/namethzz/OTW

## เริ่มรันในเครื่อง

ติดตั้ง Node.js 24 และ Git จากเว็บไซต์ทางการ แล้วเปิด Terminal ในโฟลเดอร์ที่มี `package.json`

```bash
npm ci
npm run dev
```

เปิด URL ที่ Vite แสดงใน Terminal ปกติคือ `http://localhost:5173`

ก่อนเผยแพร่ ให้ตรวจและ build ด้วย:

```bash
npm run build
npm run preview
```

`build` ตรวจ TypeScript ก่อนสร้างไฟล์เว็บใน `dist/` ส่วน `preview` ใช้เปิดดู build ในเครื่อง

## อัปโค้ดขึ้น GitHub

1. สร้าง repository ใหม่ในบัญชี `namethzz` เช่น `nameth-portfolio`
2. ถ้าจะใช้ GitHub Pages ตามขั้นตอนนี้ ให้เลือก Public
3. สร้างเป็น repository ว่าง โดยยังไม่เพิ่ม README, .gitignore หรือ license ผ่านหน้า GitHub เพราะ ZIP นี้มีไฟล์โปรเจกต์และ README อยู่แล้ว
4. แตก ZIP แล้วเปิด Terminal ในโฟลเดอร์ `nameth-portfolio` ที่มี `package.json`
5. ใช้คำสั่งต่อไปนี้ โดยแก้ URL ถ้าคุณตั้งชื่อ repository ต่างออกไป

```bash
git init
git add .
git commit -m "Add portfolio website"
git branch -M main
git remote add origin https://github.com/namethzz/nameth-portfolio.git
git push -u origin main
```

คำสั่งนี้เป็นขั้นตอนที่คุณใช้หลังจากสร้าง repository แล้ว ไฟล์ชุดนี้ยังไม่ได้ถูกอัปโหลดไปยังบัญชี GitHub ของคุณ

## เปิดเว็บไซต์ด้วย GitHub Pages

หลัง push โค้ด:

1. เปิด repository → **Settings → Pages**
2. ใน **Build and deployment → Source** เลือก **GitHub Actions**
3. เปิดแท็บ **Actions** แล้วเลือก workflow **Publish portfolio to GitHub Pages**
4. ถ้า workflow ครั้งแรกยังไม่สำเร็จเพราะเพิ่งเปิด Pages ให้กด **Run workflow** เพื่อเริ่มใหม่
5. เมื่อสำเร็จ ดู URL ที่ **Settings → Pages**

ไฟล์ `.github/workflows/deploy.yml` จะติดตั้ง dependencies, ตรวจ TypeScript, build และเผยแพร่ใหม่เมื่อ push เข้า `main`

โปรเจกต์ตั้งค่า path รูป วิดีโอ ฟอนต์ และเรซูเม่ให้รองรับทั้ง:

- repository `nameth-portfolio` → URL รูปแบบ `https://namethzz.github.io/nameth-portfolio/`
- repository `namethzz.github.io` → URL รูปแบบ `https://namethzz.github.io/`

URL ข้างต้นเป็นรูปแบบที่จะได้หลังคุณสร้าง repository และเปิด Pages สำเร็จ

ถ้าต้องการ URL สั้นสำหรับใส่ในเรซูเม่ แนะนำใช้ repository ชื่อ `namethzz.github.io` หากคุณยังไม่ได้ใช้ชื่อนี้ หากเลือกชื่อนั้นให้แก้ URL ในคำสั่ง `git remote add origin` ตามชื่อ repository ด้วย

## ใช้ Vercel เป็นอีกทางเลือก

หลังอัปโค้ดขึ้น GitHub สามารถ import repository เข้า Vercel ได้ เลือก framework **Vite**, build command **npm run build**, output directory **dist** โดยใช้ base path `/` ตามค่าเริ่มต้น

## แก้เนื้อหาตรงไหน

| ต้องการแก้ | ไฟล์ |
| --- | --- |
| ชื่อ คำแนะนำตัว ผลงาน ทักษะ และช่องทางติดต่อ | `components/portfolio.tsx` |
| Hero, navigation และ animation | `components/ui/prisma-hero.tsx` |
| สี ฟอนต์ ระยะห่าง และ responsive layout | `src/globals.css` |
| รูป วิดีโอ และไฟล์เรซูเม่ | `public/assets/` |
| ชื่อเว็บไซต์ คำอธิบาย และ favicon | `index.html`, `public/favicon.svg` |
| การเผยแพร่ผ่าน GitHub Pages | `.github/workflows/deploy.yml` |

เมื่อเพิ่มรูปใน `public/assets/` ให้ใช้ `assetUrl("assets/ชื่อไฟล์.jpg")` จาก `lib/assets.ts` ใน React เพื่อให้ลิงก์ถูกต้องเมื่อเว็บอยู่ใน subfolder บน GitHub Pages

หลังแก้โค้ด ใช้:

```bash
npm run build
git add .
git commit -m "Update portfolio"
git push
```

## เทคโนโลยี

React, TypeScript, Vite, Tailwind CSS 4, shadcn UI, Radix UI, Framer Motion และ Lucide React

- `components/ui/` เป็นที่เก็บ reusable UI และใช้ alias `@/components/ui/...`
- `components.json` ตั้งค่า shadcn สำหรับโปรเจกต์นี้แล้ว
- Styles หลักอยู่ใน `src/globals.css`
- เว็บนี้เป็น portfolio ที่ build เป็น static files ได้ การคลิก OTW.SHOP เปิดรายละเอียดผลงานและลิงก์ source code

## เครดิตและเอกสาร

รายละเอียด component: [INTEGRATION.md](INTEGRATION.md)

แหล่งที่มาของรูปและฟอนต์: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) และ `docs/`

แหล่งอ้างอิงขั้นตอนเผยแพร่:

- https://vite.dev/guide/static-deploy.html
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/repositories/creating-and-managing-repositories/adding-locally-hosted-code-to-github
