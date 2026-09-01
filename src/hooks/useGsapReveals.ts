import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger } from "../lib/gsap";

export function useGsapReveals() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const delay = Number(el.dataset.revealDelay ?? 0);
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            delay,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: "clamp(top 88%)",
              once: true,
            },
          }
        );
      });
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, [pathname]);
}
