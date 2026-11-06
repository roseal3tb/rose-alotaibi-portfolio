import { useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-in"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    el.querySelectorAll(".reveal").forEach((n) => io.observe(n));
    if (el.classList.contains("reveal")) io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Section({ id, eyebrow, title, children, intro }: { id: string; eyebrow: string; title: ReactNode; intro?: string; children: ReactNode }) {
  const ref = useReveal<HTMLElement>();
  return (
    <section id={id} ref={ref} aria-labelledby={`${id}-title`} className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
      <div className="reveal mb-14 grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h2 id={`${id}-title`} className="font-display text-5xl font-light leading-[0.95] md:text-7xl">{title}</h2>
        </div>
        {intro && <p className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5 md:justify-self-end">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

export function Magnetic({ children, className = "", strength = 0.25 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`;
  };
  const reset = () => ref.current && (ref.current.style.transform = "");
  return (
    <span ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={`inline-block transition-transform duration-500 ease-out ${className}`}>
      {children}
    </span>
  );
}

export function useCarousel(deps: unknown[] = []) {
  const ref = useRef<HTMLDivElement>(null);
  const [canPrev, setPrev] = useState(false);
  const [canNext, setNext] = useState(true);
  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setPrev(el.scrollLeft > 4);
    setNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const item = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = item ? item.offsetWidth + gap : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  return { ref, canPrev, canNext, prev: () => scroll(-1), next: () => scroll(1) };
}

export function Arrows({ label, canPrev, canNext, prev, next, controls }: { label: string; canPrev: boolean; canNext: boolean; prev: () => void; next: () => void; controls: string }) {
  const btn = "grid h-12 w-12 place-items-center rounded-full border border-lilac transition-all duration-500 hover:bg-plum hover:text-pearl disabled:pointer-events-none disabled:opacity-30";
  return (
    <div className="flex gap-3">
      <button type="button" className={btn} onClick={prev} disabled={!canPrev} aria-controls={controls} aria-label={`Previous ${label}`}>
        <Arrow dir="left" />
      </button>
      <button type="button" className={btn} onClick={next} disabled={!canNext} aria-controls={controls} aria-label={`Next ${label}`}>
        <Arrow dir="right" />
      </button>
    </div>
  );
}

export function Arrow({ dir = "right", className = "" }: { dir?: "left" | "right" | "up-right"; className?: string }) {
  const rot = dir === "left" ? "rotate-180" : dir === "up-right" ? "-rotate-45" : "";
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`h-4 w-4 ${rot} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function useParallax(ref: RefObject<HTMLElement | null>, speed = 0.15) {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ref.current && (ref.current.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`));
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, [ref, speed]);
}
