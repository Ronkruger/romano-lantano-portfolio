import { Activity, Edit3, Eye, LogOut, Plus, Search, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  createAdminProject,
  deleteAdminProject,
  fetchAdminProjects,
  logoutAdmin,
  type ProjectFormValues,
  updateAdminProject,
} from '../api/admin';
import type { PublicProject } from '../api/projects';
import ProjectForm from '../components/admin/ProjectForm';

const emptyProject = (sortOrder: number): ProjectFormValues => ({
  slug: '',
  title: '',
  eyebrow: '',
  summary: '',
  description: '',
  imageUrl: '',
  imagePublicId: null,
  stack: ['React'],
  role: 'Full-stack developer',
  timeframe: new Date().getFullYear().toString(),
  githubUrl: '',
  demoUrl: '',
  demoAdminUrl: '',
  problem: '',
  solution: '',
  highlights: [''],
  outcome: '',
  accent: '#8fd3ff',
  sortOrder,
  featured: true,
});

const projectToFormValues = (project: PublicProject): ProjectFormValues => ({
  id: project.id,
  slug: project.slug,
  title: project.title,
  eyebrow: project.eyebrow,
  summary: project.summary,
  description: project.description,
  imageUrl: project.imageUrl ?? project.image,
  imagePublicId: project.imagePublicId,
  stack: project.stack,
  role: project.role,
  timeframe: project.timeframe,
  githubUrl: project.githubUrl ?? project.links.github,
  demoUrl: project.demoUrl ?? project.links.demo ?? '',
  demoAdminUrl: project.demoAdminUrl ?? project.links.demoAdmin ?? '',
  problem: project.problem,
  solution: project.solution,
  highlights: project.highlights,
  outcome: project.outcome,
  accent: project.accent,
  sortOrder: project.sortOrder ?? 0,
  featured: project.featured ?? true,
});

interface SystemStatus {
  database: { status: string; latency?: number };
  cloudinary: { configured: boolean; cloudName: string | null; folder: string | null };
  auth: { jwtConfigured: boolean; adminUsername: string; passwordHashSet: boolean; cookieSecure: boolean };
  environment: { nodeEnv: string; port: number; uptime: number; nodeVersion: string; memoryUsage: number };
}

const formatUptime = (seconds: number) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (days > 0) return `${days}d ${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
};

const StatusBadge = ({ ok, label }: { ok: boolean; label: string }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${ok ? 'bg-highlight-green/10 text-highlight-green' : 'bg-red-400/10 text-red-300'}`}>
    <span className={`inline-block h-2 w-2 rounded-full ${ok ? 'bg-highlight-green' : 'bg-red-400'}`} />
    {label}
  </span>
);

const SystemStatusPanel = () => {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/status', { credentials: 'include' });
      if (!response.ok) throw new Error('Failed to fetch status');
      const data = await response.json() as SystemStatus;
      setStatus(data);
    } catch {
      setError('Unable to fetch system status.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60_000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  if (loading && !status) {
    return (
      <div className="mt-8 rounded-lg border border-white/10 bg-surface-raised/75 p-6 shadow-editorial">
        <div className="animate-pulse space-y-4">
          <div className="h-5 w-40 rounded bg-white/10" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-24 rounded-lg bg-white/5" />)}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 rounded-lg border border-red-400/20 bg-red-950/20 p-5">
        <p className="text-sm text-red-200">{error}</p>
      </div>
    );
  }

  if (!status) return null;

  return (
    <section className="mt-8 rounded-lg border border-white/10 bg-surface-raised/75 p-6 shadow-editorial">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-accent-primary" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-text-light">System Status</h2>
        </div>
        <button
          onClick={fetchStatus}
          className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-text-muted transition hover:border-accent-primary/60 hover:text-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/70"
        >
          Refresh
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Database */}
        <div className="rounded-lg border border-white/10 bg-dark-bg/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Database</p>
          <div className="mt-2">
            <StatusBadge ok={status.database.status === 'connected'} label={status.database.status === 'connected' ? 'Connected' : 'Unreachable'} />
          </div>
          {status.database.latency !== undefined && (
            <p className="mt-2 text-xs text-text-muted">Latency: <span className="text-text-light">{status.database.latency}ms</span></p>
          )}
        </div>

        {/* Cloudinary */}
        <div className="rounded-lg border border-white/10 bg-dark-bg/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Cloudinary</p>
          <div className="mt-2">
            <StatusBadge ok={status.cloudinary.configured} label={status.cloudinary.configured ? 'Configured' : 'Not configured'} />
          </div>
          {status.cloudinary.cloudName && (
            <p className="mt-2 text-xs text-text-muted">Cloud: <span className="text-text-light">{status.cloudinary.cloudName}</span></p>
          )}
          {status.cloudinary.folder && (
            <p className="mt-1 text-xs text-text-muted">Folder: <span className="text-text-light">{status.cloudinary.folder}</span></p>
          )}
        </div>

        {/* Auth */}
        <div className="rounded-lg border border-white/10 bg-dark-bg/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Authentication</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <StatusBadge ok={status.auth.jwtConfigured} label={status.auth.jwtConfigured ? 'JWT OK' : 'JWT missing'} />
            <StatusBadge ok={status.auth.passwordHashSet} label={status.auth.passwordHashSet ? 'Hash set' : 'No hash'} />
          </div>
          <p className="mt-2 text-xs text-text-muted">User: <span className="text-text-light">{status.auth.adminUsername}</span></p>
          <p className="mt-1 text-xs text-text-muted">Secure cookie: <span className="text-text-light">{status.auth.cookieSecure ? 'Yes' : 'No'}</span></p>
        </div>

        {/* Environment */}
        <div className="rounded-lg border border-white/10 bg-dark-bg/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Environment</p>
          <div className="mt-2">
            <StatusBadge ok={status.environment.nodeEnv === 'production'} label={status.environment.nodeEnv} />
          </div>
          <p className="mt-2 text-xs text-text-muted">Uptime: <span className="text-text-light">{formatUptime(status.environment.uptime)}</span></p>
          <p className="mt-1 text-xs text-text-muted">Node: <span className="text-text-light">{status.environment.nodeVersion}</span></p>
          <p className="mt-1 text-xs text-text-muted">Memory: <span className="text-text-light">{status.environment.memoryUsage} MB</span></p>
        </div>
      </div>
    </section>
  );
};

const AdminProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<PublicProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [search, setSearch] = useState('');

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const nextProjects = await fetchAdminProjects();
      setProjects(nextProjects);
      return nextProjects;
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load projects.');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProjects().then((nextProjects) => {
      setSelectedProject((currentProject) => currentProject ?? emptyProject(nextProjects.length));
    });
  }, [loadProjects]);

  const filteredProjects = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    if (!searchTerm) {
      return projects;
    }

    return projects.filter((project) => `${project.title} ${project.eyebrow} ${project.stack.join(' ')}`.toLowerCase().includes(searchTerm));
  }, [projects, search]);

  const handleCreate = () => {
    setSelectedProject(emptyProject(projects.length));
    setNotice('');
    setError('');
  };

  const handleEdit = (project: PublicProject) => {
    setSelectedProject(projectToFormValues(project));
    setNotice('');
    setError('');
  };

  const handleSubmit = async (values: ProjectFormValues) => {
    setSaving(true);
    setError('');
    setNotice('');

    try {
      const savedProject = values.id ? await updateAdminProject(values.id, values) : await createAdminProject(values);
      await loadProjects();
      setSelectedProject(projectToFormValues(savedProject));
      setNotice(values.id ? 'Project updated.' : 'Project created.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (project: PublicProject) => {
    const confirmed = window.confirm(`Delete ${project.title}? This removes it from the portfolio list.`);

    if (!confirmed || !project.id) {
      return;
    }

    setError('');
    setNotice('');

    try {
      await deleteAdminProject(project.id);
      await loadProjects();
      setSelectedProject(emptyProject(Math.max(projects.length - 1, 0)));
      setNotice('Project deleted.');
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete project.');
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  return (
    <main className="relative z-10 min-h-screen px-5 py-8">
      <section className="mx-auto w-full max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-primary">Admin</p>
            <h1 className="mt-3 text-4xl font-semibold text-text-light md:text-5xl">Projects</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-text-muted">Create, edit, publish, and remove portfolio projects from one compact workspace.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-text-muted transition hover:border-highlight-blue/60 hover:text-highlight-blue focus:outline-none focus:ring-2 focus:ring-highlight-blue/70">
              <Eye size={17} aria-hidden="true" />
              View site
            </Link>
            <button onClick={handleLogout} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-text-muted transition hover:border-accent-primary/60 hover:text-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/70">
              <LogOut size={17} aria-hidden="true" />
              Sign out
            </button>
          </div>
        </header>

        {(error || notice) && (
          <div className="mt-5" aria-live="polite">
            {error && <p className="rounded-md border border-red-400/30 bg-red-950/30 px-4 py-3 text-sm text-red-200" role="alert">{error}</p>}
            {notice && <p className="rounded-md border border-accent-primary/30 bg-accent-primary/10 px-4 py-3 text-sm text-accent-primary">{notice}</p>}
          </div>
        )}

        <SystemStatusPanel />

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
          <aside className="rounded-lg border border-white/10 bg-surface-raised/75 p-5 shadow-editorial">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-stretch">
              <label className="relative flex-1">
                <span className="sr-only">Search projects</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={17} aria-hidden="true" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search projects"
                  className="min-h-11 w-full rounded-md border border-white/10 bg-dark-bg/75 py-2 pl-10 pr-3 text-sm text-text-light outline-none transition placeholder:text-text-muted/60 focus:border-accent-primary/70 focus:ring-2 focus:ring-accent-primary/20"
                />
              </label>
              <button onClick={handleCreate} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-dark-bg transition hover:bg-link-hover focus:outline-none focus:ring-2 focus:ring-accent-primary/70">
                <Plus size={17} aria-hidden="true" />
                New
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {loading && <p className="rounded-md border border-white/10 bg-dark-bg/60 px-4 py-3 text-sm text-text-muted">Loading projects...</p>}
              {!loading && filteredProjects.length === 0 && <p className="rounded-md border border-white/10 bg-dark-bg/60 px-4 py-3 text-sm text-text-muted">No projects found.</p>}
              {filteredProjects.map((project) => (
                <article key={project.slug} className="rounded-lg border border-white/10 bg-dark-bg/60 p-3 transition hover:border-accent-primary/50">
                  <div className="flex gap-3">
                    <img src={project.imageUrl ?? project.image} alt="" className="h-16 w-20 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-base font-semibold text-text-light">{project.title}</h2>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-text-muted">{project.eyebrow}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button onClick={() => handleEdit(project)} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs font-semibold text-text-light transition hover:border-highlight-blue/70 hover:text-highlight-blue focus:outline-none focus:ring-2 focus:ring-highlight-blue/70">
                          <Edit3 size={15} aria-hidden="true" />
                          Edit
                        </button>
                        <button onClick={() => void handleDelete(project)} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-red-300/20 px-3 py-2 text-xs font-semibold text-red-200 transition hover:border-red-300/60 hover:text-red-100 focus:outline-none focus:ring-2 focus:ring-red-300/50">
                          <Trash2 size={15} aria-hidden="true" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </aside>

          {selectedProject && (
            <ProjectForm
              key={selectedProject.id ?? 'create'}
              initialValues={selectedProject}
              mode={selectedProject.id ? 'edit' : 'create'}
              saving={saving}
              onCancel={handleCreate}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default AdminProjectsPage;