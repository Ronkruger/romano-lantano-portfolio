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

interface HealthStatus {
  api: 'ok' | 'error' | 'checking';
  database: 'ok' | 'error' | 'checking';
  latency: number | null;
}

const HealthCheck = () => {
  const [health, setHealth] = useState<HealthStatus>({ api: 'checking', database: 'checking', latency: null });
  const [lastChecked, setLastChecked] = useState<string>('');

  const checkHealth = useCallback(async () => {
    setHealth({ api: 'checking', database: 'checking', latency: null });
    const start = performance.now();

    try {
      const response = await fetch('/api/health', { credentials: 'include' });
      const latency = Math.round(performance.now() - start);

      if (response.ok) {
        setHealth({ api: 'ok', database: 'ok', latency });
      } else {
        setHealth({ api: 'ok', database: 'error', latency });
      }
    } catch {
      setHealth({ api: 'error', database: 'error', latency: null });
    }

    setLastChecked(new Date().toLocaleTimeString());
  }, []);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 60_000);
    return () => clearInterval(interval);
  }, [checkHealth]);

  const statusDot = (status: 'ok' | 'error' | 'checking') => {
    if (status === 'checking') return 'bg-yellow-400 animate-pulse';
    if (status === 'ok') return 'bg-highlight-green';
    return 'bg-red-400';
  };

  const statusLabel = (status: 'ok' | 'error' | 'checking') => {
    if (status === 'checking') return 'Checking...';
    if (status === 'ok') return 'Healthy';
    return 'Unreachable';
  };

  return (
    <div className="mt-5 rounded-lg border border-white/10 bg-surface-raised/75 p-4 shadow-editorial">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-accent-primary" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-text-light">System Health</h2>
        </div>
        <button
          onClick={checkHealth}
          className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-text-muted transition hover:border-accent-primary/60 hover:text-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/70"
        >
          Refresh
        </button>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="flex items-center gap-2">
          <span className={`inline-block h-2.5 w-2.5 rounded-full ${statusDot(health.api)}`} />
          <span className="text-xs text-text-muted">API: <span className="text-text-light">{statusLabel(health.api)}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-block h-2.5 w-2.5 rounded-full ${statusDot(health.database)}`} />
          <span className="text-xs text-text-muted">Database: <span className="text-text-light">{statusLabel(health.database)}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">Latency: <span className="text-text-light">{health.latency !== null ? `${health.latency}ms` : '—'}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">Checked: <span className="text-text-light">{lastChecked || '—'}</span></span>
        </div>
      </div>
    </div>
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

        <HealthCheck />

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