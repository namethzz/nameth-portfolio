import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const port = 4177;
const base = `http://127.0.0.1:${port}/preview-v2.html`;
const server = spawn("npx", ["vite", "--host", "127.0.0.1", "--port", String(port), "--strictPort"], {
  stdio: "ignore",
  env: { ...process.env, CI: "1" },
});
let browser;

async function ready() {
  for (let tries = 0; tries < 50; tries += 1) {
    if (server.exitCode !== null) throw new Error("Preview server exited before ready");
    try {
      const response = await fetch(base);
      if (response.ok) return;
    } catch { /* Waiting for Vite. */ }
    await delay(200);
  }
  throw new Error("Vite preview server did not start");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function smokeDesktop() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  try {
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(base, { waitUntil: "domcontentloaded" });
    await page.locator("#work").waitFor();
    assert(await page.locator(".v2-opening").count() === 1, "Fullscreen opening missing");
    assert(await page.locator(".v2-hero-sticky").count() === 1, "Pinned hero missing");

    const work = page.locator("#work");
    await work.scrollIntoViewIfNeeded();
    const chapters = page.locator(".v2-story-chapter");
    assert(await chapters.count() === 3, "Expected three project chapters");

    // Regression: source index, photo, label and progress must agree for
    // every chapter, including rapid forward/backward scroll. The old
    // observer+hover race showed Economic Crops when OTW text was centered.
    async function checkSynchronizedProject(index) {
      await page.evaluate((i) => {
        const card = document.querySelectorAll(".v2-story-chapter")[i];
        if (!card) throw new Error("Chapter not found: " + i);
        const rect = card.getBoundingClientRect();
        const target = window.scrollY + rect.top + rect.height / 2 - window.innerHeight * 0.5;
        window.scrollTo({ top: target, behavior: "instant" });
      }, index);
      const expectedNumber = String(index + 1).padStart(2, "0");
      await page.waitForFunction((expected) =>
        document.querySelector(".v2-story-visual")?.getAttribute("data-active-project") === expected,
        expectedNumber,
        { timeout: 3000 },
      );
      const projectName = await chapters.nth(index).locator(".v2-story-title h3").innerText();
      assert(await page.locator(".v2-story-feature-title").innerText() === projectName,
        "Photo/title mismatch on chapter " + expectedNumber);
      assert((await page.locator(".v2-story-photo-number").innerText()).startsWith(expectedNumber),
        "Photo number mismatch on chapter " + expectedNumber);
      assert(await page.locator(".v2-story-progress .is-active").count() === 1,
        "Expected exactly one active progress segment");
      assert(await page.locator(".v2-story-progress span").nth(index).getAttribute("class") === "is-active",
        "Progress mismatch on chapter " + expectedNumber);
      assert((await page.locator(".v2-story-feature img").getAttribute("src")) ===
        (await chapters.nth(index).locator(".v2-story-mobile-image img").getAttribute("src")),
        "Project photo src mismatch on chapter " + expectedNumber);
    }
    for (const i of [0, 1, 2, 1, 0, 2]) await checkSynchronizedProject(i);

    const previewButton = chapters.first().getByRole("button", { name: /Quick preview|ดูตัวอย่าง/ });
    await previewButton.click();
    const dialog = page.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });
    assert(await dialog.locator("h2").count() === 1, "Preview dialog heading missing");
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden", timeout: 3000 });
    const focused = await previewButton.evaluate(node => document.activeElement === node);
    assert(focused, "Modal did not restore focus to Quick Preview trigger");

    await chapters.first().getByRole("link", { name: /Full case study|อ่านรายละเอียด/ }).click();
    await page.waitForURL(/project=thai-tay/);
    await page.locator(".v2-case-study h1").waitFor();
    assert(await page.locator(".v2-case-study h1").innerText() === "THAI TAY", "Case study not loaded");

    await page.locator(".v2-case-study .v2-inline-link").first().click();
    await page.waitForURL(/#work/);
    assert(await page.locator(".v2-story-chapter").count() === 3, "Returning home lost the work section");

    await page.getByRole("button", { name: "ภาษาไทย" }).click();
    assert(await page.locator(".portfolio-v2").getAttribute("lang") === "th", "Language switch failed");
    assert(errors.length === 0, `Uncaught desktop errors: ${errors.join("; ")}`);
  } finally { await page.close(); }
}

async function smokeAnimatedScroll() {
  // Test with actual animations enabled; the previous mode="wait" kept
  // project 02 on the image stage after chapter 03 had become active.
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  try {
    await page.goto(base, { waitUntil: "domcontentloaded" });
    await page.locator(".v2-story-chapter").first().waitFor();
    for (const index of [2, 1, 0, 2]) {
      await page.evaluate((i) => {
        const card = document.querySelectorAll(".v2-story-chapter")[i];
        const rect = card.getBoundingClientRect();
        window.scrollTo({
          top: window.scrollY + rect.top + rect.height / 2 - innerHeight / 2,
          behavior: "instant",
        });
      }, index);
      const number = String(index + 1).padStart(2, "0");
      await page.waitForFunction((expected) =>
        document.querySelector(".v2-story-visual")?.getAttribute("data-active-project") === expected,
        number,
        { timeout: 3000 },
      );
      // Check the selected photo and its title immediately, not after
      // waiting for the 300ms cosmetic opacity animation to finish.
      const photo = page.locator(".v2-story-feature img");
      const cardImg = page.locator(".v2-story-chapter").nth(index).locator(".v2-story-mobile-image img");
      assert(await photo.getAttribute("src") === await cardImg.getAttribute("src"),
        "Animated image not synchronized with current chapter: " + number);
      assert((await page.locator(".v2-story-photo-number").innerText()).startsWith(number),
        "Animated stage counter not synchronized: " + number);
    }
  } finally { await page.close(); }
}

async function smokeMobile() {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  try {
    await page.goto(base, { waitUntil: "domcontentloaded" });
    await page.locator(".v2-story-chapter").first().scrollIntoViewIfNeeded();
    assert(await page.locator(".v2-story-visual").isHidden(), "Desktop sticky stage was not disabled on mobile");
    assert(await page.locator(".v2-story-mobile-image").first().isVisible(), "Mobile project image missing");
    const overflows = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    assert(!overflows, "Unexpected horizontal scroll on mobile");
    const trigger = page.locator(".v2-story-chapter").first().getByRole("button", { name: /Quick preview|ดูตัวอย่าง/ });
    await trigger.click();
    await page.getByRole("dialog").waitFor({ state: "visible" });
    await page.getByRole("button", { name: /Close preview|ปิดหน้าต่าง/ }).click();
    await page.getByRole("dialog").waitFor({ state: "hidden", timeout: 3000 });
  } finally { await page.close(); }
}

try {
  await ready();
  browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--no-sandbox"] });
  await smokeDesktop();
  await smokeAnimatedScroll();
  await smokeMobile();
  console.log("Portfolio v2 browser smoke checks passed");
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  server.kill("SIGTERM");
}
