import suda from "@/assets/shot-suda.jpg";
import sukuk from "@/assets/shot-sukuk.jpg";
import qamat from "@/assets/shot-qamat.jpg";
import heart from "@/assets/cover-heart.jpg";
import network from "@/assets/cover-network.jpg";
import murabba from "@/assets/cover-murabba.jpg";
import yusur from "@/assets/cover-yusur.jpg";
import database from "@/assets/cover-database.jpg";

export const contact = {
  email: "roseal3tb@gmail.com",
  github: "https://github.com/roseal3tb/rosesrproejcts",
  linkedin: "https://www.linkedin.com/in/rose-alotaibi-453416365/",
};

const repo = "https://github.com/roseal3tb/rosesrproejcts/tree/main/";

export type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  url: string;
  image: string;
  kind: "live" | "repo";
};

export const projects: Project[] = [
  { title: "Suda", category: "Digital Platform", description: "A digital platform for fashion learning and career opportunities. Led the team and shaped the product requirements.", tags: ["React", "TypeScript", "Team Leadership", "Product"], url: "https://sudadesign.vercel.app/", image: suda, kind: "live" },
  { title: "Sukuk Lab", category: "Program Website", description: "Arabic RTL informational and registration website for the Ethmar Financial Initiative's three-day sukuk learning program.", tags: ["Arabic RTL", "Web", "Registration"], url: "https://sukuk-lab.vercel.app/", image: sukuk, kind: "live" },
  { title: "Qamat", category: "Youth Initiative", description: "Website for the Qamat youth initiative, alongside leadership of its technical committee.", tags: ["Web", "Technical Leadership"], url: "https://www.qamatinitiative.com/", image: qamat, kind: "live" },
  { title: "Heart Failure Prediction", category: "Data Mining · ML", description: "A data mining and machine learning project exploring heart failure prediction.", tags: ["Python", "pandas", "scikit-learn"], url: repo + "Data%20Mining", image: heart, kind: "repo" },
  { title: "Glam & Ping", category: "Networking", description: "A Java networking project built on a client/server architecture.", tags: ["Java", "Client/Server", "Networking"], url: repo + "Network%20Engineering", image: network, kind: "repo" },
  { title: "Murabba", category: "Interactive Learning", description: "Interactive educational lessons and quizzes built for the web.", tags: ["HTML", "JavaScript"], url: repo + "Web%20Development%20Engineering", image: murabba, kind: "repo" },
  { title: "Yusur", category: "UX/UI Concept", description: "A Figma UX/UI concept for pilgrimage services and crowd mapping.", tags: ["Figma", "UX/UI"], url: repo + "UX%20%26%20UI", image: yusur, kind: "repo" },
  { title: "Tuwaiq Academy Database", category: "Database Coursework", description: "Oracle/SQL database coursework application covering courses, students, grades and attendance.", tags: ["Oracle", "SQL"], url: repo + "Database", image: database, kind: "repo" },
];

export type Role = { title: string; dates: string };
export const experience: { org: string; roles: Role[] }[] = [
  { org: "Future Technology Club (FTC)", roles: [
    { title: "Technical Committee Member", dates: "Aug 2026 – Present" },
    { title: "Media Committee Leader · Qiwam Camp", dates: "May 2026 – Aug 2026" },
    { title: "Marketing Team Leader", dates: "Jan 2026 – Aug 2026" },
    { title: "Media Committee Leader · Start Up Fair 2.0", dates: "Mar 2026 – Jun 2026" },
    { title: "Member Affairs Committee Member", dates: "Aug 2025 – Dec 2025" },
  ] },
  { org: "Qamat Initiative", roles: [{ title: "Technical Committee Leader", dates: "Aug 2026 – Present" }] },
  { org: "Ethmar Financial Initiative", roles: [{ title: "Technical Committee Vice President", dates: "Jul 2026 – Present" }] },
  { org: "KSU IT Student Council", roles: [
    { title: "Vice President", dates: "Jan 2026 – Aug 2026" },
    { title: "Member", dates: "Aug 2025 – Dec 2025" },
  ] },
  { org: "King Saud University", roles: [{ title: "Big Sibling", dates: "Aug 2026 – Present" }] },
  { org: "NUGTTAH", roles: [{ title: "Marketing Intern", dates: "Jun 2026 – Aug 2026" }] },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["HTML", "CSS", "JavaScript", "Python", "Java", "SQL"] },
  { group: "Frameworks & Design", items: ["React", "TypeScript", "Figma", "UX/UI"] },
  { group: "Infrastructure & Emerging Tech", items: ["Networking", "IoT", "Cloud", "AI/ML"] },
  { group: "Beyond the Code", items: ["Marketing", "Leadership"] },
];

export const highlights = [
  { title: "ROSHN Hackathon 2025", tag: "Hackathon", description: "Collaborated on a functional IoT prototype designed to monitor household utility usage, including water, electricity, and gas, exploring smarter ways to improve visibility into resource consumption." },
  { title: "KPMG × Tuwaiq", tag: "Selected Participant", description: "Selected from 1,200+ applicants across 30 universities for a two-day consulting case experience." },
];

export const certCategories = [
  "Cloud & Infrastructure",
  "AI & Machine Learning",
  "Cybersecurity",
  "Databases & Development",
  "Professional Development",
  "Programs & Participation",
] as const;
export type CertCategory = (typeof certCategories)[number];

/** Add new entries here — the carousel and filters update automatically. */
export type Cert = { title: string; issuer: string; date?: string; category: CertCategory; type: "Course" | "Certification" | "Program" };

export const certifications: Cert[] = [
  { title: "Azure Cloud Academy", issuer: "Spectrum Networks", category: "Cloud & Infrastructure", type: "Program" },
  { title: "Cloud Computing Fundamentals", issuer: "IBM", date: "Mar 2026", category: "Cloud & Infrastructure", type: "Course" },
  { title: "Cloud Computing", issuer: "Misk", date: "Mar 2026", category: "Cloud & Infrastructure", type: "Course" },
  { title: "Google Cloud Data Platforms & IaaS", issuer: "Tuwaiq Academy", date: "Aug 2025", category: "Cloud & Infrastructure", type: "Course" },
  { title: "AI Agents and Agentic AI with Python & Generative AI", issuer: "Coursera", date: "Mar 2026", category: "AI & Machine Learning", type: "Course" },
  { title: "AI Agents and Agentic AI Architecture in Python", issuer: "Coursera", date: "Mar 2026", category: "AI & Machine Learning", type: "Course" },
  { title: "Introduction to AI", issuer: "IBM", date: "Jul 2026", category: "AI & Machine Learning", type: "Course" },
  { title: "Foundations in Generative AI", issuer: "IBM", date: "Jul 2026", category: "AI & Machine Learning", type: "Course" },
  { title: "Microsoft AI Skills", issuer: "Spectrum Networks", date: "Jul 2026", category: "AI & Machine Learning", type: "Program" },
  { title: "AI Fundamentals", issuer: "SDAIA", category: "AI & Machine Learning", type: "Course" },
  { title: "AI Concepts: Advanced Applications", issuer: "SDAIA", category: "AI & Machine Learning", type: "Course" },
  { title: "MongoDB for SQL Professionals", issuer: "MongoDB", date: "Nov 2025", category: "Databases & Development", type: "Course" },
  { title: "Cybersecurity", issuer: "Misk", date: "Mar 2026", category: "Cybersecurity", type: "Course" },
];

export const volunteering = [
  { title: "AWS Track Member", org: "Tuwaiq Club · KSU", dates: "Sep 2026 – Present" },
  { title: "VentureX Hackathon · Media Committee Member", org: "Future Technology Club (FTC)", dates: "Jun 2026 – Present" },
  { title: "Security+ Camp Mentor", org: "Cyberguard Club", dates: "Aug 2026" },
];
