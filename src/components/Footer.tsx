import { Github, Linkedin, Mail, Instagram, Youtube } from "lucide-react";
import type { SocialLink } from "../types";

function TiktokIcon({ className, ...props }: { className?: string; "aria-hidden"?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const iconMap: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  Mail,
  Linkedin,
  Github,
  Instagram,
  Youtube,
  Tiktok: TiktokIcon,
};

interface FooterProps {
  socialLinks: SocialLink[];
  name: string;
}

export function Footer({ socialLinks, name }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 section-padding"
      role="contentinfo"
    >
      <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          © {currentYear} {name}. All rights reserved.
        </p>
        <ul className="flex items-center gap-4" aria-label="Social links">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon] ?? Mail;
            return (
              <li key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5" aria-hidden />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
