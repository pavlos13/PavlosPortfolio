import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import type { ProjectItem } from "../types";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      className="group bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {project.title}
        </h3>
        {project.dates && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {project.dates}
          </p>
        )}
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
              aria-label={`View live demo of ${project.title}`}
            >
              <ExternalLink className="w-4 h-4" aria-hidden />
              Live Demo
            </a>
          )}
          {project.githubUrl && project.githubUrl.startsWith("http") && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="w-4 h-4" aria-hidden />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
