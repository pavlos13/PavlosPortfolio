import { Linkedin, Github, Instagram, Youtube } from "lucide-react";
import type { Profile, SocialLink } from "../types";
import { IndexTab } from "../components/IndexTab";

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

interface ContactProps {
  profile: Profile;
  socialLinks: SocialLink[];
}

export function Contact({ profile, socialLinks }: ContactProps) {
  return (
    <section
      id="contact"
      className="mt-16 sm:mt-24 lg:mt-32 pt-16 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-14 border-t border-hair"
      aria-labelledby="contact-heading"
    >
      <div className="container-wide grid grid-cols-1 lg:grid-cols-[96px_1fr_420px] gap-8 lg:gap-10 lg:items-end">
        <IndexTab index="08" label="CONTACT" className="hidden lg:block" />
        <div data-reveal>
          <h2 id="contact-heading" className="font-mono text-xs tracking-[0.1em] text-mist3 mb-5">
            OPEN TO SOMETHING BEYOND DEVELOPMENT
          </h2>
          <a
            href={`mailto:${profile.email}`}
            className="font-bold text-3xl sm:text-4xl lg:text-[56px] tracking-[-0.03em] text-ink hover:text-accent transition-colors break-all"
          >
            {profile.email}
          </a>
        </div>
        <div data-reveal data-reveal-delay="0.12" className="font-mono text-xs text-mist2 flex flex-col items-start lg:items-center gap-[18px] mt-8 lg:mt-0">
          <div className="flex gap-3">
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
                    className="w-11 h-11 border border-hair2 rounded-[10px] grid place-items-center text-mist hover:border-accent hover:text-accent transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="w-[19px] h-[19px]" aria-hidden />
                  </a>
                );
              })}
          </div>
          <div className="text-mist3 text-center">
            {profile.phone} · {profile.location?.toUpperCase()}
          </div>
        </div>
      </div>
    </section>
  );
}
