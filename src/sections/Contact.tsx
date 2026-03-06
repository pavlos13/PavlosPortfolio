import { Mail, Phone, Linkedin, Github, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import type { Profile, SocialLink } from "../types";

function TiktokIcon({ className, ...props }: { className?: string; "aria-hidden"?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const iconMap: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  Mail,
  Phone,
  Linkedin,
  Github,
  Instagram,
  Youtube,
  Tiktok: TiktokIcon,
};

interface ContactProps {
  profile: Profile;
  socialLinks: SocialLink[];
}

export function Contact({ profile, socialLinks }: ContactProps) {
  return (
    <section
      id="contact"
      className="section-padding bg-slate-50 dark:bg-slate-950/50"
      aria-labelledby="contact-heading"
    >
      <div className="container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="contact-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Get in touch
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            I'm open to new opportunities and happy to chat. Reach out via email, phone, or socials.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors"
            aria-label="Email me"
          >
            <Mail className="w-5 h-5" aria-hidden />
            {profile.email}
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Call me"
          >
            <Phone className="w-5 h-5" aria-hidden />
            {profile.phone}
          </a>
        </motion.div>

        <motion.div
          className="mt-8 flex justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {socialLinks
            .filter((l) => l.icon !== "Mail" && l.icon !== "Phone")
            .map((link) => {
              const Icon = iconMap[link.icon];
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
    </section>
  );
}
