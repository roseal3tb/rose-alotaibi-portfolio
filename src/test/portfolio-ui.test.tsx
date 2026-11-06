import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Certifications, Nav, Projects } from "@/components/portfolio/sections";
import { certifications } from "@/data/portfolio";

beforeAll(() => {
  Object.defineProperty(Element.prototype, "scrollTo", {
    configurable: true,
    value: vi.fn(),
  });
  Object.defineProperty(Element.prototype, "scrollBy", {
    configurable: true,
    value: vi.fn(),
  });
});

describe("Portfolio interactions", () => {
  it("renders the RA logo with links to important sections", () => {
    render(<Nav />);
    expect(screen.getByRole("img", { name: /RA — Rose Alotaibi/i })).toHaveAttribute("src", "/ra-monogram.svg");
    expect(screen.getByRole("link", { name: "Highlights" })).toHaveAttribute("href", "#highlights");
    expect(screen.getByRole("link", { name: "Community" })).toHaveAttribute("href", "#volunteering");
  });

  it("shows all eight portfolio cards in a keyboard-accessible carousel", () => {
    render(<Projects />);
    expect(screen.getByRole("region", { name: "Projects carousel" })).toHaveAttribute("tabIndex", "0");
    expect(screen.getAllByRole("article")).toHaveLength(8);
    expect(screen.getByRole("button", { name: "Next project" })).toBeInTheDocument();
  });

  it("filters certificate cards and updates the selected category", () => {
    render(<Certifications />);
    expect(screen.getByRole("button", { name: `All · ${certifications.length}` })).toHaveAttribute("aria-pressed", "true");
    const category = screen.getByRole("button", { name: "Cybersecurity · 2" });
    fireEvent.click(category);
    expect(category).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "Windows Fundamentals Workshop" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Azure Cloud Academy" })).not.toBeInTheDocument();
  });
});
