import suda from "@/assets/shot-suda.jpg";
import sukuk from "@/assets/shot-sukuk.jpg";
import qamat from "@/assets/shot-qamat.jpg";
import heart from "@/assets/cover-heart.jpg";
import network from "@/assets/cover-network.webp";
import murabba from "@/assets/cover-murabba.webp";
import yusur from "@/assets/cover-yusur-green.webp";
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
  skillsGained: string[];
  url: string;
  image: string;
  imageFit?: "cover" | "contain";
  kind: "live" | "repo";
};

export const projects: Project[] = [
  {
    title: "Suda", category: "Digital Platform",
    description: "A digital platform connecting fashion learning with career opportunities. I led the team and helped define product requirements and priorities.",
    tags: ["React", "TypeScript", "Product", "Team Leadership"],
    skillsGained: ["Requirements analysis", "Product scoping", "Cross-functional teamwork", "User-centered thinking"],
    url: "https://sudadesign.vercel.app/", image: suda, kind: "live",
  },
  {
    title: "Sukuk Lab", category: "Program Website",
    description: "An Arabic right-to-left information and registration experience for Ethmar's three-day sukuk learning program.",
    tags: ["Arabic RTL", "Web", "Registration"],
    skillsGained: ["RTL interface design", "Responsive layouts", "Form experience", "Content organization"],
    url: "https://sukuk-lab.vercel.app/", image: sukuk, kind: "live",
  },
  {
    title: "Qamat", category: "Youth Initiative",
    description: "A web presence for the Qamat youth initiative, connected to my role leading its technical committee.",
    tags: ["Web", "Technical Leadership"],
    skillsGained: ["Technical coordination", "Website planning", "Stakeholder communication", "Prioritization"],
    url: "https://www.qamatinitiative.com/", image: qamat, kind: "live",
  },
  {
    title: "Heart Failure Prediction", category: "Data Mining · ML",
    description: "A data mining and machine-learning study exploring heart failure prediction using Python and data analysis tools.",
    tags: ["Python", "pandas", "scikit-learn"],
    skillsGained: ["Data preparation", "Exploratory analysis", "Model training", "Result interpretation"],
    url: repo + "Data%20Mining", image: heart, kind: "repo",
  },
  {
    title: "Glam & Ping", category: "Networking",
    description: "A Java networking project exploring communication between a client and a server.",
    tags: ["Java", "Client/Server", "Networking"],
    skillsGained: ["Client-server architecture", "Network communication", "Java programming", "Debugging"],
    url: repo + "Network%20Engineering", image: network, imageFit: "contain", kind: "repo",
  },
  {
    title: "Murabba", category: "Interactive Learning",
    description: "A web-based educational experience with interactive lessons and quizzes.",
    tags: ["HTML", "JavaScript", "Web"],
    skillsGained: ["DOM interactions", "Quiz logic", "Front-end structure", "Interaction design"],
    url: repo + "Web%20Development%20Engineering", image: murabba, imageFit: "contain", kind: "repo",
  },
  {
    title: "Yusur", category: "UX/UI Concept",
    description: "A Figma concept for pilgrimage services, navigation, and crowd-mapping experiences.",
    tags: ["Figma", "UX/UI"],
    skillsGained: ["Information architecture", "User flows", "Wireframing", "Prototyping"],
    url: repo + "UX%20%26%20UI", image: yusur, imageFit: "contain", kind: "repo",
  },
  {
    title: "Tuwaiq Academy Database", category: "Database Coursework",
    description: "An Oracle/SQL coursework application for managing courses, students, grades, and attendance.",
    tags: ["Oracle", "SQL", "Database"],
    skillsGained: ["Relational data modeling", "SQL querying", "Schema design", "Data integrity"],
    url: repo + "Database", image: database, kind: "repo",
  },
];

export type Role = {
  title: string;
  dates: string;
  summary: string;
  responsibilities: string[];
  affiliation?: string;
};

export type ExperienceEntry = {
  org: string;
  label: string;
  introduction: string;
  roles: Role[];
};

export const experience: ExperienceEntry[] = [
  {
    org: "Future Technology Club (FTC)",
    label: "Student leadership · King Saud University",
    introduction: "My journey at FTC spans member support, marketing leadership, media coverage, and technical collaboration.",
    roles: [
      {
        title: "Technical Committee Member", dates: "Aug 2026 – Present",
        summary: "Contribute a practical technical perspective to the club's activities and initiatives.",
        responsibilities: ["Support technical planning and help identify implementation needs.", "Collaborate on troubleshooting, coordination, and follow-up for club activities."],
      },
      {
        title: "Media Committee Leader · Qiwam Camp", dates: "May 2026 – Aug 2026",
        summary: "Led the media team's creative direction and coverage coordination for Qiwam Camp.",
        responsibilities: ["Organized media tasks and coverage priorities across the camp.", "Coordinated content preparation, publishing, and consistent visual messaging."],
      },
      {
        title: "Marketing Team Leader", dates: "Jan 2026 – Aug 2026",
        summary: "Guided the team's campaigns, content direction, and day-to-day marketing coordination.",
        responsibilities: ["Planned promotional ideas and organized the content workflow.", "Distributed tasks, followed up on deliverables, and aligned messages with activity goals."],
      },
      {
        title: "Media Committee Leader · Start Up Fair 2.0", dates: "Mar 2026 – Jun 2026",
        summary: "Led media planning and event storytelling for Start Up Fair 2.0.",
        responsibilities: ["Coordinated coverage tasks and promotional content for event moments.", "Helped maintain a clear, consistent message across media outputs."],
      },
      {
        title: "Member Affairs Committee Member", dates: "Aug 2025 – Dec 2025",
        summary: "Supported the internal member experience and the team's coordination.",
        responsibilities: ["Assisted with member communication and activity organization.", "Helped keep information and internal follow-ups organized."],
      },
    ],
  },
  {
    org: "Qamat Initiative",
    label: "Technical leadership",
    introduction: "Helping translate the initiative's goals into coordinated digital and technical work.",
    roles: [{
      title: "Technical Committee Leader", dates: "Aug 2026 – Present",
      summary: "Guide the committee's technical priorities and coordinate progress across deliverables.",
      responsibilities: ["Organize technical requirements, responsibilities, and timelines.", "Coordinate contributors and follow up on website-related needs and solutions."],
    }],
  },
  {
    org: "Ethmar Financial Initiative",
    label: "Technical leadership",
    introduction: "Supporting digital execution and the technical needs of an educational financial initiative.",
    roles: [{
      title: "Technical Committee Vice President", dates: "Jul 2026 – Present",
      summary: "Support the committee's leadership, planning, and technical coordination.",
      responsibilities: ["Help prioritize technical requests and organize team responsibilities.", "Coordinate digital deliverables with the initiative's activities and stakeholders."],
    }],
  },
  {
    org: "King Saud University · Student Leadership",
    label: "IT Student Council & peer mentorship",
    introduction: "Combining student representation with one-to-one support for students navigating university life and their IT major.",
    roles: [
      {
        title: "Big Sibling · Student Mentor", dates: "Aug 2026 – Present",
        affiliation: "KSU College of Computer & Information Sciences",
        summary: "Help younger students with whatever they need to find their way through university and the IT specialization.",
        responsibilities: ["Answer questions about courses, study plans, university systems, and campus life.", "Share guidance on the major, learning resources, opportunities, and adjusting to university."],
      },
      {
        title: "IT Student Council Vice President", dates: "Jan 2026 – Aug 2026",
        affiliation: "Information Technology Student Council",
        summary: "Supported student representation and helped coordinate council priorities.",
        responsibilities: ["Helped organize student-facing initiatives and council follow-ups.", "Communicated ideas, concerns, and feedback between students and the council team."],
      },
      {
        title: "IT Student Council Member", dates: "Aug 2025 – Dec 2025",
        affiliation: "Information Technology Student Council",
        summary: "Contributed to the council's activities and student engagement.",
        responsibilities: ["Assisted with organizing initiatives and communicating with students.", "Supported team coordination and the collection of student input."],
      },
    ],
  },
  {
    org: "NUGTTAH",
    label: "Summer internship · Marketing & technology",
    introduction: "Hands-on experience across content, social media operations, campaigns, and the digital workflows behind them.",
    roles: [{
      title: "Marketing & Technical Intern", dates: "Jun 2026 – Sep 2026",
      summary: "Worked across social media, creator coordination, campaign support, and digital operations.",
      responsibilities: [
        "Prepared and organized social content, maintained publishing schedules, and supported day-to-day platform management.",
        "Monitored community comments and messages, coordinated with content creators and micro-influencers, and supported campaign execution.",
        "Organized creative assets and operational data, tracked engagement, and contributed to basic reporting and technical workflow support.",
      ],
    }],
  },
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
export type Cert = { title: string; issuer: string; date?: string; category: CertCategory; type: "Course" | "Certification" | "Program" | "Workshop" | "Participation" };

// Faithful English titles of courses, workshops, programs and participations shown in Rose's provided certificate screenshots.
// A course completion or attendance certificate is NOT necessarily a professional certification.
export const certifications: Cert[] = [
  { title: "Azure Cloud Academy", issuer: "Spectrum Networks", date: "Jul 2026", category: "Cloud & Infrastructure", type: "Program" },
  { title: "Cloud Computing Fundamentals", issuer: "IBM", date: "Mar 2026", category: "Cloud & Infrastructure", type: "Course" },
  { title: "Cloud Computing", issuer: "Misk Skills", date: "Mar 2026", category: "Cloud & Infrastructure", type: "Course" },
  { title: "Google Cloud Data Platforms & IaaS", issuer: "Tuwaiq Academy", date: "Aug 2025", category: "Cloud & Infrastructure", type: "Workshop" },
  { title: "AI Agents and Agentic AI with Python & Generative AI", issuer: "Coursera", date: "Mar 2026", category: "AI & Machine Learning", type: "Course" },
  { title: "AI Agents and Agentic AI Architecture in Python", issuer: "Coursera", date: "Mar 2026", category: "AI & Machine Learning", type: "Course" },
  { title: "Introduction to Artificial Intelligence", issuer: "IBM", date: "Jul 2026", category: "AI & Machine Learning", type: "Course" },
  { title: "Foundations in Generative AI", issuer: "IBM", date: "Jul 2026", category: "AI & Machine Learning", type: "Course" },
  { title: "Microsoft AI Skills", issuer: "Spectrum Networks", date: "Jul 2026", category: "AI & Machine Learning", type: "Course" },
  { title: "AI Fundamentals", issuer: "SDAIA", category: "AI & Machine Learning", type: "Course" },
  { title: "AI Concepts and Advanced Applications", issuer: "SDAIA", category: "AI & Machine Learning", type: "Course" },
  { title: "Machine Learning Applications in E-commerce", issuer: "AI Center of Advanced Studies", date: "Sep 2026", category: "AI & Machine Learning", type: "Course" },
  { title: "AI for University Students", issuer: "Spectrum Networks", date: "Jul 2026", category: "AI & Machine Learning", type: "Course" },
  { title: "AI for Educators", issuer: "Spectrum Networks", date: "Jul 2026", category: "AI & Machine Learning", type: "Course" },
  { title: "AI Accelerator", issuer: "Industrial Engineering Club", date: "May 2026", category: "AI & Machine Learning", type: "Program" },
  { title: "Artificial Intelligence: Across Sectors and the Real World", issuer: "Arab Open University", date: "Mar 2026", category: "AI & Machine Learning", type: "Workshop" },
  { title: "How to Build an AI Chatbot Workshop", issuer: "AI Center of Advanced Studies", date: "Nov 2025", category: "AI & Machine Learning", type: "Workshop" },
  { title: "Artificial Intelligence", issuer: "Misk Skills", date: "Mar 2026", category: "AI & Machine Learning", type: "Course" },
  { title: "Cybersecurity", issuer: "Misk Skills", date: "Mar 2026", category: "Cybersecurity", type: "Course" },
  { title: "Windows Fundamentals Workshop", issuer: "Cyberguard Club", date: "May 2026", category: "Cybersecurity", type: "Workshop" },
  { title: "MongoDB for SQL Professionals", issuer: "MongoDB", date: "Nov 2025", category: "Databases & Development", type: "Course" },
  { title: "Electronic Circuit Soldering Fundamentals", issuer: "Tuwaiq Academy", date: "Sep 2025", category: "Databases & Development", type: "Workshop" },
  { title: "Workplace Skills in the Age of Artificial Intelligence", issuer: "Misk Skills", date: "May 2026", category: "Professional Development", type: "Workshop" },
  { title: "Choosing a Career Path in a Changing Job Market", issuer: "Misk Skills", date: "May 2026", category: "Professional Development", type: "Workshop" },
  { title: "Improving Workplace Efficiency and Productivity with AI", issuer: "Misk Skills", date: "May 2026", category: "Professional Development", type: "Workshop" },
  { title: "Beyond AI Community Member", issuer: "AI Center of Advanced Studies", date: "Sep 2026", category: "Programs & Participation", type: "Participation" },
  { title: "AI ERA NEON Bootcamp", issuer: "Neon Edu", date: "May 2026", category: "Programs & Participation", type: "Participation" },
  { title: "IBM SkillsBuild Program (IBM and eYouth)", issuer: "IBM", date: "Apr 2026", category: "Programs & Participation", type: "Program" },
  { title: "Technology Citizenship: Building Technology for the Nation", issuer: "Tuwaiq Academy", date: "Sep 2025", category: "Programs & Participation", type: "Workshop" },
  { title: "Smart Robotics Camp", issuer: "AI Center of Advanced Studies", date: "Sep 2025", category: "Programs & Participation", type: "Workshop" },
  { title: "eYouth Learning Plan", issuer: "IBM", date: "Jan 2026", category: "Programs & Participation", type: "Program" },
];

export const volunteering = [
  { title: "AWS Track Member", org: "Tuwaiq Club · KSU", dates: "Sep 2026 – Present", description: "Participate in a cloud-focused learning community and explore AWS topics and practical learning resources." },
  { title: "VentureX Hackathon · Media Committee Member", org: "Future Technology Club (FTC)", dates: "Jun 2026 – Present", description: "Support hackathon media preparation, coverage coordination, and communication around the event." },
  { title: "Security+ Camp Mentor", org: "Cyberguard Club", dates: "Aug 2026", description: "Help participants navigate camp learning materials, questions, and cybersecurity fundamentals." },
];
