import { chromium } from "playwright";
import axe from "axe-core";
import { mkdir, writeFile } from "node:fs/promises";

const URL = "http://127.0.0.1:3000";
const output = "qa-results";
await mkdir(output, { recursive: true });
const results = [];
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
let failed = false;

async function inspect(width, height, name) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: name === "reduced-motion" ? "reduce" : "no-preference",
  });
  const page = await context.newPage();
  const errors = [];
  const failingResponses = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("response", (r) => {
    if (r.status() >= 400 && new URL(r.url()).origin === URL) failingResponses.push({ url: r.url(), status: r.status() });
  });
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.getByRole("heading", { level: 1 }).waitFor({ timeout: 25000 });
  await page.waitForTimeout(600);
  // Trigger lazy-loaded media and scroll-reveal effects before assessing or capturing a full-page screenshot.
  for (const image of await page.locator("#project-track img").all()) {
    await image.scrollIntoViewIfNeeded();
    await page.waitForTimeout(90);
  }
  for (const section of await page.locator("main section[id]").all()) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
  }
  await page.evaluate(() => {
    document.querySelector("#project-track").scrollLeft = 0;
    document.querySelector("#cert-track").scrollLeft = 0;
    scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
  const basic = await page.evaluate(() => {
    const images = [...document.images];
    const root = document.documentElement;
    const h1 = document.querySelector("h1");
    const sections = [...document.querySelectorAll("main section[id]")];
    return {
      viewport: innerWidth,
      documentWidth: root.scrollWidth,
      overflowPx: Math.max(0, root.scrollWidth - innerWidth),
      title: document.title,
      h1: h1?.textContent?.trim()?.replace(/\s+/g, " "),
      sections: sections.map((x) => x.id),
      images: images.map((img) => ({ alt: img.alt, src: img.currentSrc, loaded: img.complete && img.naturalWidth > 0 })),
      navLinks: [...document.querySelectorAll('nav a[href^="#"]')].map(x=>x.getAttribute("href")),
      overflowingElements: [...document.querySelectorAll("body *")].map((el) => {
        const r = el.getBoundingClientRect();
        return { tag: el.tagName.toLowerCase(), id: el.id, cls: String(el.className).slice(0, 90), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), scrollWidth: el.scrollWidth, clientWidth: el.clientWidth };
      }).filter((el) => el.right > innerWidth + 15 && el.left >= -40).sort((a, b) => b.right - a.right).slice(0, 20),
      projectCards: document.querySelectorAll('#project-track article').length,
      certificateCards: document.querySelectorAll('#cert-track article').length,
    };
  });
  await page.screenshot({ path: output + "/" + name + ".png", fullPage: true, animations: "disabled" });
  await page.addScriptTag({ content: axe.source });
  const ax = await page.evaluate(async () => {
    const res = await window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
    });
    return res.violations.map(v => ({
      id: v.id, impact: v.impact, description: v.description, count: v.nodes.length,
      sample: v.nodes.slice(0, 2).map(n => n.target),
    }));
  });
  const assertions = [];
  function check(label, condition) { assertions.push({ label, passed: Boolean(condition) }); if (!condition) failed = true; }
  check("no horizontal page overflow", basic.overflowPx <= 2);
  check("8 project cards", basic.projectCards === 8);
  check("31 certificate cards", basic.certificateCards === 31);
  check("all project images load after being scrolled into view", basic.images.every((x) => x.loaded));
  check("no local HTTP errors", failingResponses.length === 0);
  check("no browser runtime errors", errors.length === 0);
  check("no critical/serious axe violations", ax.every((v) => !["critical", "serious"].includes(v.impact)));
  const projectTrack = page.locator("#project-track");
  const before = await projectTrack.evaluate(el => el.scrollLeft);
  await page.getByRole("button", { name: "Next project" }).click();
  await page.waitForTimeout(800);
  const after = await projectTrack.evaluate(el => el.scrollLeft);
  check("project carousel right arrow scrolls", after > before);
  await page.getByRole("button", { name: /Cybersecurity · 2/ }).click();
  check("certificate filter selects category", await page.locator("#cert-track article").count() === 2);
  check("certificate category aria-pressed", await page.getByRole("button", { name: /Cybersecurity · 2/ }).getAttribute("aria-pressed") === "true");
  if (width < 1280) {
    await page.getByRole("button", { name: "Menu" }).click();
    check("mobile navigation opens", await page.locator("#mobile-nav").isVisible());
    await page.locator('#mobile-nav a[href="#highlights"]').click();
    check("mobile navigation closes on selection", (await page.locator("#mobile-nav").count()) === 0);
  }
  if (name === "reduced-motion") {
    check("reduced motion preference respected", await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches));
  }
  results.push({ name, width, height, basic, axe: ax, assertions, errors, failingResponses });
  console.log(JSON.stringify({ name, viewport: width, overflowPx: basic.overflowPx, overflowingElements: basic.overflowingElements.slice(0, 8), cards: [basic.projectCards,basic.certificateCards], violations: ax, failedAssertions: assertions.filter(v => !v.passed), errors, failingResponses }));
  await context.close();
}
try {
  for (const [width,height,name] of [[320,740,"mobile-320"],[390,844,"mobile-390"],[768,1024,"tablet-768"],[1440,900,"desktop-1440"],[390,844,"reduced-motion"]]) {
    await inspect(width,height,name);
  }
} finally {
  await writeFile(output + "/report.json", JSON.stringify(results,null,2));
  await browser.close();
}
if (failed) process.exitCode = 1;
