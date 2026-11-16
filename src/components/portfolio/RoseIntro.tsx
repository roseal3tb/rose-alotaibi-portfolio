import { useEffect, useState, type CSSProperties } from "react";
import "./rose-intro.css";

/**
 * A short, decorative welcome animation made from Rose's real RA artwork.
 * Kept outside the page content so the portfolio itself remains unchanged.
 */
const PETALS = [
  { x: "-26vw", y: "-24vh", rotate: "-108deg", delay: "0ms" },
  { x: "-34vw", y: "-7vh", rotate: "-210deg", delay: "85ms" },
  { x: "-12vw", y: "-36vh", rotate: "-42deg", delay: "45ms" },
  { x: "19vw", y: "-29vh", rotate: "155deg", delay: "125ms" },
  { x: "34vw", y: "-11vh", rotate: "245deg", delay: "55ms" },
  { x: "26vw", y: "23vh", rotate: "112deg", delay: "155ms" },
] as const;

export function RoseIntro() {
  // Keep initial server/client markup identical for TanStack Start hydration.
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setVisible(false);
      return;
    }

    const page = document.querySelector("main");
    const header = document.querySelector("header");
    const previousOverflow = document.body.style.overflow;
    // Prevent scroll and keyboard focus from reaching the obscured page.
    document.body.style.overflow = "hidden";
    page?.setAttribute("inert", "");
    header?.setAttribute("inert", "");

    const timer = window.setTimeout(() => setLeaving(true), 3250);
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLeaving(true);
    };
    window.addEventListener("keydown", onEscape);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onEscape);
      document.body.style.overflow = previousOverflow;
      page?.removeAttribute("inert");
      header?.removeAttribute("inert");
    };
  }, [visible]);

  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(() => setVisible(false), 650);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  if (!visible) return null;

  return (
    <div
      className={`rose-intro${leaving ? " rose-intro--leaving" : ""}`}
      aria-label="Rose Alotaibi welcome animation"
      role="region"
    >
      <div className="rose-intro__glow" aria-hidden="true" />
      <div className="rose-intro__art" aria-hidden="true">
        {/* Same canvas dimensions keep the blossom precisely attached to the R. */}
        <img src="/rose-ra-stem.png" className="rose-intro__stem" alt="" width="1800" height="1474" fetchPriority="high" />
        <img src="/rose-ra-bloom.png" className="rose-intro__bloom" alt="" width="1800" height="1474" fetchPriority="high" />
        <div className="rose-intro__petals">
          {PETALS.map((petal, index) => (
            <svg
              key={index}
              viewBox="0 0 48 65"
              className="rose-intro__petal"
              style={{
                "--flight-x": petal.x,
                "--flight-y": petal.y,
                "--flight-rotation": petal.rotate,
                "--flight-delay": petal.delay,
              } as CSSProperties}
              focusable="false"
              aria-hidden="true"
            >
              <path d="M23 3C6 16 1 33 11 48c9 12 22 14 30 10C47 39 40 19 23 3Z" />
            </svg>
          ))}
        </div>
      </div>
      <button type="button" className="rose-intro__skip" onClick={() => setLeaving(true)}>
        Skip intro <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
