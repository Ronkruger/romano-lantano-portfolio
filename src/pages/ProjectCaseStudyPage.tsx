import { ArrowLeft, ArrowRight, Code2, ExternalLink, Layers3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProjectBySlug, type PublicProject } from '../api/projects';
import NotFoundPage from './NotFoundPage';

interface ProjectPageData {
  project: PublicProject;
  previousProject: PublicProject | null;
  nextProject: PublicProject | null;
}

const ProjectCaseStudyPage = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState<ProjectPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    setLoading(true);
    fetchProjectBySlug(slug, controller.signal)
      .then((data) => setPageData(data))
      .catch(() => setPageData(null))
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [slug]);

  if (loading) {
    return (
      <main className="relative z-10 pt-28">
        <section className="mx-auto w-[90%] max-w-7xl px-5 py-24">
          <div className="h-96 animate-pulse rounded-lg border border-white/10 bg-surface-raised/60" />
        </section>
      </main>
    );
  }

  if (!pageData) {
    return <NotFoundPage />;
  }

  const { project, previousProject, nextProject } = pageData;

  return (
    <main className="relative z-10 pt-28">
      <section className="mx-auto grid w-[90%] max-w-7xl gap-10 px-5 pb-20 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <Link
            to="/#projects"
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-text-muted transition hover:border-accent-primary/60 hover:text-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/70"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            Back to projects
          </Link>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.28em] text-accent-primary">{project.eyebrow}</p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight text-text-light md:text-7xl">{project.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text-muted">{project.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent-primary px-5 py-3 text-sm font-semibold text-dark-bg transition hover:-translate-y-0.5 hover:bg-link-hover focus:outline-none focus:ring-2 focus:ring-accent-primary/70"
            >
              <Code2 size={18} aria-hidden="true" />
              Source
            </a>
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-highlight-blue/50 px-5 py-3 text-sm font-semibold text-highlight-blue transition hover:-translate-y-0.5 hover:border-highlight-blue hover:bg-highlight-blue hover:text-dark-bg focus:outline-none focus:ring-2 focus:ring-highlight-blue/70"
              >
                <ExternalLink size={18} aria-hidden="true" />
                Live site
              </a>
            )}
          </div>
        </div>

        <div className="relative rounded-lg border border-white/10 bg-surface-raised/70 p-3 shadow-editorial">
          <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-full border border-accent-primary/30 lg:block" />
          <img src={project.image} alt={`${project.title} preview`} className="aspect-[16/10] w-full rounded-md object-cover" />
        </div>
      </section>

      <section className="border-y border-white/10 bg-dark-bg-alt/75 py-8">
        <div className="mx-auto grid w-[90%] max-w-7xl gap-4 px-5 md:grid-cols-3">
          {[
            ['Role', project.role],
            ['Timeline', project.timeframe],
            ['Stack', project.stack.join(', ')],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-dark-bg/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">{label}</p>
              <p className="mt-2 text-base font-semibold text-text-light">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-[90%] max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.75fr_1fr]">
        <aside className="h-fit rounded-lg border border-white/10 bg-surface-raised/60 p-6">
          <div className="flex items-center gap-3 text-accent-primary">
            <Layers3 size={22} aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-[0.22em]">Project stack</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-text-muted">
                {tech}
              </span>
            ))}
          </div>
        </aside>

        <div className="space-y-12">
          <article>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-primary">Problem</p>
            <p className="mt-4 text-xl leading-9 text-text-light">{project.problem}</p>
          </article>
          <article>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-primary">Solution</p>
            <p className="mt-4 text-xl leading-9 text-text-light">{project.solution}</p>
          </article>
          <article>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-primary">Highlights</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.highlights.map((highlight) => (
                <div key={highlight} className="rounded-lg border border-white/10 bg-dark-bg-alt/70 p-4 text-text-muted">
                  {highlight}
                </div>
              ))}
            </div>
          </article>
          <article>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-primary">Outcome</p>
            <p className="mt-4 text-xl leading-9 text-text-light">{project.outcome}</p>
          </article>
        </div>
      </section>

      <section className="mx-auto grid w-[90%] max-w-7xl gap-4 px-5 pb-24 md:grid-cols-2">
        {previousProject && (
          <Link
            to={`/projects/${previousProject.slug}`}
            className="group rounded-lg border border-white/10 bg-surface-raised/60 p-5 transition hover:-translate-y-1 hover:border-accent-primary/60 focus:outline-none focus:ring-2 focus:ring-accent-primary/70"
          >
            <span className="flex items-center gap-2 text-sm text-text-muted"><ArrowLeft size={16} /> Previous</span>
            <strong className="mt-3 block text-xl text-text-light group-hover:text-accent-primary">{previousProject.title}</strong>
          </Link>
        )}
        {nextProject && (
          <Link
            to={`/projects/${nextProject.slug}`}
            className="group rounded-lg border border-white/10 bg-surface-raised/60 p-5 text-right transition hover:-translate-y-1 hover:border-accent-primary/60 focus:outline-none focus:ring-2 focus:ring-accent-primary/70"
          >
            <span className="flex items-center justify-end gap-2 text-sm text-text-muted">Next <ArrowRight size={16} /></span>
            <strong className="mt-3 block text-xl text-text-light group-hover:text-accent-primary">{nextProject.title}</strong>
          </Link>
        )}
      </section>
    </main>
  );
};

export default ProjectCaseStudyPage;