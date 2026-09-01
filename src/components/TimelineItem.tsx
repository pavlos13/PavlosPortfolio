import type { ExperienceItem } from "../types";

interface TimelineItemProps {
  item: ExperienceItem;
  index: number;
  current?: boolean;
}

export function TimelineItem({ item, index, current = false }: TimelineItemProps) {
  return (
    <article
      data-reveal
      data-reveal-delay={String(index * 0.08)}
      className={`grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 sm:gap-10 border-t ${
        current ? "border-hair2 py-9" : "border-hair py-7"
      }`}
    >
      <div className="font-mono text-xs text-mist2 leading-loose">
        {item.dates}
        {current && <div className="text-accent mt-2.5">● CURRENT</div>}
      </div>
      <div>
        <div className="flex items-baseline gap-4 flex-wrap">
          <h3 className={`m-0 font-semibold tracking-[-0.02em] ${current ? "text-2xl sm:text-[32px]" : "text-xl sm:text-2xl text-mist4"}`}>
            {item.company}
          </h3>
          <span className={`font-mono text-xs uppercase ${current ? "text-mist2" : "text-mist3"}`}>
            {item.role}
            {item.location && ` · ${item.location}`}
          </span>
        </div>
        {current ? (
          <ul className="mt-5 p-0 list-none flex flex-col gap-3.5 max-w-[780px]" role="list">
            {item.achievements.map((achievement, i) => (
              <li key={i} className="text-base leading-relaxed text-mist pl-5 border-l border-hair2">
                {achievement}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-3 p-0 list-none flex flex-col gap-1.5 max-w-[780px]" role="list">
            {item.achievements.map((achievement, i) => (
              <li key={i} className="text-base leading-relaxed text-mist2">
                {achievement}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
