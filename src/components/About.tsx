import { CheckCircle2 } from 'lucide-react';
import Section from './ui/Section';
import { heroStats } from '../data/portfolio';
import { useSettings } from '../context/SettingsContext';

const About = () => {
  const { profile } = useSettings();
  return (
    <Section
      id="about"
      eyebrow="About"
      title="A practical builder with an eye for polished details."
      description="I work across frontend interfaces and backend workflows, with a bias toward clear structure, maintainable code, and web experiences clients can actually use."
    >
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-center">
        <div className="rounded-lg border border-white/10 bg-surface-raised/70 p-4 shadow-editorial backdrop-blur-md">
          <img
            src={profile.image}
            alt="Romano Lantano"
            loading="lazy"
            className="aspect-square w-full rounded-md object-cover"
          />
        </div>

        <div>
          <div className="space-y-5 text-lg leading-8 text-text-muted">
            <p>
              I build responsive web products that balance visual presentation with the less glamorous parts that make a site reliable: structure, data flow, forms, APIs, and deployment details.
            </p>
            <p>
              My work spans React, JavaScript, PHP, Node.js, and database-backed applications. The common thread is simple: make the user path clear, make the interface feel intentional, and keep the implementation understandable.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-white/10 bg-dark-bg-alt/70 p-5">
                <strong className="block text-3xl text-text-light">{stat.value}</strong>
                <span className="mt-1 block text-sm text-text-muted">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {['Frontend interfaces', 'Backend workflows', 'Responsive delivery', 'Client communication'].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-text-light">
                <CheckCircle2 size={18} className="text-highlight-green" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
