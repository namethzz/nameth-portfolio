import { chromium } from "playwright";
import { mkdir, stat } from "node:fs/promises";
import { setTimeout as sleep } from "node:timers/promises";

/**
 * Capture the PUBLIC storefront that the developer actually shipped.
 * Fails rather than committing an error page or invented screenshot.
 * Requires GitHub Actions' pre-installed Google Chrome.
 */
const site = "https://otw-production.up.railway.app/";
const path = "public/assets/work/otw-storefront.png";
const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--no-sandbox"] });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  let response;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      response = await page.goto(site, { waitUntil: "domcontentloaded", timeout: 60000 });
      if (response?.ok()) break;
    } catch (error) {
      if (attempt === 2) throw error;
    }
    await sleep(3000);
  }
  if (!response?.ok()) throw new Error("Live storefront was not available: " + response?.status());
  await page.locator("body").waitFor({ state: "visible", timeout: 20000 });
  const text = await page.locator("body").innerText();
  if (text.trim().length < 140 || !/OTW|WHEY|สินค้า|SHOP/i.test(text)) {
    throw new Error("Page did not resemble the OTW storefront; refusing to capture an error/placeholder page");
  }
  await page.evaluate(() => document.fonts.ready);
  await sleep(2000);
  await mkdir("public/assets/work", { recursive: true });
  await page.screenshot({ path, type: "png", animations: "disabled", timeout: 25000 });
  const info = await stat(path);
  if (info.size < 45000) throw new Error("Screenshot appears empty; refusing to publish");
  console.log("Verified real storefront screenshot:", path, "bytes:", info.size);

  // Capture the actual public catalog route as a second engineering proof.
  // A missing or unavailable route is never replaced by a synthetic mock.
  const catalogUrl = new URL("Shop", site).href;
  try {
    const catalogResponse = await page.goto(catalogUrl, { waitUntil: "domcontentloaded", timeout: 45000 });
    const catalogText = await page.locator("body").innerText();
    if (!catalogResponse?.ok() || catalogText.trim().length < 140 ||
      !/สินค้า|shop|product|OTW/i.test(catalogText)) {
      throw new Error("Public catalog did not return meaningful content");
    }
    await page.evaluate(() => document.fonts.ready);
    await sleep(1800);
    const catalogPath = "public/assets/work/otw-catalog.png";
    await page.screenshot({ path: catalogPath, type: "png", animations: "disabled", timeout: 25000 });
    const catalogInfo = await stat(catalogPath);
    if (catalogInfo.size < 45000) throw new Error("Catalog screenshot too small");
    console.log("Verified actual shop catalog screenshot:", catalogPath, "bytes:", catalogInfo.size);
  } catch (error) {
    console.warn("Catalog screenshot omitted because it could not be verified:", error.message);
  }
  await page.close();
} finally {
  await browser.close();
}
