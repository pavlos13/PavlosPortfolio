import { motion } from "framer-motion";
import { SectionHeader } from "../components/SectionHeader";

interface AboutProps {
  about: string;
}

export function About({ about }: AboutProps) {
  return (
    <section
      id="about"
      className="section-padding bg-white dark:bg-slate-900/30"
      aria-labelledby="about-heading"
    >
      <div className="container-narrow">
        <SectionHeader title="About me" id="about-heading" />
        <motion.div
          className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg">{about}</p>
        </motion.div>
      </div>
    </section>
  );
}
