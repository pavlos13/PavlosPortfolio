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
  pitch: `Experienced Software Developer with ${experienceDuration} in the industry. I build scalable applications and deliver high-quality code in Agile environments, with a strong focus on problem-solving and continuous learning.`,
  about: `I'm a Software Developer with ${experienceDuration} of industry experience, including work with one of the largest telecommunications companies (Amdocs). I'm skilled in scalable application development, Java, CI/CD pipelines (Jenkins), and tools like Perforce, SOAP UI, and Git. I thrive in Agile and SCRUM environments and enjoy turning complex requirements into reliable software. Beyond code, I'm passionate about learning—whether it's finance, the stock market, self-improvement, or health—through books, YouTube, and documentaries. I also love traveling and cooking.`,
  photo: "/profile.jpg",
};

export const experiences: ExperienceItem[] = [
  {
    company: "Amdocs",
    role: "Software Developer",
    dates: "Sep 2021 – Present",
    location: "Cyprus",
    achievements: [
      "Delivered high-quality code using Java, Perforce (PV4), and Jenkins within an Agile development environment, leveraging the CI/CD pipeline for efficient application deployment.",
      "Worked on several Java-based applications, resolved numerous critical defects across development and production phases, ensuring system stability and reliability.",
      "Designed and implemented automation solutions, including Jenkins jobs, custom automation scripts, and comprehensive SOAP UI testing workflows.",
      "Provided live support and participated on-call rotations.",
      "Regularly collaborated with Product Owners to align technical solutions with business needs.",
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
    title: "Stock Market Tool",
    description:
      "A tool with key revenue metrics and latest news for any company or the general economy. Save and sort news by company or general economy. Built with React, Cursor, and vibe coding.",
    techStack: ["React", "Cursor", "Vibe coding"],
    dates: "Mar 5, 2026",
    githubUrl: "https://github.com/pavlos13/pavlosStockTracker",
  },
  {
    title: "AIS Ship Tracking & Collision Prediction System",
    description:
      "Designed and implemented a system that tracks the geolocation of ships using AIS (Global Ship Tracking Intelligence), runs algorithms in the background to predict potential crashes, and sends warnings if a ship enters forbidden areas.",
    techStack: ["Laravel", "PHP", "HTML", "Bootstrap", "Algorithms"],
    dates: "1 Jan 2021",
    githubUrl: "#",
  },
  {
    title: "University Calendar & Event Scheduling Website",
    description:
      "Design and implementation of a Calendar and Event Scheduling website for the university, built as part of the Computer Science degree.",
    techStack: ["PHP", "HTML", "Bootstrap", "JavaScript"],
    dates: "1 Jan 2021",
    githubUrl: "#",
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
    items: ["Java", "PHP", "JavaScript", "HTML", "CSS"],
    level: 100,
  },
  {
    name: "Tools & DevOps",
    items: ["Jenkins", "Perforce (PV4)", "Git", "SOAP UI", "Visual Studio Code", "Eclipse", "Cursor", "Vibe coding"],
    level: 100,
  },
  {
    name: "Frameworks & Libraries",
    items: ["Laravel", "Bootstrap", "OOP"],
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
    items: ["Economy", "Stock market", "Macroeconomy", "Microeconomy"],
    level: 100,
  },
  {
    name: "Speaking languages",
    items: ["Greek", "English"],
    level: 100,
  },
  {
    name: "Health",
    items: ["Health", "Low carb diets", "Hormones", "Vitamins"],
    level: 100,
  },
];

export const certifications: CertificationItem[] = [
  // Add any certifications here when you have them
];

export const socialLinks: SocialLink[] = [
  { name: "Email", url: "mailto:pavlosrev@gmail.com", icon: "Mail" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/pavlos-konstantinou-649581161/", icon: "Linkedin" },
  { name: "GitHub", url: "https://github.com/pavlos13", icon: "Github" },
  { name: "Instagram", url: "https://www.instagram.com/pavlosrev/", icon: "Instagram" },
  { name: "YouTube", url: "https://www.youtube.com/@pavlosrev", icon: "Youtube" },
  { name: "TikTok", url: "https://www.tiktok.com/@pavlosrev", icon: "Tiktok" },
];
