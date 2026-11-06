import { describe, expect, it } from "vitest";
import { certCategories, certifications, contact, highlights, projects } from "@/data/portfolio";

describe("Portfolio content integrity", () => {
  it("keeps eight uniquely named projects with usable external destinations", () => {
    expect(projects).toHaveLength(8);
    expect(new Set(projects.map((project) => project.title)).size).toBe(projects.length);
    for (const project of projects) {
      expect(project.title.length).toBeGreaterThan(2);
      expect(project.description.length).toBeGreaterThan(20);
      expect(project.tags.length).toBeGreaterThan(0);
      expect(new URL(project.url).protocol).toBe("https:");
    }
  });

  it("keeps the hackathon out of featured project and volunteering carousels", () => {
    expect(highlights.some((item) => item.title.includes("ROSHN"))).toBe(true);
    expect(projects.some((item) => item.title.includes("ROSHN"))).toBe(false);
  });

  it("lists the known courses and programs and uses every displayed category", () => {
    expect(certifications.length).toBeGreaterThanOrEqual(30);
    const unique = new Set(certifications.map((item) => `${item.title}|${item.issuer}`));
    expect(unique.size).toBe(certifications.length);
    for (const category of certCategories) {
      expect(certifications.some((item) => item.category === category)).toBe(true);
    }
    for (const cert of certifications) {
      expect(certCategories).toContain(cert.category);
      expect(["Course", "Certification", "Program", "Workshop", "Participation"]).toContain(cert.type);
      expect(cert.issuer.trim()).not.toBe("");
    }
  });

  it("keeps contact details usable without public phone numbers", () => {
    expect(contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(new URL(contact.linkedin).protocol).toBe("https:");
    expect(new URL(contact.github).protocol).toBe("https:");
    expect(Object.keys(contact)).not.toContain("phone");
  });
});
