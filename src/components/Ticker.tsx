const TICKER_ITEMS: { label: string; accent?: boolean }[] = [
  { label: "LIMASSOL · CY" },
  { label: "JAVA / SQL / REACT" },
  { label: "AMDOCS ▲ 5Y", accent: true },
  { label: "DCF · EBITDA · P/E" },
  { label: "MACRO: CPI PPI RATES OIL" },
  { label: "OPEN TO ROLES" },
  { label: "SOFTWARE × MARKETS" },
];

export function Ticker() {
  return (
    <div
      className="flex gap-6 sm:gap-10 px-4 sm:px-6 lg:px-14 py-2.5 border-b border-hair font-mono text-[11px] tracking-[0.08em] text-mist3 overflow-x-auto whitespace-nowrap"
      aria-hidden="true"
    >
      {TICKER_ITEMS.map((item) => (
        <span key={item.label} className={item.accent ? "text-accent" : undefined}>
          {item.label}
        </span>
      ))}
    </div>
  );
}
