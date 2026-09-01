import { motion } from "framer-motion";
import { IndexTab } from "../components/IndexTab";
import type { EducationItem } from "../types";

interface EducationProps {
  education: EducationItem[];
}

export function Education({ education: educationList }: EducationProps) {
  return (
    <section id="education" className="section-padding" aria-labelledby="education-heading">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-[96px_1fr] gap-8 lg:gap-10">
        <IndexTab index="05" label="EDUCATION" className="hidden lg:block pt-2.5" />
        <h2 id="education-heading" className="sr-only">
          Education
        </h2>
        <div>
          {educationList.map((item, index) => (
            <motion.article
              key={`${item.institution}-${item.dates}`}
              className={`grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 sm:gap-10 border-t py-7 ${
                index === 0 ? "border-hair2" : "border-hair"
              }`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="font-mono text-xs text-mist2 leading-loose">{item.dates}</div>
              <div>
                <h3 className="m-0 font-semibold text-xl sm:text-2xl tracking-[-0.02em]">{item.degree}</h3>
                <p className="mt-1.5 mb-0 font-mono text-xs uppercase text-mist2">
                  {item.institution}
                  {item.grade && ` · ${item.grade}`}
                </p>
                {item.modules && item.modules.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px] text-mist2">
                    {item.modules.map((mod) => (
                      <span key={mod} className="border border-hair2 px-2.5 py-1.5">
                        {mod}
                      </span>
                    ))}
                  </div>
                )}
                {item.projects && item.projects.length > 0 && (
                  <ul className="mt-4 p-0 list-none flex flex-col gap-1.5" role="list">
                    {item.projects.map((proj, i) => (
                      <li key={i} className="text-base leading-relaxed text-mist pl-5 border-l border-hair2">
                        {proj}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
