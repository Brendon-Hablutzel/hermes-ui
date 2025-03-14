"use server";

import CheckCircleIcon from "../svg/CheckCircleIcon";
import XCircleIcon from "../svg/XCircleIcon";
import { fetchProjectSnapshot, getResourceTypeFull } from "../util/api";
import ProviderLogo from "../components/ProviderLogo";

const ProjectCard = async ({ name }: { name: string }) => {
  const project = await fetchProjectSnapshot(name);

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
                {deployment.resources.map((resource, idx) => (
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
                        <div className="flex justify-start items-center gap-2">
                          <div className="text-md">
                            {getResourceTypeFull(resource.definition.type)}
                          </div>
                          <ProviderLogo
                            resourceType={resource.definition.type}
                            size={20}
                          />
                        </div>
                      </div>
                      {resource.exists ? (
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
                      ) : (
                        <div>resource not found</div>
                      )}
                    </div>
                    <div className="text-xs">
                      {resource.definition.identifier}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectCard;
