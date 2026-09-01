interface IndexTabProps {
  index: string;
  label: string;
  className?: string;
}

export function IndexTab({ index, label, className = "" }: IndexTabProps) {
  return (
    <div className={`font-mono text-[11px] tracking-[0.1em] text-accent ${className}`}>
      <span>{index}</span>
      <div className="text-mist3 mt-1.5">{label}</div>
    </div>
  );
}
