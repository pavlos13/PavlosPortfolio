import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import type { ProjectItem } from "../types";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}

export function ProjectCard({ project, index, isFirst, isLast }: ProjectCardProps) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      className={`grid grid-cols-1 sm:grid-cols-[60px_1fr] lg:grid-cols-[60px_1fr_240px] gap-3 lg:gap-8 items-start border-t py-7 ${
        isFirst ? "border-hair2" : "border-hair"
      } ${isLast ? "border-b border-hair" : ""}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <div className={`font-mono text-xs ${isFirst ? "text-accent" : "text-mist3"}`}>/{num}</div>
      <div>
        <h3 className="m-0 mb-3 font-semibold text-xl sm:text-[30px] tracking-[-0.02em]">{project.title}</h3>
        <p className="m-0 mb-4 text-base leading-relaxed text-mist max-w-[620px]">{project.description}</p>
        <div className="flex flex-wrap gap-2 font-mono text-[11px] text-mist2">
          {project.techStack.map((tech) => (
            <span key={tech} className="border border-hair2 px-2.5 py-1.5">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="font-mono text-[11px] text-mist3 flex sm:flex-col sm:items-end gap-x-4 gap-y-1.5 sm:text-right">
        {project.dates && <span>{project.dates.toUpperCase()}</span>}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent">
            LIVE <ExternalLink className="w-3 h-3" aria-hidden />
          </a>
        )}
        {project.githubUrl && project.githubUrl.startsWith("http") && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent">
            GITHUB <Github className="w-3 h-3" aria-hidden />
          </a>
        )}
      </div>
    </motion.article>
  );
}
