import { SectionHeader } from "../components/SectionHeader";
import { ProjectCard } from "../components/ProjectCard";
import type { ProjectItem } from "../types";

interface ProjectsProps {
  projects: ProjectItem[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section
      id="projects"
      className="section-padding bg-white dark:bg-slate-900/30"
      aria-labelledby="projects-heading"
    >
      <div className="container-wide">
        <SectionHeader
          title="Projects"
          subtitle="Selected work and academic projects"
          id="projects-heading"
        />
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
