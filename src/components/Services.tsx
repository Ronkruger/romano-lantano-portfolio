import { CheckCircle2 } from 'lucide-react';
import Section from './ui/Section';
import { services } from '../data/portfolio';

const Services = () => {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Focused support from interface to launch."
      description="The work is scoped around practical outcomes: build the thing, make it coherent, and make sure it is ready for users."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article key={service.title} className="rounded-lg border border-white/10 bg-surface-raised/70 p-6 shadow-editorial">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-highlight-blue/10 text-highlight-blue">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-text-light">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-text-muted">{service.description}</p>
              <ul className="mt-6 grid gap-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-text-muted">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-highlight-green" size={17} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Section>
  );
};

export default Services;
