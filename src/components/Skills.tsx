import Section from './ui/Section';
import { skillGroups } from '../data/portfolio';

const Skills = () => {
  return (
    <Section
      id="skills"
      eyebrow="Capabilities"
      title="A stack shaped around shipping useful web products."
      description="Instead of percentage bars, the skills are grouped by how they show up in actual project work."
      muted
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {skillGroups.map((group) => {
          const Icon = group.icon;
          return (
            <article key={group.title} className="rounded-lg border border-white/10 bg-surface-raised/70 p-6 shadow-lift transition hover:-translate-y-1 hover:border-accent-primary/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-md border border-accent-primary/30 bg-accent-primary/10 text-accent-primary">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-text-light">{group.title}</h3>
              <p className="mt-3 text-sm leading-7 text-text-muted">{group.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-text-muted">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
};

export default Skills;
