# Rose Alotaibi — Portfolio

An editorial-style personal portfolio for **Rose Alotaibi**, an Information Technology student at King Saud University specializing in Networks & IoT Engineering.

The site showcases projects, education, leadership, skills, hackathons, certificates and community involvement.

## Tech stack

- React 19 and TypeScript
- TanStack Start + TanStack Router (server-rendered)
- Tailwind CSS 4
- Vitest for automated tests
- Bun lockfile for reproducible dependencies

## Run locally

Requires a recent version of Bun and a Node.js version supported by the current framework.

```bash
bun install --frozen-lockfile
bun run dev
```

## Quality checks

```bash
bun run lint
bun run test
bun run build
```

The project also runs the checks above in GitHub Actions for pull requests.

## Content updates

The project content and links are managed in `src/data/portfolio.ts`. UI sections and navigation are in `src/components/portfolio/sections.tsx`. Styles and design tokens live in `src/styles.css`.

GitHub links for coursework point to related folders in the [projects repository](https://github.com/roseal3tb/rosesrproejcts), not necessarily individual standalone applications.

Certificates and courses are labeled by type so a learning-course completion is not misrepresented as a professional certification.

## Deploy to Vercel

1. Import this GitHub repository in Vercel.
2. Check that **TanStack Start** is detected as the framework.
3. Use the repository's install and build scripts; avoid duplicating Nitro plugins already managed by the Lovable Vite wrapper.
4. Deploy to a **Preview** environment and check the manual test list below before promoting to Production.

Vercel supports Lovable's TanStack Start applications. If a preview build fails, investigate its build logs and the Nitro target before changing the production site.

## Manual prelaunch checklist

- [ ] Desktop layout (1440px and 1280px) renders correctly
- [ ] Mobile layout (390px and 320px) has no accidental horizontal page overflow
- [ ] All navigation links, project links and contact actions work
- [ ] Projects carousel arrows, keyboard arrows, touch swipe and scroll snap work
- [ ] Certificate categories and carousel controls work; empty categories are hidden
- [ ] Visible content and buttons pass a keyboard-only navigation review
- [ ] Reduced-motion mode disables decorative motion
- [ ] No failed images, console errors, server errors or accessibility errors
- [ ] Check Lighthouse mobile performance, accessibility and SEO
- [ ] Verify link preview / social-share image and final domain-specific metadata
- [ ] Check both preview and production routes after deployment

## Contact

- [LinkedIn](https://www.linkedin.com/in/rose-alotaibi-453416365/)
- [GitHub](https://github.com/roseal3tb/rosesrproejcts)
- [Email](mailto:roseal3tb@gmail.com)

© 2026 Rose Alotaibi.
