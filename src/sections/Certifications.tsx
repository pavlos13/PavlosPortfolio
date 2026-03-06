import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import type { CertificationItem } from "../types";

interface CertificationsProps {
  certifications: CertificationItem[];
}

export function Certifications({ certifications }: CertificationsProps) {
  if (certifications.length === 0) return null;

  return (
    <section
      id="certifications"
      className="section-padding bg-slate-50 dark:bg-slate-950/50"
      aria-labelledby="certifications-heading"
    >
      <div className="container-narrow">
        <SectionHeader title="Certifications & Awards" id="certifications-heading" />
        <div className="grid sm:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <motion.a
              key={cert.name}
              href={cert.url}
              target={cert.url ? "_blank" : undefined}
              rel={cert.url ? "noopener noreferrer" : undefined}
              className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-colors"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Award className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{cert.name}</p>
                {cert.issuer && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">{cert.issuer}</p>
                )}
                {cert.date && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">{cert.date}</p>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
