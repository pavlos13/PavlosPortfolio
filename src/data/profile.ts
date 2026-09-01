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
function getExperienceYearsAndMonths(): string {
  const now = new Date();
  let years = now.getFullYear() - experienceStartDate.getFullYear();
  let months = now.getMonth() - experienceStartDate.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  if (now.getDate() < experienceStartDate.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }
  const y = years === 1 ? "1 year" : `${years} years`;
  const m = months === 1 ? "1 month" : months === 0 ? "" : `${months} months`;
  return m ? `${y} and ${m}` : y;
}
const experienceDuration = getExperienceYearsAndMonths();

export const profile: Profile = {
  name: "Pavlos Konstantinou",
  title: "Software Developer",
  email: "pavlosrev@gmail.com",
  phone: "+357 97 732 160",
  location: "Limassol, Cyprus",
  pitch: `Software Developer with ${experienceDuration} at Amdocs. Most of that time was building Java applications, and more recently frontend work. I follow the stock market every day, do my own valuations, and I'm looking for roles where software sits closer to markets.`,
  about: `I'm based in Limassol. At Amdocs I moved to mid-level after about 18 months. Most of my time there has been development, and the last half year has been frontend work on Amdocs Experience Manager. I use SQL Server, Windows Server, and PowerShell in day-to-day work, plus Jenkins, SOAP UI, Git, Bitbucket, and Perforce. On OpenShift I apply configuration across environments and read service logs while developing — another team owns the deployments, and I am not claiming deep container internals.

Outside work I invest my own money in individual stocks (not ETFs). I follow macro news daily — CPI, PPI, rates, oil — and I build simple tools to value companies (DCF, revenue, EBITDA, P/E). That is personal analysis, not a finance-analyst job. I also cook, travel, and read about health and longevity.`,
  photo: "/profile.jpg",
};

export const experiences: ExperienceItem[] = [
  {
    company: "Amdocs",
    role: "Software Developer",
    dates: "Sep 2021 – Present",
    location: "Limassol, Cyprus",
    achievements: [
      "Promoted to mid-level after about 18 months. Most of my time has been development, with the last six months as a frontend developer on Amdocs Experience Manager.",
      "Built and extended Java applications across several products, from requirement through design, code review, and release. Worked with Product Owners when the original request needed to change.",
      "Built team automation: Jenkins jobs, PowerShell and custom scripts, and SOAP UI suites for regression and integration testing.",
      "Used SQL Server daily to trace data through the system and confirm a change behaved as expected. Worked day to day on Windows Server and PowerShell.",
      "On Red Hat OpenShift, applied configuration across environments and read service logs while developing. Deployments are owned by another team.",
      "Helped onboard and train newcomers to the team.",
    ],
  },
  {
    company: "Cyprus National Guard",
    role: "National Service",
    dates: "2015 – 2017",
    location: "Cyprus",
    achievements: [
      "Completed mandatory military service with the Cyprus National Guard.",
    ],
  },
  {
    company: "Adelphoi Konstantinou & Dimitriou",
    role: "Construction Work (summer part-time)",
    dates: "2014 – 2021",
    location: "Cyprus",
    achievements: [
      "Collaborated with diverse teams to coordinate tasks, solve problems, and ensure project milestones.",
      "Adapted quickly to new challenges by learning and applying construction techniques efficiently, showcasing problem-solving abilities and a willingness to learn.",
    ],
  },
];

export const projects: ProjectItem[] = [
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
      "Designed and implemented a system that tracks the geolocation of ships using AIS (Global Ship Tracking Intelligence), runs algorithms in the background to predict potential crashes, and sends warnings if a ship enters forbidden areas.",
    techStack: ["Laravel", "PHP", "HTML", "Bootstrap", "Algorithms"],
    dates: "2021",
  },
  {
    title: "University Calendar & Event Scheduling Website",
    description:
      "Design and implementation of a Calendar and Event Scheduling website for the university, built as part of the Computer Science degree.",
    techStack: ["PHP", "HTML", "Bootstrap", "JavaScript"],
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
    name: "Languages & Core",
    items: ["Java", "SQL (SQL Server)", "PowerShell", "PHP", "JavaScript", "HTML", "CSS"],
    level: 100,
  },
  {
    name: "Tools & DevOps",
    items: [
      "Jenkins",
      "SOAP UI",
      "Git",
      "Bitbucket",
      "Perforce (P4)",
      "Cursor and MCP",
      "Windows Server",
      "SQL Server",
      "Red Hat OpenShift (logs & config)",
      "Figma",
      "Visual Studio Code",
      "Eclipse",
    ],
    level: 100,
  },
  {
    name: "Frameworks & Libraries",
    items: ["Laravel", "Bootstrap", "Amdocs Experience Manager", "React", "OOP"],
    level: 100,
  },
  {
    name: "Methodologies",
    items: ["Agile", "SCRUM", "CI/CD"],
    level: 100,
  },
  {
    name: "Cooking",
    items: ["BBQ", "Steak", "Meat", "Pasta", "Pizza", "Italian cuisine", "Cypriot cuisine", "Greek cuisine"],
    level: 100,
    url: "/cooking",
  },
  {
    name: "Economy & Markets",
    items: [
      "Individual stocks (own capital)",
      "Daily macro news (CPI, PPI, rates, oil)",
      "Company valuation & DCF",
      "Revenue, EBITDA, P/E",
      "TradingView",
      "MetaTrader 4/5 (study, not job experience)",
    ],
    level: 100,
  },
  {
    name: "Speaking languages",
    items: ["Greek (native)", "English (fluent)"],
    level: 100,
  },
  {
    name: "Health",
    items: ["Health", "Low carb diets", "Hormones", "Vitamins"],
    level: 100,
  },
];

export const certifications: CertificationItem[] = [
  {
    name: "Certified Professional – DevOps Foundation (CP-DOF)",
    issuer: "Agile Testing Alliance",
    date: "2023",
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
