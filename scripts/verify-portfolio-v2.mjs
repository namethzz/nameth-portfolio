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
    // An employer can locate role and the actual university dates immediately.
    assert(await page.locator(".v2-internship-line").innerText() ===
      "Looking for a Front-end / Full-stack internship",
      "Internship target is not clear on the opening screen");
    assert((await page.locator(".v2-internship-dates").innerText()).includes("Apr 23, 2027"),
      "University internship availability missing");


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

    // Editorial capabilities: explicit selection, honest project evidence,
    // and navigation that does not land the heading behind the fixed header.
    const capabilityOptions = page.locator(".v2-cap-option");
    assert(await capabilityOptions.count() === 3, "Expected three capability options");
    const expectedProjects = ["OTW.SHOP", "THAI TAY", "Economic Crops Chat"];
    for (const index of [0, 2, 1, 0]) {
      await capabilityOptions.nth(index).click();
      assert(await capabilityOptions.nth(index).getAttribute("aria-pressed") === "true",
        "Selected capability is not exposed accessibly");
      const heading = await page.locator(".v2-cap-project-copy h3").innerText();
      assert(heading === expectedProjects[index],
        "Capability/project mismatch: expected " + expectedProjects[index] + " found " + heading);
      const evidenceId = await page.locator(".v2-cap-evidence").getAttribute("data-capability");
      assert(evidenceId === String(index + 1).padStart(2, "0"), "Evidence index not synchronized");
    }
    await page.locator('.v2-nav a[href$="#skills"]').click();
    await page.waitForTimeout(150);
    const navBottom = await page.locator(".v2-header").evaluate(el => el.getBoundingClientRect().bottom);
    const skillsTop = await page.locator("#v2-skills-heading").evaluate(el => el.getBoundingClientRect().top);
    assert(skillsTop > navBottom + 10, "Skills heading obscured by fixed navigation");

    // Keep the warm editorial identity consistent across About, Skills and
    // Case Study. Dark ink typography should not turn into three huge panels.
    const paperPalette = await page.evaluate(() => {
      const bg = selector => getComputedStyle(document.querySelector(selector)).backgroundColor;
      const lightness = color => {
        const values = (color.match(/[0-9.]+/g) || []).slice(0, 3).map(Number);
        return values.reduce((sum, value) => sum + value, 0) / (values.length * 255);
      };
      return {
        about: lightness(bg(".v2-about")),
        evidence: lightness(bg(".v2-cap-evidence")),
        value: lightness(bg(".v2-value")),
      };
    });
    assert(paperPalette.about > .7, "About panel should be warm light sage");
    assert(paperPalette.evidence > .7, "Capabilities project evidence should use light paper");
    assert(paperPalette.value > .7, "About highlight cards should use light paper");
    assert(await page.locator(".v2-about-signature strong").innerText() === "NAMETH®",
      "Personal identity plaque is missing");

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

    // Role and technology information must be readable, clearly structured
    // and sourced from the project, not a generic capabilities tag list.
    const dossier = page.locator(".v2-case-facts");
    assert(await dossier.getByRole("heading", { name: /My role|บทบาทของผม/i }).count() === 1,
      "Case study dossier is missing its role heading");
    assert(await dossier.getByRole("heading", { name: /Tools & technologies|เครื่องมือที่ใช้/i }).count() === 1,
      "Case study dossier is missing its technology heading");
    assert(await dossier.locator(".v2-case-tool-list li").count() === 6,
      "THAI TAY tools must come from the project's canonical data");
    // Real project evidence, not generic cover photography.
    assert(await page.locator(".v2-proof-gallery img").count() === 3,
      "Authentic THAI TAY repository screenshots missing");
    assert(await page.locator(".v2-proof-code-card").count() === 3,
      "THAI TAY evidence should include directly verifiable source links");
    const screenshotsFromRepo = await page.locator(".v2-proof-gallery img").evaluateAll(nodes =>
      nodes.every(node => node.getAttribute("src")?.includes("/namethzz/THAITAY/main/preview/")));
    assert(screenshotsFromRepo, "Proof gallery contains a non-source screenshot");

    const contrast = await dossier.locator(".v2-case-fact-value").evaluate(node => {
      const parse = color => (color.match(/[0-9.]+/g) || []).slice(0, 3).map(Number);
      const luminance = rgb => {
        const channels = rgb.map(value => {
          const c = value / 255;
          return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
        });
        return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
      };
      const ink = luminance(parse(getComputedStyle(node).color));
      const paper = luminance(parse(getComputedStyle(node.closest(".v2-case-facts")).backgroundColor));
      return (Math.max(ink, paper) + .05) / (Math.min(ink, paper) + .05);
    });
    assert(contrast >= 4.5, "Case-study role text contrast fails WCAG AA: " + contrast);
    const dossierBackground = await dossier.evaluate(node =>
      getComputedStyle(node).backgroundColor);
    assert(dossierBackground.includes("238, 232, 222"),
      "Project notes should use consistent warm parchment, got: " + dossierBackground);

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
    // Interactive evidence must remain usable on touch screens.
    await page.locator(".v2-cap-option").nth(2).click();
    assert(await page.locator(".v2-cap-project-copy h3").innerText() === "Economic Crops Chat",
      "Mobile capability selection lost its matching evidence");
    const overflowAfterSkills = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    assert(!overflowAfterSkills, "Capabilities section causes horizontal overflow");

    const trigger = page.locator(".v2-story-chapter").first().getByRole("button", { name: /Quick preview|ดูตัวอย่าง/ });
    await trigger.click();
    await page.getByRole("dialog").waitFor({ state: "visible" });
    await page.getByRole("button", { name: /Close preview|ปิดหน้าต่าง/ }).click();
    await page.getByRole("dialog").waitFor({ state: "hidden", timeout: 3000 });

    await page.goto(base + "?project=economic-crops-chat", { waitUntil: "domcontentloaded" });
    const mobileDossier = page.locator(".v2-case-facts");
    assert(await mobileDossier.locator(".v2-case-tool-list li").count() === 5,
      "Crop chat should show its five documented project technologies");
    assert(await mobileDossier.locator(".v2-case-fact-value").isVisible(),
      "Role copy is not visible on mobile case studies");
    assert(await page.locator(".v2-proof-code-card").count() === 2,
      "Crop chatbot frontend evidence missing");
    await page.goto(base + "?project=otw-shop", { waitUntil: "domcontentloaded" });
    assert(await page.locator(".v2-proof-code-card").count() === 4,
      "OTW case study should expose technical proof for four workflows");
    assert((await page.locator(".v2-case-status").innerText()).includes("Full-stack project"),
      "OTW case study status missing");

    assert(await page.locator(".v2-case-tool-list li").first().isVisible(),
      "Mobile technology item missing after palette change");
    const caseOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
    assert(!caseOverflow, "Case study metadata causes mobile horizontal overflow");
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
