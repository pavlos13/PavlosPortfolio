import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import type { EducationItem } from "../types";

interface EducationProps {
  education: EducationItem[];
}

export function Education({ education: educationList }: EducationProps) {
  return (
    <section
      id="education"
      className="section-padding bg-slate-50 dark:bg-slate-950/50"
      aria-labelledby="education-heading"
    >
      <div className="container-narrow">
        <SectionHeader title="Education" id="education-heading" />
        <div className="space-y-8">
          {educationList.map((item, index) => (
            <motion.article
              key={`${item.institution}-${item.dates}`}
              className="bg-white dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" aria-hidden />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {item.degree}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                    {item.institution}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    {item.dates}
                    {item.grade && ` · ${item.grade}`}
                  </p>
                  {item.modules && item.modules.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Key modules:
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                        {item.modules.join(", ")}
                      </p>
                    </div>
                  )}
                  {item.projects && item.projects.length > 0 && (
                    <ul className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                      {item.projects.map((proj, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-emerald-500">•</span>
                          {proj}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
