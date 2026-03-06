import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionHeader } from "../components/SectionHeader";
import type { SkillCategory } from "../types";

interface SkillsProps {
  skillCategories: SkillCategory[];
}

export function Skills({ skillCategories }: SkillsProps) {
  return (
    <section
      id="skills"
      className="section-padding bg-white dark:bg-slate-900/30"
      aria-labelledby="skills-heading"
    >
      <div className="container-wide">
        <SectionHeader
          title="Skills"
          subtitle="Technical and beyond"
          id="skills-heading"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const cardContent = (
              <>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                  {category.name}
                </h3>
                {category.level != null && (
                  <div className="mb-3 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${category.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.08 }}
                    />
                  </div>
                )}
                <ul className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <li key={item}>
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            );
            const cardClass =
              "bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-800 block text-left w-full " +
              (category.url
                ? "hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all cursor-pointer"
                : "");
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                {category.url ? (
                  <Link to={category.url} className={cardClass} aria-label={`${category.name} – view videos`}>
                    {cardContent}
                  </Link>
                ) : (
                  <div className={cardClass}>{cardContent}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
