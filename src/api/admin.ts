import type { PublicProject } from './projects';

export interface AdminSession {
  username: string;
}

export interface ProjectFormValues {
  id?: string;
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  imageUrl: string;
  imagePublicId?: string | null;
  stack: string[];
  role: string;
  timeframe: string;
  githubUrl: string;
  demoUrl?: string | null;
  demoAdminUrl?: string | null;
  problem: string;
  solution: string;
  highlights: string[];
  outcome: string;
  accent: string;
  sortOrder: number;
  featured: boolean;
}

const parseErrorMessage = async (response: Response) => {
  try {
    const body = await response.json();
    return body.message ?? 'Request failed.';
  } catch {
    return 'Request failed.';
  }
};

const requestJson = async <ResponseBody>(url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    credentials: 'include',
    headers: options.body instanceof FormData ? options.headers : { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  if (response.status === 204) {
    return undefined as ResponseBody;
  }

  return response.json() as Promise<ResponseBody>;
};

const cleanProjectPayload = (values: ProjectFormValues) => ({
  slug: values.slug.trim(),
  title: values.title.trim(),
  eyebrow: values.eyebrow.trim(),
  summary: values.summary.trim(),
  description: values.description.trim(),
  imageUrl: values.imageUrl.trim(),
  imagePublicId: values.imagePublicId?.trim() || undefined,
  stack: values.stack.map((item) => item.trim()).filter(Boolean),
  role: values.role.trim(),
  timeframe: values.timeframe.trim(),
  githubUrl: values.githubUrl.trim(),
  demoUrl: values.demoUrl?.trim() || undefined,
  demoAdminUrl: values.demoAdminUrl?.trim() || undefined,
  problem: values.problem.trim(),
  solution: values.solution.trim(),
  highlights: values.highlights.map((item) => item.trim()).filter(Boolean),
  outcome: values.outcome.trim(),
  accent: values.accent.trim(),
  sortOrder: Number(values.sortOrder),
  featured: values.featured,
});

export const loginAdmin = (username: string, password: string) => {
  return requestJson<AdminSession>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
};

export const logoutAdmin = () => {
  return requestJson<void>('/api/auth/logout', { method: 'POST' });
};

export const getAdminSession = () => {
  return requestJson<AdminSession>('/api/auth/me');
};

export const fetchAdminProjects = async () => {
  const data = await requestJson<{ projects: PublicProject[] }>('/api/admin/projects');
  return data.projects;
};

export const createAdminProject = async (values: ProjectFormValues) => {
  const data = await requestJson<{ project: PublicProject }>('/api/admin/projects', {
    method: 'POST',
    body: JSON.stringify(cleanProjectPayload(values)),
  });

  return data.project;
};

export const updateAdminProject = async (id: string, values: ProjectFormValues) => {
  const data = await requestJson<{ project: PublicProject }>(`/api/admin/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(cleanProjectPayload(values)),
  });

  return data.project;
};

export const deleteAdminProject = (id: string) => {
  return requestJson<void>(`/api/admin/projects/${id}`, { method: 'DELETE' });
};

export const uploadProjectImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  return requestJson<{ imageUrl: string; imagePublicId: string }>('/api/admin/uploads', {
    method: 'POST',
    body: formData,
  });
};