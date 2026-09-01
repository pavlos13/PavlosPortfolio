import { IndexTab } from "../components/IndexTab";
import { TimelineItem } from "../components/TimelineItem";
import type { ExperienceItem } from "../types";

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="section-padding" aria-labelledby="experience-heading">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-[96px_1fr] gap-8 lg:gap-10">
        <IndexTab index="03" label="EXPERIENCE" className="hidden lg:block pt-2.5" />
        <h2 id="experience-heading" className="sr-only">
          Experience
        </h2>
        <div>
          {experiences.map((item, index) => (
            <TimelineItem key={`${item.company}-${item.dates}`} item={item} index={index} current={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
