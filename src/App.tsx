import { useEffect, useState } from "react";
import CheckCircleIcon from "./svg/CheckCircleIcon";
import XCircleIcon from "./svg/XCircleIcon";
import GithubIcon from "./svg/GithubIcon";
import {
  fetchProjects,
  fetchProjectSnapshot,
  getResourceTypeFull,
  ProjectDefinition,
  ProjectSnapshot,
} from "./util/api";

const ProjectCardSkeleton = () => {
  const skeletonTheme = "bg-gray-300 rounded animate-pulse";

  return (
    <div className="w-[90%] max-w-[950px]">
      <div className="shadow p-4 border-[1px] border-gray-200 rounded-xl flex flex-col gap-3">
        <div className={`${skeletonTheme} h-10 w-40`}>{/* project name */}</div>
        <div className="border-[0px] border-gray-200 rounded-xl flex flex-col gap-4">
          <div className="flex justify-between">
            <div className={`${skeletonTheme} h-9 w-30`}>
              {/* deployment name */}
            </div>
            <div className={`${skeletonTheme} h-8 w-52`}>
              {/* healthy deployment resources text */}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((_, idx) => {
              return (
                <div
                  key={idx}
                  className="shadow border-[1px] border-gray-200 rounded-xl p-3 pt-4 flex flex-col justify-between gap-3"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <div className={`${skeletonTheme} h-6 w-40`}>
                          {/* resource name */}
                        </div>
                        <div
                          className={`${skeletonTheme} rounded-full h-6 w-6`}
                        >
                          {/* healthy icon */}
                        </div>
                      </div>
                      <div className={`${skeletonTheme} h-5 w-18`}>
                        {/* resource type */}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {[1, 2].map((_, idx) => (
                        <div
                          key={idx}
                          className={`${skeletonTheme} rounded h-6 w-full flex justify-between gap-3`}
                        >
                          {/* resource attribute */}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`${skeletonTheme} h-4 w-48`}>
                    {/* resource identifier */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ name }: { name: string }) => {
  const [project, setProject] = useState<ProjectSnapshot | undefined>(
    undefined
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const projectSnapshot = await fetchProjectSnapshot(name);

        setProject(projectSnapshot);
      } catch (e) {
        console.error(e);
        setError(`Error fetching ${name} status`);
      }
    })();
  }, [name]);

  if (project === undefined) {
    return <ProjectCardSkeleton />;
  }

  if (error !== null) {
    return (
      <div className="w-[90%] max-w-[950px]">
        <div className="shadow p-4 border-[1px] border-gray-200 rounded-xl flex flex-col gap-3">
          <div className="text-3xl font-bold">{name}</div>
          <div className="border-[0px] border-gray-200 rounded-xl flex flex-col gap-4 text-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] max-w-[950px]">
      <div className="shadow p-4 border-[1px] border-gray-200 rounded-xl flex flex-col gap-3">
        <div className="text-3xl font-bold">{project.definition.name}</div>
        {project.deployments.map((deployment, idx) => {
          const numResources = deployment.resources.length;
          const numHealthyResources = deployment.resources.filter(
            (resource) => resource.healthy
          ).length;
          return (
            <div
              key={idx}
              className="border-[0px] border-gray-200 rounded-xl flex flex-col gap-4"
            >
              <div className="flex justify-between">
                <div className="text-3xl font-medium">
                  {deployment.definition.name}
                </div>
                <div className="text-2xl">
                  <span
                    className={`${
                      numHealthyResources === numResources
                        ? "text-green-600"
                        : numHealthyResources === 0
                        ? "text-red-600"
                        : "text-yellow-400"
                    }`}
                  >
                    {numHealthyResources}/{numResources}
                  </span>{" "}
                  resources healthy
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {deployment.resources.map((resource, idx) => {
                  return (
                    <div
                      key={idx}
                      className="shadow border-[1px] border-gray-200 rounded-xl p-3 flex flex-col justify-between gap-3"
                    >
                      <div className="flex flex-col gap-2">
                        <div>
                          <div className="flex justify-between">
                            <div className="text-2xl font-medium">
                              {resource.definition.name}
                            </div>
                            <div className="flex items-center">
                              {resource.healthy ? (
                                <CheckCircleIcon size={20} stroke={"#32a852"} />
                              ) : (
                                <XCircleIcon size={20} stroke={"#f54242"} />
                              )}
                            </div>
                          </div>
                          <div className="text-md">
                            {getResourceTypeFull(resource.definition.type)}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {Object.entries(resource.status)
                            .filter((entry) => typeof entry[1] !== "object")
                            .map((entry, idx) => (
                              <div
                                key={idx}
                                className="bg-gray-100 rounded-lg px-2 py-1 text-sm flex justify-between gap-3"
                              >
                                <span>{entry[0]}</span>
                                <span className="text-right font-mono">
                                  {entry[1]}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="text-xs">
                        {resource.definition.identifier}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const App = () => {
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectDefinition[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setProjectsLoading(true);
        const res = await fetchProjects();

        setProjects(res.projects);
      } catch (e) {
        console.error(e);
        setProjectsError("Error fetching projects");
      } finally {
        setProjectsLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <div className="p-2 font-medium text-lg flex justify-between">
        <div>hermes</div>
        <div>
          <a target="_blank" href="https://github.com/Brendon-Hablutzel/hermes">
            <GithubIcon size={30} />
          </a>
        </div>
      </div>
      <div className="p-4 flex justify-center h-screen">
        {projectsLoading ? (
          <ProjectCardSkeleton />
        ) : projectsError !== null ? (
          <div className="w-[90%] text-center text-lg">{projectsError}</div>
        ) : (
          projects.map((project, idx) => (
            <ProjectCard key={idx} name={project.name} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
