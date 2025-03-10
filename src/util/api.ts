const BASE_URL = "http://localhost:8080";

type ResourceType =
  | "aws-elb"
  | "aws-ecs"
  | "aws-rds"
  | "aws-apigw"
  | "cloudflare-pages";

export const getResourceTypeFull = (type: ResourceType) => {
  switch (type) {
    case "aws-elb":
      return "AWS ELB";
    case "aws-ecs":
      return "AWS ECS";
    case "aws-rds":
      return "AWS RDS";
    case "aws-apigw":
      return "AWS API Gateway";
    case "cloudflare-pages":
      return "Cloudflare Pages";
  }
};

export interface ProjectSnapshot {
  definition: ProjectDefinition;
  deployments: DeploymentSnapshot[];
}

interface DeploymentSnapshot {
  definition: DeploymentDefinition;
  resources: ResourceSnapshot[];
}

interface ResourceSnapshot {
  definition: ResourceDefinition;
  healthy: boolean;
  status: object;
}

interface ResourceDefinition {
  name: string;
  identifier: string;
  type: ResourceType;
}

interface DeploymentDefinition {
  name: string;
  resources: ResourceDefinition[];
}

export interface ProjectDefinition {
  name: string;
  deployments: DeploymentDefinition[];
}

interface GetProjectDefinitionsResponse {
  project: ProjectDefinition;
}

const fetchProjectDefinition = async (projectName: string) => {
  const res = await fetch(`${BASE_URL}/projects/${projectName}`);

  if (res.status !== 200) {
    throw new Error(
      "bad response for getting project definitions: " + res.status
    );
  }

  const data = await res.json();

  return data as GetProjectDefinitionsResponse;
};

interface GetProjectsResponse {
  projects: ProjectDefinition[];
}

export const fetchProjects = async () => {
  const res = await fetch(`${BASE_URL}/projects`);

  if (res.status !== 200) {
    throw new Error("bad response for getting projects: " + res.status);
  }

  const data = await res.json();

  return data as GetProjectsResponse;
};

const fetchResourceSnapshot = async (
  projectName: string,
  deploymentName: string,
  resourceName: string
) => {
  const res = await fetch(
    `${BASE_URL}/projects/${projectName}/deployments/${deploymentName}/resources/${resourceName}/snapshot`
  );

  if (res.status !== 200) {
    throw new Error("bad response for getting resource snapshot " + res.status);
  }

  const data = await res.json();

  return data as ResourceSnapshot;
};

const fetchDeploymentSnapshot = async (
  projectName: string,
  deploymentDefinition: DeploymentDefinition
): Promise<DeploymentSnapshot> => {
  const resources = await Promise.all(
    deploymentDefinition.resources.map((resource) =>
      fetchResourceSnapshot(
        projectName,
        deploymentDefinition.name,
        resource.name
      )
    )
  );

  return {
    definition: deploymentDefinition,
    resources,
  };
};

export const fetchProjectSnapshot = async (
  projectName: string
): Promise<ProjectSnapshot> => {
  const res = await fetchProjectDefinition(projectName);

  const projectDefinition = res.project;

  const deploymentSnapshots = await Promise.all(
    projectDefinition.deployments.map((deployment) =>
      fetchDeploymentSnapshot(projectDefinition.name, deployment)
    )
  );

  return {
    definition: projectDefinition,
    deployments: deploymentSnapshots,
  };
};
