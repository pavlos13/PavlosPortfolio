import type {
  Profile,
  ExperienceItem,
  ProjectItem,
  EducationItem,
  SkillCategory,
  CertificationItem,
  SocialLink,
} from "../types";

// Experience calculated from Sep 2021 (Amdocs start) to today
const experienceStartDate = new Date(2021, 8, 1); // 1 September 2021

export const experienceYears = Math.floor(
  (Date.now() - experienceStartDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
);

export const profile: Profile = {
  name: "Pavlos Konstantinou",
  title: "AI Developer / AI Engineer | Java Software Developer",
  email: "pavlosrev@gmail.com",
  phone: "+357 97 732 160",
  location: "Limassol, Cyprus",
  pitch: `Java software developer with ~5 years at Amdocs, building new functionality and fixing defects on live telecom order-management systems used by some of the world's largest operators. Uses AI-assisted development daily with Cursor and MCP integrations. Recently completed courses in Claude Code, coding agents, AI workflow automations in n8n, and generative/agentic AI. Looking to build AI-powered products and developer tooling.`,
  about: `Java software developer with ~5 years at Amdocs, building new functionality and fixing defects on live telecom order-management systems. Owns issues from diagnosis through fix and verification, backed by SQL work on production data, REST/SOAP integrations and automated regression suites. Uses AI-assisted development daily with Cursor and critically reviews model output for subtle errors.

Interested in stock markets and trading (personal investing, follow macro news daily), health and longevity, cooking, and travel.`,
  photo: "/food.jpg",
  resumeUrl: "/Pavlos_Konstantinou.pdf",
};

export const experiences: ExperienceItem[] = [
  {
    company: "Amdocs",
    role: "Software Developer (Mid-Level)",
    dates: "Sep 2021 – Present",
    location: "Limassol, Cyprus",
    achievements: [
      "Java development (primary): Deliver new functionality across the ordering flow and fix defects that only appear once an operator is live; own work from diagnosis through fix and verification.",
      "Domain depth: Understand how an order moves through operator systems, its states and common failure points (stalls between systems, wrong routing, stuck states).",
      "Data & SQL: Write SQL Server queries against production data to trace record history, confirm fixes, reconcile discrepancies between systems and produce reports for non-technical departments; automated recurring hand-built reports.",
      "Integration & testing: Work with REST and SOAP APIs; build and maintain SOAP UI regression/integration suites.",
      "Delivery automation (secondary): Build and maintain Jenkins jobs and release scripts; take changes into production in scheduled windows (prepare, test, deploy, verify, record).",
      "Live-system support (secondary): Handle L2/L3 tickets from other departments, most traced to code and fixed directly; tracked end-to-end in Jira.",
      "Environments: Configure and monitor services on Windows Server, Linux and Red Hat OpenShift (RHOCP) / Kubernetes / containers across dev, test and production.",
      "Team: Wrote team procedures and documentation and trained new joiners. Promoted to mid-level after ~1.5 years.",
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    title: "AI Tools in Daily Work",
    description:
      "Use Cursor with MCP integrations wired to real systems and data sources on actual work. Critically read model output for subtle errors. Daily practice in AI-assisted development with real production systems.",
    techStack: ["Cursor", "MCP", "Claude", "AI Agents"],
    dates: "Ongoing",
  },
  {
    title: "DCF Valuation Tool",
    description:
      "Personal valuation worksheet for any ticker: live price, EPS, revenue, and EBITDA, then a year-by-year projection with growth, target P/E, and discounted fair value. Used it on names like HIMS, including 2030 revenue/EBITDA paths versus management targets.",
    techStack: ["HTML", "JavaScript", "Python", "Yahoo Finance"],
    dates: "Jul 2026",
  },
  {
    title: "HIMS Post-Selloff Analysis",
    description:
      "Wrote up a post-selloff note on Hims & Hers: current valuation, margins, growth assumptions, and what would have to be true for the 2030 targets. Personal research, not a professional research report.",
    techStack: ["Valuation", "DCF", "Equity research notes"],
    dates: "Jul 2026",
  },
  {
    title: "Stock Market Tool",
    description:
      "A React tool for key metrics and latest news on a company or the general economy. Save and sort news by company or macro. Built with React and Cursor.",
    techStack: ["React", "Cursor"],
    dates: "Mar 2026",
    githubUrl: "https://github.com/pavlos13/pavlosStockTracker",
  },
  {
    title: "AIS Ship Tracking & Collision Prediction System",
    description:
      "Designed and implemented a system that tracks the geolocation of ships using AIS (Global Ship Tracking Intelligence), runs algorithms in the background to predict potential crashes, and sends warnings if a ship enters forbidden areas. Final-year university project.",
    techStack: ["Laravel", "PHP", "HTML", "Bootstrap", "Algorithms"],
    dates: "2021",
  },
];

export const education: EducationItem[] = [
  {
    degree: "Computer Science and Engineering (BSc)",
    institution: "Cyprus University of Technology",
    dates: "Sep 2017 – Jun 2021",
    grade: "7.5/10 (Very Good)",
    modules: [
      "Algorithm Complexity",
      "Data Structures & Complexity",
      "Java & OOP",
      "Machine Learning",
      "Advanced Topics in Data Processing Systems",
      "Advanced and Distributed Operating Systems",
    ],
    projects: [
      "AIS-based ship tracking and collision prediction system (Laravel, PHP).",
      "Calendar and Event Scheduling website for the university.",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Development",
    items: ["Java", "Defect diagnosis and fixes", "Git", "Bitbucket", "PowerShell"],
    level: 100,
  },
  {
    name: "AI-Assisted Development",
    items: ["Cursor (daily)", "MCP tool integrations", "Coding agents (Claude Code)", "Reviewing/evaluating LLM output"],
    level: 100,
  },
  {
    name: "Agents & Automation",
    items: ["Agent workflows", "Voice agents in n8n", "Workflow automations", "Generative & agentic AI concepts"],
    level: 100,
  },
  {
    name: "Data",
    items: ["SQL Server production queries", "Reconciliation", "Reporting", "Excel"],
    level: 100,
  },
  {
    name: "APIs & Testing",
    items: ["REST", "SOAP", "SOAP UI regression/integration suites", "Acceptance-criteria checks"],
    level: 100,
  },
  {
    name: "DevOps & Systems",
    items: ["Jenkins", "Release scripts", "Linux", "Windows Server", "OpenShift (RHOCP)", "Kubernetes", "Docker", "Containers"],
    level: 100,
  },
  {
    name: "Process",
    items: ["Jira", "Root-cause analysis", "Documentation", "Training joiners"],
    level: 100,
  },
  {
    name: "Cooking",
    items: ["BBQ", "Steak", "Meat", "Pasta", "Pizza", "Italian cuisine", "Cypriot cuisine", "Greek cuisine"],
    level: 100,
    url: "/cooking",
  },
  {
    name: "Stock Markets & Trading",
    items: [
      "Personal investing",
      "Macro news (CPI, PPI, rates, oil)",
      "Company valuation & DCF",
      "Revenue, EBITDA, P/E analysis",
      "TradingView",
    ],
    level: 100,
  },
  {
    name: "Speaking Languages",
    items: ["Greek (native)", "English (fluent)"],
    level: 100,
  },
  {
    name: "Health & Longevity",
    items: ["Nutrition", "Low carb diets", "Hormones", "Vitamins"],
    level: 100,
  },
];

export const certifications: CertificationItem[] = [
  {
    name: "Certified Professional – DevOps Foundation (CP-DOF)",
    issuer: "Agile Testing Alliance",
    date: "2023",
  },
  {
    name: "AI Coder: Complete Claude Code & Coding Agents Course",
    issuer: "Udemy (Ligency, Ed Donner)",
    date: "Oct 2026",
    url: "https://ude.my/UC-10da2afb-f224-4a80-945f-c914cfbf3914",
  },
  {
    name: "AI Builder: Create Agents, Voice Agents & Automations in n8n",
    issuer: "Udemy",
    date: "Sept 2026",
    url: "https://ude.my/UC-5fbc3341-9cc1-48bb-80c8-2ca098913892",
  },
  {
    name: "AI Leader: Generative AI & Agentic AI for Leaders & Founders",
    issuer: "Udemy",
    date: "Oct 2026",
    url: "https://ude.my/UC-da160d7b-9a65-4783-9e83-a18a665c574d",
  },
];

export const socialLinks: SocialLink[] = [
  { name: "Email", url: "mailto:pavlosrev@gmail.com", icon: "Mail" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/pavlos-konstantinou-649581161/", icon: "Linkedin" },
  { name: "GitHub", url: "https://github.com/pavlos13", icon: "Github" },
  { name: "Instagram", url: "https://www.instagram.com/pavlosrev/", icon: "Instagram" },
  { name: "YouTube", url: "https://www.youtube.com/@pavlosrev", icon: "Youtube" },
  { name: "TikTok", url: "https://www.tiktok.com/@pavlosrev", icon: "Tiktok" },
];
