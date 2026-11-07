import { useEffect, useMemo, useRef, useState } from "react";
import { Arrow, Arrows, Magnetic, Section, useCarousel, useParallax, useReveal } from "./primitives";
import { certCategories, certifications, contact, experience, highlights, projects, skills, volunteering, type CertCategory } from "@/data/portfolio";

const nav = [
  ["projects", "Projects"],
  ["about", "About"],
  ["experience", "Experience"],
  ["skills", "Skills"],
  ["highlights", "Highlights"],
  ["certifications", "Certifications"],
  ["volunteering", "Community"],
  ["contact", "Contact"],
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("main section[id]").forEach((section) => observer?.observe(section));
    return () => { window.removeEventListener("scroll", onScroll); observer?.disconnect(); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => menuRef.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target) && !menuButtonRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    const onHashChange = () => setOpen(false);
    const onResize = () => { if (innerWidth >= 1280) setOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={"fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500 " + (open ? "border-b border-lilac/50 bg-pearl py-3" : scrolled ? "glass border-b py-3" : "py-4 md:py-6")}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 pill pill-solid">Skip to content</a>
      <nav aria-label="Primary" className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        <a href="#top" aria-label="Rose Alotaibi — home" className="inline-flex shrink-0 items-center rounded-full" title="Rose Alotaibi">
          <img src="/ra-monogram.svg" alt="RA — Rose Alotaibi" className="h-11 w-[68px] object-contain transition-transform duration-300 hover:scale-105 md:h-12 md:w-[76px]" width={76} height={52} />
        </a>
        <ul className="hidden items-center gap-1 xl:flex">
          {nav.map(([id, label]) => (
            <li key={id}>
              <a href={"#" + id} aria-current={active === id ? "location" : undefined}
                className={"rounded-full px-4 py-2 text-sm transition-colors duration-300 hover:text-mauve " + (active === id ? "bg-lavender text-mauve" : "")}>{label}</a>
            </li>
          ))}
        </ul>
        <a href={"mailto:" + contact.email} className="pill pill-solid hidden !py-2.5 xl:inline-flex">Say hello</a>
        <button ref={menuButtonRef} type="button"
          className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-lilac bg-pearl/90 px-4 py-2 text-sm shadow-sm transition-[background-color,border-color] duration-300 hover:border-mauve hover:bg-lavender xl:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((value) => !value)}>
          <span className="font-medium tracking-[0.08em]">{open ? "Close" : "Explore"}</span>
          <span aria-hidden="true" className="flex h-5 w-5 flex-col items-center justify-center gap-1">
            <span className={"block h-[1.5px] w-[18px] rounded bg-plum transition-transform duration-300 " + (open ? "translate-y-[2.75px] rotate-45" : "")} />
            <span className={"block h-[1.5px] w-[18px] rounded bg-plum transition-transform duration-300 " + (open ? "-translate-y-[2.75px] -rotate-45" : "")} />
          </span>
        </button>
      </nav>
      <nav ref={menuRef} id="mobile-nav" aria-label="Mobile" aria-hidden={!open} inert={!open} data-open={open}
        className="compact-nav-panel absolute inset-x-4 top-full z-40 mx-auto mt-2 max-h-[calc(100dvh-6rem)] max-w-[28rem] overflow-y-auto overscroll-contain rounded-[1.6rem] border border-lilac/70 bg-pearl shadow-[0_20px_55px_-25px_rgba(61,41,78,0.3)] xl:hidden">
        <ul className="grid gap-1 p-3">
          {nav.map(([id, label]) => (
            <li key={id}>
              <a href={"#" + id} onClick={() => setOpen(false)} aria-current={active === id ? "location" : undefined}
                className={"flex min-h-11 items-center justify-between rounded-2xl px-4 py-2.5 text-[0.95rem] font-medium tracking-[0.02em] transition-[background-color,color] duration-200 hover:bg-lavender focus-visible:bg-lavender " + (active === id ? "bg-lavender/75 text-mauve" : "text-plum")}>
                <span>{label}</span>
                {active === id && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-mauve" />}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function Letters({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span aria-hidden className="inline-block whitespace-nowrap">
      {text.split("").map((c, i) => (
        <span key={i} className="letter" style={{ animationDelay: `${delay + i * 55}ms` }}>{c === " " ? "\u00A0" : c}</span>
      ))}
    </span>
  );
}

export function Hero() {
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);
  useParallax(a, 0.25);
  useParallax(b, -0.12);
  return (
    <section id="top" className="relative flex min-h-[82svh] items-end overflow-hidden px-6 pb-14 pt-28 sm:min-h-[85svh] md:min-h-[100svh] md:px-10 md:pb-24 md:pt-32">
      <div ref={a} aria-hidden className="absolute -right-24 top-10"><div className="orb animate-drift h-[28rem] w-[28rem] bg-lilac/60" /></div>
      <div ref={b} aria-hidden className="absolute -left-32 bottom-0"><div className="orb animate-drift h-[24rem] w-[24rem] bg-lavender" style={{ animationDelay: "-6s" }} /></div>
      <div className="relative mx-auto w-full max-w-7xl">
        <p className="eyebrow letter mb-8" style={{ animationDelay: "100ms" }}>Portfolio · Riyadh · 2026</p>
        <h1 className="font-display font-light leading-[0.82] tracking-[-0.03em] text-[clamp(4.2rem,15vw,15rem)]">
          <span className="sr-only">Rose Alotaibi</span>
          <span className="block"><Letters text="Rose" delay={200} /></span>
          <span className="block pl-[8vw] italic text-mauve"><Letters text="Alotaibi" delay={450} /></span>
        </h1>
        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <p className="letter font-display text-2xl italic md:text-3xl" style={{ animationDelay: "1100ms" }}>Where technology meets creativity.</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Information Technology · Networks &amp; IoT Engineering</p>
          </div>
          <div className="letter flex flex-wrap gap-3" style={{ animationDelay: "1300ms" }}>
            <Magnetic><a href="#projects" className="pill pill-solid">View projects <Arrow /></a></Magnetic>
            <Magnetic><a href="#contact" className="pill pill-ghost">Get in touch</a></Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  const c = useCarousel();
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const el = c.ref.current;
    if (!el) return;
    const on = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      if (!cards.length) return;
      const firstOffset = cards[0].offsetLeft;
      const index = cards.reduce((best, card, i) =>
        Math.abs(card.offsetLeft - firstOffset - el.scrollLeft) <
        Math.abs(cards[best].offsetLeft - firstOffset - el.scrollLeft) ? i : best, 0);
      setIdx(index);
    };
    el.addEventListener("scroll", on, { passive: true });
    return () => el.removeEventListener("scroll", on);
  }, [c.ref]);
  return (
    <Section id="projects" eyebrow="01 — Selected Work" title={<>Eight <em className="text-mauve">projects</em></>}
      intro="Live platforms, coursework and concepts across web, data, networking and design. Swipe, scroll or use the arrows.">
      <div className="reveal mb-8 flex items-center justify-between">
        <p className="font-display text-xl tabular-nums" aria-live="polite">
          {String(Math.min(idx + 1, projects.length)).padStart(2, "0")} <span className="text-muted-foreground">/ {String(projects.length).padStart(2, "0")}</span>
        </p>
        <Arrows label="project" controls="project-track" {...c} />
      </div>
      <div id="project-track" ref={c.ref} role="region" aria-label="Projects carousel" tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); c.next(); } if (e.key === "ArrowLeft") { e.preventDefault(); c.prev(); } }}
        className="no-scrollbar reveal -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-6 px-6 pb-4 md:-mx-10 md:scroll-px-10 md:px-10">
        {projects.map((p, i) => (
          <article key={p.title} className="group w-[86%] shrink-0 snap-start md:w-[calc(50%-12px)]">
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="block rounded-[2rem] focus-visible:rounded-[2rem]"
              aria-label={`${p.title} — ${p.kind === "live" ? "visit live site" : "explore related repository"} (opens in new tab)`}>
              <div className={`relative aspect-[16/10] overflow-hidden rounded-[2rem] shadow-[var(--shadow-soft)] ${p.imageFit === "contain" ? "bg-lavender" : ""}`}>
                <img src={p.image} alt={`${p.title} ${p.kind === "live" ? "website screenshot" : "project cover"}`} width={1280} height={p.kind === "live" ? 720 : 800}
                  loading="lazy" decoding="async" className={`h-full w-full object-center ${p.imageFit === "contain" ? "object-contain" : "object-cover"}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-plum/0 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <span className="glass absolute left-5 top-5 rounded-full px-3 py-1.5 text-xs tracking-wider">{String(i + 1).padStart(2, "0")} · {p.category}</span>
                <span className="absolute bottom-3 right-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-pearl px-4 py-2 text-sm text-plum shadow-sm transition-all duration-300 sm:bottom-5 sm:right-5 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
                  <span className="md:hidden">Open</span><span className="hidden md:inline">{p.kind === "live" ? "Visit live site" : "Explore related repository"}</span> <Arrow dir="up-right" className="inline" />
                </span>
              </div>
            </a>
            <div className="mt-6 px-1">
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <h3 className="font-display text-3xl md:text-4xl">{p.title}</h3>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center text-sm text-mauve underline-offset-4 hover:underline">
                  {p.kind === "live" ? "Visit live site" : "Explore related repository"}<span className="sr-only"> for {p.title} (opens in new tab)</span>
                </a>
              </div>
              <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">{p.description}</p>
              <div className="mt-5">
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-mauve">Tools &amp; technologies</p>
                <ul className="mt-2 flex flex-wrap gap-2" aria-label={"Tools used for " + p.title}>
                  {p.tags.map((t) => <li key={t} className="rounded-full bg-lavender px-3 py-1.5 text-xs">{t}</li>)}
                </ul>
              </div>
              <div className="mt-5 border-t border-lilac/60 pt-4">
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-mauve">Skills practiced &amp; developed</p>
                <ul className="mt-3 grid gap-x-4 gap-y-2 text-sm leading-snug text-muted-foreground sm:grid-cols-2" aria-label={"Skills explored through " + p.title}>
                  {p.skillsGained.map((skill) => (
                    <li key={skill} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-mauve" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function About() {
  return (
    <Section id="about" eyebrow="02 — About & Education" title={<>A curious <em className="text-mauve">builder</em></>}>
      <div className="grid gap-12 md:grid-cols-12">
        <p className="reveal font-display text-[clamp(1.45rem,6vw,1.75rem)] font-light leading-[1.4] md:col-span-7 md:text-4xl">
          I'm Rose Alotaibi, an Information Technology student at King Saud University specializing in Networks &amp; IoT Engineering. I create digital experiences through hands-on projects, design, and teamwork.
        </p>
        <div className="reveal md:col-span-4 md:col-start-9" style={{ transitionDelay: "150ms" }}>
          <div className="rounded-[2rem] border bg-card p-8">
            <p className="eyebrow mb-6">Education</p>
            <h3 className="font-display text-3xl">King Saud University</h3>
            <p className="mt-2">Information Technology</p>
            <p className="text-muted-foreground">Networks &amp; IoT Engineering</p>
            <div className="hairline my-6" />
            <p className="text-sm tracking-wider text-mauve">c. 2023 – 2027</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="03 — Experience & Leadership"
      title={<>What I've <em className="text-mauve">contributed</em></>}
      intro="The responsibilities behind each role — from leading teams and coordinating initiatives to supporting fellow students and delivering campaigns."
    >
      <ol className="grid gap-7 md:gap-9">
        {experience.map((entry, i) => (
          <li key={entry.org} className="reveal overflow-hidden rounded-[2rem] border bg-card p-6 sm:p-8 md:p-10" style={{ transitionDelay: (Math.min(i, 3) * 65) + "ms" }}>
            <div className="grid gap-5 border-b border-lilac/70 pb-7 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-7">
                <p className="eyebrow mb-3">{"0" + (i + 1)} · {entry.label}</p>
                <h3 className="font-display text-[clamp(1.9rem,7vw,2.8rem)] leading-tight">{entry.org}</h3>
              </div>
              <p className="max-w-lg text-[0.96rem] leading-relaxed text-muted-foreground md:col-span-5 md:self-end">
                {entry.introduction}
              </p>
            </div>
            <ol className="divide-y divide-lilac/60">
              {entry.roles.map((role, roleIndex) => (
                <li key={role.title} className="grid gap-4 py-6 first:pt-7 last:pb-0 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-5">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lavender text-xs text-mauve">
                        {String(roleIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs font-medium tracking-wide text-mauve">{role.dates}</span>
                    </div>
                    <h4 className="font-display text-[1.65rem] leading-[1.15] sm:text-3xl">{role.title}</h4>
                    {role.affiliation && <p className="mt-2 text-xs text-muted-foreground">{role.affiliation}</p>}
                  </div>
                  <div className="md:col-span-7">
                    <p className="font-medium leading-relaxed">{role.summary}</p>
                    <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-muted-foreground">
                      {role.responsibilities.map((task) => (
                        <li key={task} className="flex items-start gap-3">
                          <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-mauve" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" eyebrow="04 — Skills & Technologies" title={<>The <em className="text-mauve">toolkit</em></>}>
      <div className="grid gap-px overflow-hidden rounded-[2rem] border bg-border md:grid-cols-2">
        {skills.map((g, i) => (
          <div key={g.group} className="reveal bg-pearl p-8 md:p-10" style={{ transitionDelay: `${i * 80}ms` }}>
            <p className="eyebrow mb-6">{g.group}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {g.items.map((s) => (
                <li key={s} className="font-display text-[1.75rem] font-light transition-colors duration-300 hover:text-mauve sm:text-3xl md:text-4xl">{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Highlights() {
  return (
    <Section id="highlights" eyebrow="05 — Hackathons & Highlights" title={<>Moments of <em className="text-mauve">note</em></>}>
      <div className="grid gap-6 md:grid-cols-2">
        {highlights.map((h, i) => (
          <article key={h.title} className="reveal rounded-[2rem] border bg-card p-8 md:p-10" style={{ transitionDelay: `${i * 100}ms` }}>
            <span className="rounded-full bg-lavender px-3 py-1 text-xs tracking-wider text-mauve">{h.tag}</span>
            <h3 className="mt-6 font-display text-3xl md:text-4xl">{h.title}</h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">{h.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Certifications() {
  const [filter, setFilter] = useState<CertCategory | "All">("All");
  const list = useMemo(() => (filter === "All" ? certifications : certifications.filter((c) => c.category === filter)), [filter]);
  const c = useCarousel([filter]);
  useEffect(() => { c.ref.current?.scrollTo({ left: 0 }); }, [filter, c.ref]);
  const counts = (cat: CertCategory) => certifications.filter((x) => x.category === cat).length;
  return (
    <Section id="certifications" eyebrow="06 — Certifications & Courses" title={<>Always <em className="text-mauve">learning</em></>}
      intro="Courses, workshops, programs and participation highlights. Filter by area of focus.">
      <div className="reveal mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground md:hidden">Swipe to explore categories <span aria-hidden="true">→</span></p>
        <div role="group" aria-label="Filter certifications by category" tabIndex={0} className="no-scrollbar -mx-6 flex snap-x flex-nowrap gap-2 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
          <button type="button" className="chip inline-flex min-h-11 shrink-0 snap-start items-center whitespace-nowrap !text-sm" aria-pressed={filter === "All"} onClick={() => setFilter("All")}>All · {certifications.length}</button>
          {certCategories.filter((cat) => counts(cat) > 0).map((cat) => (
            <button key={cat} type="button" className="chip inline-flex min-h-11 shrink-0 snap-start items-center whitespace-nowrap !text-sm" aria-pressed={filter === cat} onClick={() => setFilter(cat)}>{cat} · {counts(cat)}</button>
          ))}
        </div>
        <Arrows label="certificate" controls="cert-track" {...c} />
      </div>
      <p className="mb-5 text-sm text-muted-foreground" aria-live="polite">Showing {list.length} {list.length === 1 ? "entry" : "entries"}{filter !== "All" ? ` in ${filter}` : ""}.</p>
      <div className="mb-6 hidden flex-wrap gap-6 text-sm tracking-wider text-muted-foreground md:flex">
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-orchid" />Learning course</span>
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full border border-mauve" />Programs, workshops &amp; participation</span>
        {certifications.some((entry) => entry.type === "Certification") && <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-plum" />Professional certification</span>}
      </div>
      <div id="cert-track" ref={c.ref} role="region" aria-label="Certifications carousel" tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); c.next(); } if (e.key === "ArrowLeft") { e.preventDefault(); c.prev(); } }}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pb-4 md:-mx-10 md:scroll-px-10 md:px-10">
        {list.length === 0 && <p className="py-16 text-muted-foreground">Entries for this category are coming soon.</p>}
        {list.map((cert) => (
          <article key={cert.title + cert.issuer} className="flex min-h-[18rem] w-[85%] shrink-0 snap-start flex-col justify-between rounded-[2rem] border bg-card p-6 sm:w-[calc(50%-10px)] sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-orchid hover:shadow-[var(--shadow-soft)] lg:w-[calc(33.333%-14px)]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs tracking-wider text-mauve">
                <span className={`h-2 w-2 rounded-full ${cert.type === "Course" ? "bg-orchid" : cert.type === "Certification" ? "bg-plum" : "border border-mauve"}`} />
                {cert.type === "Certification" ? "Professional Certification" : cert.type === "Program" ? "Program" : cert.type === "Workshop" ? "Workshop" : cert.type === "Participation" ? "Participation" : "Learning Course"}
              </span>
              {cert.date && <span className="text-xs text-muted-foreground">{cert.date}</span>}
            </div>
            <h3 className="my-6 font-display text-3xl leading-tight">{cert.title}</h3>
            <div>
              <div className="hairline mb-4" />
              <p className="text-sm">{cert.issuer}</p>
              <p className="text-xs text-muted-foreground">{cert.category}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Volunteering() {
  return (
    <Section id="volunteering" eyebrow="07 — Volunteering & Community" title={<>Giving <em className="text-mauve">back</em></>}>
      <div className="grid gap-6 md:grid-cols-3">
        {volunteering.map((v, i) => (
          <article key={v.title} className="reveal rounded-[2rem] bg-lavender p-8 transition-transform duration-700 hover:-translate-y-1" style={{ transitionDelay: `${i * 100}ms` }}>
            <p className="text-sm text-mauve">{v.dates}</p>
            <h3 className="mt-8 font-display text-3xl leading-tight">{v.title}</h3>
            <p className="mt-3 text-sm font-medium text-mauve">{v.org}</p>
            <p className="mt-5 border-t border-plum/10 pt-4 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Contact() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="contact" ref={ref} aria-labelledby="contact-title" className="relative overflow-hidden px-6 pb-12 pt-24 md:px-10 md:pt-36">
      <div aria-hidden className="orb animate-drift left-1/2 top-10 h-[30rem] w-[30rem] -translate-x-1/2 bg-lilac/50" />
      <div className="relative mx-auto max-w-7xl text-center">
        <p className="eyebrow reveal mb-6">08 — Contact</p>
        <h2 id="contact-title" className="reveal font-display text-6xl font-light leading-[0.9] md:text-9xl">Let's create <em className="text-mauve">together</em></h2>
        <div className="reveal mt-12">
          <Magnetic strength={0.15}>
            <a href={`mailto:${contact.email}`} className="font-display text-2xl italic underline decoration-lilac decoration-1 underline-offset-8 transition-colors hover:text-mauve md:text-4xl">{contact.email}</a>
          </Magnetic>
        </div>
        <div className="reveal mt-12 flex flex-wrap justify-center gap-3">
          <Magnetic><a href={`mailto:${contact.email}`} className="pill pill-solid">Email me <Arrow /></a></Magnetic>
          <Magnetic><a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="pill pill-ghost">LinkedIn <Arrow dir="up-right" /><span className="sr-only"> (opens in new tab)</span></a></Magnetic>
          <Magnetic><a href={contact.github} target="_blank" rel="noopener noreferrer" className="pill pill-ghost">GitHub <Arrow dir="up-right" /><span className="sr-only"> (opens in new tab)</span></a></Magnetic>
        </div>
        <div className="hairline mt-28" />
        <footer className="flex flex-col items-center justify-between gap-4 pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© 2026 Rose Alotaibi</p>
          <p className="font-display italic">Where technology meets creativity.</p>
          <a href="#top" className="inline-flex min-h-11 items-center hover:text-mauve">Back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}
