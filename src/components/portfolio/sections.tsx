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
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));
    return () => { window.removeEventListener("scroll", on); io.disconnect(); };
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${scrolled ? "glass border-b py-3" : "py-6"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 pill pill-solid">Skip to content</a>
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        <a href="#top" aria-label="Rose Alotaibi — home" className="inline-flex shrink-0 items-center rounded-full" title="Rose Alotaibi"><img src="/ra-monogram.svg" alt="RA — Rose Alotaibi" className="h-11 w-[68px] object-contain transition-transform duration-300 hover:scale-105 md:h-12 md:w-[76px]" width={76} height={52} /></a>
        <ul className="hidden items-center gap-1 xl:flex">
          {nav.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? "true" : undefined}
                className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 hover:text-mauve ${active === id ? "bg-lavender text-mauve" : ""}`}>{label}</a>
            </li>
          ))}
        </ul>
        <a href={`mailto:${contact.email}`} className="pill pill-solid hidden !py-2.5 xl:inline-flex">Say hello</a>
        <button type="button" className="pill pill-ghost !px-4 !py-2 xl:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      {open && (
        <ul id="mobile-nav" className="glass mx-4 mt-3 grid gap-1 rounded-3xl border p-3 xl:hidden">
          {nav.map(([id, label]) => (
            <li key={id}><a onClick={() => setOpen(false)} href={`#${id}`} className="block rounded-full px-4 py-3 hover:bg-lavender">{label}</a></li>
          ))}
        </ul>
      )}
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
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden px-6 pb-16 pt-32 md:px-10 md:pb-24">
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
          <p className="letter max-w-md font-display text-2xl italic md:text-3xl" style={{ animationDelay: "1100ms" }}>Where technology meets creativity.</p>
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
      const w = (el.firstElementChild as HTMLElement)?.offsetWidth || 1;
      setIdx(Math.round(el.scrollLeft / w));
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
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-lavender shadow-[var(--shadow-soft)]">
                <img src={p.image} alt={`${p.title} ${p.kind === "live" ? "website screenshot" : "project cover"}`} width={1280} height={p.kind === "live" ? 720 : 800}
                  loading={i < 2 ? "eager" : "lazy"} className="h-full w-full object-cover object-top transition-transform duration-[1.4s] ease-[var(--ease-lux)] group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-plum/0 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <span className="glass absolute left-5 top-5 rounded-full px-3 py-1.5 text-xs tracking-wider">{String(i + 1).padStart(2, "0")} · {p.category}</span>
                <span className="absolute bottom-5 right-5 translate-y-3 rounded-full bg-pearl px-4 py-2 text-sm opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {p.kind === "live" ? "Visit live site" : "Explore related repository"} <Arrow dir="up-right" className="inline" />
                </span>
              </div>
            </a>
            <div className="mt-6 px-1">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-3xl md:text-4xl">{p.title}</h3>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm text-mauve underline-offset-4 hover:underline">
                  {p.kind === "live" ? "Visit live site" : "Explore related repository"}<span className="sr-only"> for {p.title} (opens in new tab)</span>
                </a>
              </div>
              <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">{p.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                {p.tags.map((t) => <li key={t} className="rounded-full bg-lavender px-3 py-1 text-xs">{t}</li>)}
              </ul>
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
        <p className="reveal font-display text-3xl font-light leading-snug md:col-span-7 md:text-4xl">
          I'm Rose Alotaibi, an Information Technology student at King Saud University specializing in Networks &amp; IoT Engineering. I explore the intersection of technology, creativity, and digital experiences through hands-on projects, leadership, and continuous learning.
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
  const ref = useReveal<HTMLOListElement>();
  return (
    <Section id="experience" eyebrow="03 — Experience & Leadership" title={<>Roles &amp; <em className="text-mauve">leadership</em></>}
      intro="Committees, councils and teams — leading media, marketing and technical work across student and youth organizations.">
      <ol ref={ref} className="border-t">
        {experience.map((o, i) => (
          <li key={o.org} className="reveal group grid gap-4 border-b py-10 transition-colors duration-500 hover:bg-lavender/40 md:grid-cols-12 md:px-4" style={{ transitionDelay: `${i * 60}ms` }}>
            <div className="md:col-span-5">
              <span className="text-xs text-mauve">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-3xl transition-transform duration-700 group-hover:translate-x-2 md:text-4xl">{o.org}</h3>
            </div>
            <ul className="grid gap-4 md:col-span-7">
              {o.roles.map((r) => (
                <li key={r.title + r.dates} className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <span className="text-lg">{r.title}</span>
                  <span className="shrink-0 text-sm tracking-wide text-muted-foreground">{r.dates}</span>
                </li>
              ))}
            </ul>
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
                <li key={s} className="font-display text-3xl font-light transition-colors duration-300 hover:text-mauve md:text-4xl">{s}</li>
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
      <div className="reveal mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter certifications by category" className="flex flex-wrap gap-2">
          <button type="button" className="chip" aria-pressed={filter === "All"} onClick={() => setFilter("All")}>All · {certifications.length}</button>
          {certCategories.filter((cat) => counts(cat) > 0).map((cat) => (
            <button key={cat} type="button" className="chip" aria-pressed={filter === cat} onClick={() => setFilter(cat)}>{cat} · {counts(cat)}</button>
          ))}
        </div>
        <Arrows label="certificate" controls="cert-track" {...c} />
      </div>
      <p className="sr-only" aria-live="polite">{list.length} items shown</p>
      <div className="mb-6 flex gap-6 text-xs tracking-wider text-muted-foreground">
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-orchid" />Learning course</span>
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full border border-mauve" />Programs, workshops &amp; participation</span>
        {certifications.some((entry) => entry.type === "Certification") && <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-plum" />Professional certification</span>}
      </div>
      <div id="cert-track" ref={c.ref} role="region" aria-label="Certifications carousel" tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); c.next(); } if (e.key === "ArrowLeft") { e.preventDefault(); c.prev(); } }}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pb-4 md:-mx-10 md:scroll-px-10 md:px-10">
        {list.length === 0 && <p className="py-16 text-muted-foreground">Entries for this category are coming soon.</p>}
        {list.map((cert) => (
          <article key={cert.title + cert.issuer} className="flex min-h-[18rem] w-[78%] shrink-0 snap-start flex-col justify-between rounded-[2rem] border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-orchid hover:shadow-[var(--shadow-soft)] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
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
            <p className="mt-3 text-muted-foreground">{v.org}</p>
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
          <a href="#top" className="hover:text-mauve">Back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}
