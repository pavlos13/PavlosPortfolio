import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { IndexTab } from "../components/IndexTab";
import type { SkillCategory } from "../types";

interface SkillsProps {
  skillCategories: SkillCategory[];
}

export function Skills({ skillCategories }: SkillsProps) {
  return (
    <section id="skills" className="section-padding" aria-labelledby="skills-heading">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-[96px_1fr] gap-8 lg:gap-10">
        <IndexTab index="06" label="SKILLS" className="hidden lg:block pt-2.5" />
        <h2 id="skills-heading" className="sr-only">
          Skills
        </h2>
        <div>
          {skillCategories.map((category, index) => {
            const row = (
              <>
                <div className="font-mono text-xs text-mist2 leading-loose flex items-center gap-1.5">
                  {category.name.toUpperCase()}
                  {category.url && <ArrowUpRight className="w-3.5 h-3.5 text-accent" aria-hidden />}
                </div>
                <div className="flex flex-wrap gap-2 font-mono text-[11px] text-mist4">
                  {category.items.map((item) => (
                    <span key={item} className="border border-hair2 px-2.5 py-1.5">
                      {item}
                    </span>
                  ))}
                </div>
              </>
            );
            const rowClass = `grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-3 sm:gap-10 border-t py-6 ${
              index === 0 ? "border-hair2" : "border-hair"
            }`;
            return (
              <div key={category.name} data-reveal data-reveal-delay={String(index * 0.05)}>
                {category.url ? (
                  <Link to={category.url} className={`${rowClass} hover:border-hair2 group`} aria-label={`${category.name} – view videos`}>
                    {row}
                  </Link>
                ) : (
                  <div className={rowClass}>{row}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
