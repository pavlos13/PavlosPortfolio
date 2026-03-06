export interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  pitch: string;
  about: string;
  photo: string;
  resumeUrl?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  dates: string;
  location?: string;
  achievements: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  techStack: string[];
  dates?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  dates: string;
  grade?: string;
  modules?: string[];
  projects?: string[];
}

export interface SkillCategory {
  name: string;
  items: string[];
  level?: number; // 0-100 for progress
  url?: string; // optional link (e.g. /cooking)
}

export interface CertificationItem {
  name: string;
  issuer?: string;
  date?: string;
  url?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
