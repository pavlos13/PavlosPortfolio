import { Mail, Phone, FileText, Linkedin, Github, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import type { Profile, SocialLink } from "../types";

function TiktokIcon({ className, ...props }: { className?: string; "aria-hidden"?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const socialIconMap: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  Linkedin,
  Github,
  Instagram,
  Youtube,
  Tiktok: TiktokIcon,
};

interface HeroProps {
  profile: Profile;
  socialLinks: SocialLink[];
}

export function Hero({ profile, socialLinks }: HeroProps) {
  return (
    <section
      id="hero"
      className="min-h-[90vh] flex items-center section-padding bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
      aria-labelledby="hero-heading"
    >
      <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-2">
              Hello, I'm
            </p>
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight"
            >
              {profile.name}
            </h1>
            <p className="mt-4 text-xl sm:text-2xl text-slate-600 dark:text-slate-400">
              {profile.title}
              {profile.location ? ` · ${profile.location}` : ""}
            </p>
            <p className="mt-6 text-slate-600 dark:text-slate-300 text-lg max-w-xl">
              {profile.pitch}
            </p>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors"
              aria-label="Email me"
            >
              <Mail className="w-5 h-5 shrink-0" aria-hidden />
              <span className="flex flex-col items-start">
                <span>Get in touch</span>
                <span className="text-sm font-normal opacity-90">{profile.email}</span>
              </span>
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Call me"
            >
              <Phone className="w-5 h-5" aria-hidden />
              {profile.phone}
            </a>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Download resume"
              >
                <FileText className="w-5 h-5" aria-hidden />
                Resume
              </a>
            )}
          </motion.div>

          <motion.div
            className="mt-6 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            aria-label="Social links"
          >
            {socialLinks
              .filter((l) => l.icon !== "Mail" && l.icon !== "Phone")
              .map((link) => {
                const Icon = socialIconMap[link.icon];
                if (!Icon) return null;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="w-6 h-6" aria-hidden />
                  </a>
                );
              })}
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative">
            <img
              src={profile.photo}
              alt=""
              className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl object-cover shadow-xl ring-4 ring-emerald-500/20 dark:ring-emerald-400/20"
              width={288}
              height={288}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
