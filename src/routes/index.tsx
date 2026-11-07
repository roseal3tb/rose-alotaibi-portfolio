import { createFileRoute } from "@tanstack/react-router";
import { About, Certifications, Contact, Experience, Hero, Highlights, Nav, Projects, Skills, Volunteering } from "@/components/portfolio/sections";

const title = "Rose Alotaibi — Where technology meets creativity";
const description = "Portfolio of Rose Alotaibi, IT student at King Saud University (Networks & IoT Engineering): projects, leadership, certifications and contact.";
const socialImage = "https://rosealotaibi.vercel.app/og-preview.svg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rosealotaibi.vercel.app/" },
      { property: "og:image", content: socialImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/svg+xml" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: socialImage },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Skills />
        <Highlights />
        <Certifications />
        <Volunteering />
        <Contact />
      </main>
    </>
  );
}
