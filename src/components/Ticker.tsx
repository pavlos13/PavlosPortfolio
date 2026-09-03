import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap } from "../lib/gsap";

const TICKER_ITEMS: { label: string; accent?: boolean }[] = [
  { label: "LIMASSOL · CY" },
  { label: "JAVA / SQL / REACT" },
  { label: "AMDOCS ▲ 5Y", accent: true },
  { label: "DCF · EBITDA · P/E" },
  { label: "MACRO: CPI PPI RATES OIL" },
  { label: "OPEN TO ROLES" },
  { label: "NEW CHALLENGE" },
];

function TickerRow({ copy }: { copy: number }) {
  return (
    <div className="flex shrink-0 gap-6 sm:gap-10 px-4 sm:px-6 lg:px-14 py-2.5">
      {TICKER_ITEMS.map((item) => (
        <span key={`${copy}-${item.label}`} className={item.accent ? "text-accent" : undefined}>
          {item.label}
        </span>
      ))}
    </div>
  );
}

export function Ticker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 28,
      ease: "none",
      repeat: -1,
    });

    const pause = () => tween.pause();
    const play = () => tween.play();
    track.parentElement?.addEventListener("mouseenter", pause);
    track.parentElement?.addEventListener("mouseleave", play);

    return () => {
      track.parentElement?.removeEventListener("mouseenter", pause);
      track.parentElement?.removeEventListener("mouseleave", play);
      tween.kill();
      gsap.set(track, { xPercent: 0 });
    };
  }, []);

  return (
    <div
      className="overflow-hidden border-b border-hair font-mono text-[11px] tracking-[0.08em] text-mist3"
      aria-hidden="true"
    >
      <div ref={trackRef} className="flex w-max">
        <TickerRow copy={0} />
        <TickerRow copy={1} />
      </div>
    </div>
  );
}
