import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  id?: string;
}

export function SectionHeader({ title, subtitle, id }: SectionHeaderProps) {
  return (
    <motion.header
      className="mb-10 sm:mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 id={id} className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-lg">{subtitle}</p>
      )}
    </motion.header>
  );
}
