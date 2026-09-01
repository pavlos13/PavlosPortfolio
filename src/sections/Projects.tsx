import { IndexTab } from "../components/IndexTab";
import { ProjectCard } from "../components/ProjectCard";
import type { ProjectItem } from "../types";

interface ProjectsProps {
  projects: ProjectItem[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="section-padding" aria-labelledby="projects-heading">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-[96px_1fr] gap-8 lg:gap-10">
        <IndexTab index="04" label="PROJECTS" className="hidden lg:block pt-2.5" />
        <h2 id="projects-heading" className="sr-only">
          Projects
        </h2>
        <div>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isFirst={index === 0}
              isLast={index === projects.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
