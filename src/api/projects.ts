import { getAdjacentProjects, getProjectBySlug, projects as fallbackProjects, type Project } from '../data/portfolio';

export type PublicProject = Project & {
  id?: string;
  imageUrl?: string;
  imagePublicId?: string | null;
  githubUrl?: string;
  demoUrl?: string | null;
  demoAdminUrl?: string | null;
  sortOrder?: number;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

interface ProjectsResponse {
  projects: PublicProject[];
}

interface ProjectResponse {
  project: PublicProject;
  previousProject: PublicProject | null;
  nextProject: PublicProject | null;
}

const fetchJson = async <ResponseBody>(url: string, signal?: AbortSignal) => {
  const response = await fetch(url, { credentials: 'include', signal });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return response.json() as Promise<ResponseBody>;
};

export const fetchProjects = async (signal?: AbortSignal): Promise<PublicProject[]> => {
  try {
    const data = await fetchJson<ProjectsResponse>('/api/projects', signal);
    return data.projects;
  } catch (error) {
    if (signal?.aborted) {
      throw error;
    }

    return fallbackProjects;
  }
};

export const fetchProjectBySlug = async (slug: string, signal?: AbortSignal): Promise<ProjectResponse | null> => {
  try {
    return await fetchJson<ProjectResponse>(`/api/projects/${slug}`, signal);
  } catch (error) {
    if (signal?.aborted) {
      throw error;
    }

    const project = getProjectBySlug(slug);

    if (!project) {
      return null;
    }

    const { previousProject, nextProject } = getAdjacentProjects(slug);
    return { project, previousProject, nextProject };
  }
};