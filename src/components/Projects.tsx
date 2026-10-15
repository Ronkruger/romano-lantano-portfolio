import { ArrowUpRight, Code2, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Section from './ui/Section';
import { fetchProjects, type PublicProject } from '../api/projects';

const Projects = () => {
  const [projects, setProjects] = useState<PublicProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetchProjects(controller.signal)
      .then((nextProjects) => setProjects(nextProjects))
      .catch(() => setProjects([]))
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Projects with real workflows behind the interface."
      description="Each project now links to a case-study route so the portfolio can tell a stronger story than a grid of screenshots."
      muted
    >
      {loading && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-label="Loading projects">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-96 animate-pulse rounded-lg border border-white/10 bg-surface-raised/60" />
          ))}
        </div>
      )}

      {!loading && projects.length === 0 && (
        <div className="rounded-lg border border-white/10 bg-surface-raised/60 p-6 text-text-muted">
          Projects are being updated.
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {!loading && projects.map((project) => (
          <article key={project.slug} className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-surface-raised/70 shadow-editorial transition hover:-translate-y-1 hover:border-accent-primary/50">
            <Link to={`/projects/${project.slug}`} className="block focus:outline-none focus:ring-2 focus:ring-accent-primary/70">
              <div className="relative overflow-hidden">
                <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark-bg/90 to-transparent p-4">
                  <span className="rounded-full border border-white/15 bg-dark-bg/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent-primary">
                    {project.eyebrow}
                  </span>
                </div>
              </div>
            </Link>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-2xl font-semibold leading-tight text-text-light">{project.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-text-muted">{project.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-muted">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={`/projects/${project.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-dark-bg transition hover:bg-link-hover focus:outline-none focus:ring-2 focus:ring-accent-primary/70">
                  Case study
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-text-light transition hover:border-highlight-blue/70 hover:text-highlight-blue focus:outline-none focus:ring-2 focus:ring-highlight-blue/70">
                  <Code2 size={17} aria-hidden="true" />
                  Source
                </a>
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-text-light transition hover:border-highlight-blue/70 hover:text-highlight-blue focus:outline-none focus:ring-2 focus:ring-highlight-blue/70">
                    <ExternalLink size={17} aria-hidden="true" />
                    Live
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
