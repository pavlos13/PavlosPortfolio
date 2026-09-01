import { useLayoutEffect, useRef } from "react";
import type { Profile } from "../types";
import { IndexTab } from "../components/IndexTab";
import { experienceYears } from "../data/profile";
import { gsap, prefersReducedMotion, registerGsap } from "../lib/gsap";

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");

  useLayoutEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll<HTMLElement>("[data-hero-line]");
      const ctas = root.querySelectorAll<HTMLElement>("[data-hero-cta]");
      const stats = root.querySelectorAll<HTMLElement>("[data-hero-stat]");
      const arrows = root.querySelectorAll<SVGPathElement>("[data-hero-arrow]");
      const years = root.querySelector<HTMLElement>("[data-hero-years]");

      gsap.set(lines, { yPercent: 110 });
      gsap.set("[data-hero-index]", { autoAlpha: 0, y: 12 });
      gsap.set("[data-hero-meta]", { autoAlpha: 0, x: -16 });
      gsap.set("[data-hero-pitch]", { autoAlpha: 0, y: 18 });
      gsap.set(ctas, { autoAlpha: 0, y: 14 });
      gsap.set(stats, { autoAlpha: 0, y: 12 });
      gsap.set("[data-hero-note]", { autoAlpha: 0, scale: 0.92 });
      gsap.set("[data-hero-photo-clip]", { clipPath: "inset(100% 0 0 0)" });
      gsap.set("[data-hero-photo-img]", { scale: 1.08 });

      arrows.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to("[data-hero-index]", { autoAlpha: 1, y: 0, duration: 0.45 }, 0)
        .to(lines, { yPercent: 0, duration: 0.85, stagger: 0.1, ease: "power4.out" }, 0.08)
        .to("[data-hero-meta]", { autoAlpha: 1, x: 0, duration: 0.5 }, 0.45)
        .fromTo("[data-hero-rule]", { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "power2.out" }, 0.5)
        .to("[data-hero-pitch]", { autoAlpha: 1, y: 0, duration: 0.55 }, 0.55)
        .to(ctas, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08 }, 0.7)
        .to("[data-hero-photo-clip]", { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power4.inOut" }, 0.2)
        .to("[data-hero-photo-img]", { scale: 1, duration: 1.15, ease: "power3.out" }, 0.2)
        .to(stats, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.07 }, 0.85)
        .to("[data-hero-note]", { autoAlpha: 1, scale: 1, duration: 0.5 }, 1.05)
        .to(arrows, { strokeDashoffset: 0, duration: 0.85, stagger: 0.08, ease: "power2.out" }, 1.15);

      if (years) {
        gsap.fromTo(
          years,
          { textContent: 0 },
          {
            textContent: experienceYears,
            duration: 1.1,
            ease: "power2.out",
            snap: { textContent: 1 },
            delay: 0.9,
          }
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="section-padding !pb-0 pt-16 sm:pt-20 lg:pt-24"
      aria-labelledby="hero-heading"
    >
      <div className="container-wide grid grid-cols-1 lg:grid-cols-[96px_1fr_420px] gap-8 lg:gap-10">
        <div data-hero-index className="hidden lg:block">
          <IndexTab index="01" label="HELLO" className="pt-3.5" />
        </div>

        <div>
          <h1
            id="hero-heading"
            className="m-0 font-bold text-4xl sm:text-6xl lg:text-[6.5rem] leading-[0.9] tracking-[-0.035em] break-words"
          >
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                {firstName}
              </span>
            </span>
            {lastName && (
              <span className="block overflow-hidden">
                <span data-hero-line className="block">
                  {lastName}
                </span>
              </span>
            )}
          </h1>

          <div
            data-hero-meta
            className="flex items-center gap-4 mt-7 font-mono text-[13px] tracking-[0.06em] uppercase text-mist"
          >
            <span>{profile.title}</span>
            {profile.location && (
              <>
                <span data-hero-rule className="w-10 h-px bg-hair2 origin-left" />
                <span>{profile.location}</span>
              </>
            )}
          </div>

          <p
            data-hero-pitch
            className="mt-9 max-w-[620px] text-lg sm:text-xl leading-relaxed text-mist"
            style={{ textWrap: "pretty" }}
          >
            {profile.pitch}
          </p>

          <div className="flex flex-wrap gap-3.5 mt-10">
            <a
              data-hero-cta
              href={`mailto:${profile.email}`}
              className="px-6 py-3.5 rounded-[10px] bg-accent text-accent-ink font-semibold text-[15px] hover:bg-accent-hover transition-colors"
            >
              Get in touch
            </a>
            {profile.resumeUrl && (
              <a
                data-hero-cta
                href={profile.resumeUrl}
                download="Pavlos_Konstantinou_CV.pdf"
                className="px-6 py-3.5 rounded-[10px] border border-accent text-accent font-semibold text-[15px] hover:text-accent-hover hover:border-accent-hover transition-colors"
              >
                Download CV
              </a>
            )}
            <a
              data-hero-cta
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="px-6 py-3.5 rounded-[10px] border border-hair2 text-ink font-medium text-[15px] font-mono hover:border-accent hover:text-accent transition-colors"
            >
              {profile.phone}
            </a>
          </div>
        </div>

        <div className="relative overflow-visible">
          <div
            data-hero-note
            className="relative -mb-2 -ml-2 w-[190px] pointer-events-none lg:absolute lg:-left-[148px] lg:top-6 lg:mb-0 lg:ml-0 lg:z-10 origin-center"
          >
            <div className="font-script text-[28px] leading-[1.1] text-accent -rotate-[4deg] text-center">
              and a food
              <br />
              enthusiast
            </div>
            <svg viewBox="0 0 190 72" className="w-[190px] block" aria-hidden="true">
              <path
                data-hero-arrow
                d="M96 8C118 18 158 28 186 40"
                fill="none"
                stroke="#2FD87A"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                data-hero-arrow
                d="M168 28c10 4 14 8 18 12-6 4-10 8-12 16"
                fill="none"
                stroke="#2FD87A"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="relative border border-hair2 p-2.5">
            <div data-hero-photo-clip className="overflow-hidden">
              <img
                data-hero-photo-img
                src={profile.photo}
                alt={`${profile.name} holding a burger`}
                className="w-full block aspect-[4/5] object-cover object-[50%_38%] origin-center"
                width={420}
                height={525}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-hair border border-hair border-t-0 font-mono">
            <div data-hero-stat className="bg-bg p-4">
              <div className="text-[10px] tracking-[0.1em] text-mist3">EXPERIENCE</div>
              <div className="text-[22px] mt-1.5">
                <span data-hero-years>{experienceYears}</span> YRS
              </div>
            </div>
            <div data-hero-stat className="bg-bg p-4">
              <div className="text-[10px] tracking-[0.1em] text-mist3">CURRENT</div>
              <div className="text-[22px] mt-1.5">AMDOCS</div>
            </div>
            <div data-hero-stat className="bg-bg p-4">
              <div className="text-[10px] tracking-[0.1em] text-mist3">FOCUS</div>
              <div className="text-[22px] mt-1.5">JAVA/FE</div>
            </div>
            <div data-hero-stat className="bg-bg p-4">
              <div className="text-[10px] tracking-[0.1em] text-mist3">SIDE</div>
              <div className="text-[22px] mt-1.5 text-accent">MARKETS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
