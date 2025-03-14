"use server";

import { Suspense } from "react";
import { fetchProjects } from "../util/api";
import ProjectCard from "./ProjectCard";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

const Projects = async () => {
  const projects = await fetchProjects();

  return (
    <div className="flex flex-col gap-5 items-center min-h-screen">
      {projects.projects.map((project, idx) => (
        <Suspense key={idx} fallback={<ProjectCardSkeleton />}>
          <ProjectCard name={project.name} />
        </Suspense>
      ))}
    </div>
  );
};
export default Projects;
