import { motion } from "framer-motion";
import type { Profile } from "../types";
import { IndexTab } from "../components/IndexTab";
import { experienceYears } from "../data/profile";

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section id="hero" className="section-padding !pb-0 pt-16 sm:pt-20 lg:pt-24" aria-labelledby="hero-heading">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-[96px_1fr_420px] gap-8 lg:gap-10">
        <IndexTab index="01" label="HELLO" className="hidden lg:block pt-3.5" />

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1
            id="hero-heading"
            className="m-0 font-bold text-4xl sm:text-6xl lg:text-[6.5rem] leading-[0.9] tracking-[-0.035em] break-words"
          >
            {firstName}
            {lastName && (
              <>
                <br />
                {lastName}
              </>
            )}
          </h1>

          <div className="flex items-center gap-4 mt-7 font-mono text-[13px] tracking-[0.06em] uppercase text-mist">
            <span>{profile.title}</span>
            {profile.location && (
              <>
                <span className="w-10 h-px bg-hair2" />
                <span>{profile.location}</span>
              </>
            )}
          </div>

          <p className="mt-9 max-w-[620px] text-lg sm:text-xl leading-relaxed text-mist" style={{ textWrap: "pretty" }}>
            {profile.pitch}
          </p>

          <div className="flex flex-wrap gap-3.5 mt-10">
            <a
              href={`mailto:${profile.email}`}
              className="px-6 py-3.5 rounded-[10px] bg-accent text-accent-ink font-semibold text-[15px] hover:bg-accent-hover transition-colors"
            >
              Get in touch
            </a>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-[10px] border border-accent text-accent font-semibold text-[15px] hover:text-accent-hover hover:border-accent-hover transition-colors"
              >
                Download CV
              </a>
            )}
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="px-6 py-3.5 rounded-[10px] border border-hair2 text-ink font-medium text-[15px] font-mono hover:border-accent hover:text-accent transition-colors"
            >
              {profile.phone}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative border border-hair2 p-2.5">
            <div className="overflow-hidden">
              <img
                src={profile.photo}
                alt={`${profile.name} holding a burger`}
                className="w-full block aspect-[4/5] object-cover object-[50%_38%]"
                width={420}
                height={525}
              />
            </div>
            <div className="absolute left-[22px] top-[26px] w-[190px] pointer-events-none">
              <div className="font-script text-[28px] leading-[1.1] text-accent -rotate-[4deg] text-center">
                and a food
                <br />
                enthusiast
              </div>
              <svg viewBox="0 0 190 60" className="w-[190px] block mt-0.5" aria-hidden="true">
                <path
                  d="M34 4c-8 18 2 34 30 40 34 7 78 4 106-6"
                  fill="none"
                  stroke="#2FD87A"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M156 26c8 4 12 6 14 8-5 3-8 7-10 12"
                  fill="none"
                  stroke="#2FD87A"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-hair border border-hair border-t-0 font-mono">
            <div className="bg-bg p-4">
              <div className="text-[10px] tracking-[0.1em] text-mist3">EXPERIENCE</div>
              <div className="text-[22px] mt-1.5">{experienceYears} YRS</div>
            </div>
            <div className="bg-bg p-4">
              <div className="text-[10px] tracking-[0.1em] text-mist3">CURRENT</div>
              <div className="text-[22px] mt-1.5">AMDOCS</div>
            </div>
            <div className="bg-bg p-4">
              <div className="text-[10px] tracking-[0.1em] text-mist3">FOCUS</div>
              <div className="text-[22px] mt-1.5">JAVA/FE</div>
            </div>
            <div className="bg-bg p-4">
              <div className="text-[10px] tracking-[0.1em] text-mist3">SIDE</div>
              <div className="text-[22px] mt-1.5 text-accent">MARKETS</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
