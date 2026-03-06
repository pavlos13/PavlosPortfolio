import { SectionHeader } from "../components/SectionHeader";
import { TimelineItem } from "../components/TimelineItem";
import type { ExperienceItem } from "../types";

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <section
      id="experience"
      className="section-padding bg-slate-50 dark:bg-slate-950/50"
      aria-labelledby="experience-heading"
    >
      <div className="container-narrow">
        <SectionHeader
          title="Experience"
          subtitle="Relevant work history"
          id="experience-heading"
        />
        <div className="relative">
          {experiences.map((item, index) => (
            <TimelineItem key={`${item.company}-${item.dates}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
