import { motion } from "framer-motion";
import type { ExperienceItem } from "../types";

interface TimelineItemProps {
  item: ExperienceItem;
  index: number;
}

export function TimelineItem({ item, index }: TimelineItemProps) {
  return (
    <motion.article
      className="relative pl-8 sm:pl-10 pb-10 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* vertical line */}
      <span
        className="absolute left-0 top-2 w-px h-full bg-slate-200 dark:bg-slate-700"
        aria-hidden
      />
      {/* dot */}
      <span
        className="absolute left-0 top-2 w-3 h-3 rounded-full bg-emerald-500 dark:bg-emerald-400 -translate-x-1/2"
        aria-hidden
      />

      <div className="bg-white dark:bg-slate-900/50 rounded-xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {item.role}
          </h3>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {item.dates}
          </span>
        </div>
        <p className="text-emerald-600 dark:text-emerald-400 font-medium mt-1">
          {item.company}
          {item.location && ` · ${item.location}`}
        </p>
        <ul className="mt-4 space-y-2" role="list">
          {item.achievements.map((achievement, i) => (
            <li
              key={i}
              className="flex gap-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base"
            >
              <span className="text-emerald-500 dark:text-emerald-400 mt-1.5 shrink-0">
                •
              </span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
