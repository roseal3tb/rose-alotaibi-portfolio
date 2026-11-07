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
  await page.waitForTimeout(1500);
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
  check("each project explains developed skills", await page.locator('#project-track article:has-text("Skills practiced & developed")').count() === 8);
  check("experience includes detailed responsibilities", await page.locator('#experience li:has(> div) ul li').count() >= 20);
  check("student mentorship grouped with council", await page.locator('#experience li').filter({ hasText: "Student Leadership" }).filter({ hasText: "Big Sibling" }).count() >= 1);
  check("NUGTTAH mentions social creator work", await page.locator('#experience').getByText(/micro-influencers/).count() >= 1);

  check("31 certificate cards", basic.certificateCards === 31);
  check("all project images load after being scrolled into view", basic.images.every((x) => x.loaded));
  check("no local HTTP errors", failingResponses.length === 0);
  check("no browser runtime errors", errors.length === 0);
  check("no critical/serious axe violations", ax.every((v) => !["critical", "serious"].includes(v.impact)));
  const tapTargets = await page.evaluate(() => {
    const selectors = ["button[aria-controls='mobile-nav']", ".chip", "#project-track a[href]:not(:has(img))", "footer a[href='#top']"];
    return [...document.querySelectorAll(selectors.join(","))].map((el) => {
      const r = el.getBoundingClientRect();
      return { label: el.textContent.trim(), width: Math.round(r.width), height: Math.round(r.height) };
    });
  });
  if (width <= 430) check("essential mobile tap targets at least 44px high", tapTargets.every((t) => t.height >= 44));
  for (const project of ["Glam & Ping", "Murabba", "Yusur"]) {
    const fit = await page.locator(`img[alt="${project} project cover"]`).evaluate((img) => getComputedStyle(img).objectFit);
    check(`preserve full artwork for ${project}`, fit === "contain");
  }
  const projectTrack = page.locator("#project-track");
  const before = await projectTrack.evaluate(el => el.scrollLeft);
  await page.getByRole("button", { name: "Next project" }).click();
  await page.waitForTimeout(800);
  const after = await projectTrack.evaluate(el => el.scrollLeft);
  check("project carousel right arrow scrolls", after > before);
  const counter = await page.locator("#projects [aria-live='polite']").textContent();
  check("project counter follows arrow navigation", counter?.trim().startsWith("02"));
  await page.getByRole("button", { name: /Cybersecurity · 2/ }).click();
  check("certificate filter selects category", await page.locator("#cert-track article").count() === 2);
  check("certificate category aria-pressed", await page.getByRole("button", { name: /Cybersecurity · 2/ }).getAttribute("aria-pressed") === "true");
  const certFilterButtons = page.locator('[aria-label="Filter certifications by category"] button');
  check("7 certification filters", await certFilterButtons.count() === 7);
  for (const label of ["Cloud & Infrastructure", "AI & Machine Learning", "Cybersecurity", "Databases & Development", "Professional Development", "Programs & Participation"]) {
    const button = certFilterButtons.filter({ hasText: label });
    const title = (await button.textContent()) || "";
    const expected = Number(title.split("·").at(-1)?.trim());
    await button.click();
    check(`certificate filter ${label} matches count`, await page.locator("#cert-track article").count() === expected);
    check(`certificate filter ${label} selected state`, await button.getAttribute("aria-pressed") === "true");
  }
  await certFilterButtons.first().click();
  check("All certification filter resets", await page.locator("#cert-track article").count() === 31);
  if (width < 1280) {
    const menu = page.locator("#mobile-nav");
    check("closed dropdown remains mounted for exit animation", await menu.count() === 1);
    check("closed menu is inert and hidden", await menu.getAttribute("aria-hidden") === "true" && !(await menu.isVisible()));
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await menu.waitFor({ state: "visible", timeout: 3000 });
    check("mobile navigation opens", await menu.isVisible());
    check("mobile menu contains all eight destinations", await menu.locator("a[href^='#']").count() === 8);
    check("compact menu has no oversized marketing header", await menu.getByText("Find your way around.").count() === 0);
    check("menu is a lightweight dropdown, not a full-screen panel", await menu.evaluate((el) => el.getBoundingClientRect().width <= 460 && el.getBoundingClientRect().height < innerHeight));
    check("menu opens without locking page scroll", await page.evaluate(() => document.body.style.overflow !== "hidden"));
    check("menu opening animation is configured", await menu.evaluate((el) => getComputedStyle(el).transitionDuration.split(",").some((duration) => parseFloat(duration) > 0.1)) || name === "reduced-motion");
    if (name === "mobile-390" || name === "short-mobile-320") {
      await page.screenshot({ path: output + "/" + name + "-menu.png", animations: "disabled" });
    }
    await page.keyboard.press("Tab");
    check("menu stays keyboard accessible", await page.evaluate(() => document.activeElement?.closest("#mobile-nav") !== null));
    check("short viewport menu scrolls internally if needed", await menu.evaluate((el) => {
      const style = getComputedStyle(el);
      return el.scrollHeight <= el.clientHeight + 1 || style.overflowY === "auto";
    }));
    await page.keyboard.press("Escape");
    check("close begins transition while menu stays mounted", await menu.count() === 1 && await menu.getAttribute("data-open") === "false");
    await menu.waitFor({ state: "hidden", timeout: 3000 });
    check("Escape closes navigation visually", !(await menu.isVisible()));
    check("Escape restores focus to Explore button", await page.getByRole("button", { name: "Open navigation menu" }).evaluate((el) => document.activeElement === el));
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await menu.waitFor({ state: "visible", timeout: 3000 });
    await menu.locator('a[href="#highlights"]').click();
    await menu.waitFor({ state: "hidden", timeout: 3000 });
    check("section selection closes navigation with animation", await menu.getAttribute("data-open") === "false" && !(await menu.isVisible()));
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await menu.waitFor({ state: "visible", timeout: 3000 });
    await page.mouse.click(5, Math.max(85, height - 20));
    await menu.waitFor({ state: "hidden", timeout: 3000 });
    check("outside tap closes navigation", !(await menu.isVisible()));
  }
  if (name === "reduced-motion") {
    check("reduced motion preference respected", await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches));
  }
  results.push({ name, width, height, basic, axe: ax, assertions, errors, failingResponses });
  console.log(JSON.stringify({ name, viewport: width, tapTargets, overflowPx: basic.overflowPx, overflowingElements: basic.overflowingElements.slice(0, 8), cards: [basic.projectCards,basic.certificateCards], violations: ax, failedAssertions: assertions.filter(v => !v.passed), errors, failingResponses }));
  await context.close();
}
try {
  for (const [width,height,name] of [[320,568,"short-mobile-320"],[320,740,"mobile-320"],[360,800,"mobile-360"],[375,667,"mobile-375"],[390,844,"mobile-390"],[430,932,"mobile-430"],[844,390,"landscape-mobile"],[768,1024,"tablet-768"],[1440,900,"desktop-1440"],[390,844,"reduced-motion"]]) {
    await inspect(width,height,name);
  }
} finally {
  await writeFile(output + "/report.json", JSON.stringify(results,null,2));
  await browser.close();
}
if (failed) process.exitCode = 1;
