import { motion } from 'framer-motion';
import Section from './ui/Section';
import { timelineEvents } from '../data/portfolio';

const Timeline = () => {
  return (
    <Section
      id="timeline"
      eyebrow="Journey"
      title="The path has been project-led from the start."
      description="A concise view of the work and learning milestones behind the current portfolio."
      muted
    >
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute bottom-0 left-5 top-0 hidden w-px bg-gradient-to-b from-accent-primary via-highlight-blue to-transparent md:block" />
        <div className="space-y-5">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            return (
              <motion.article
                key={event.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="grid gap-4 rounded-lg border border-white/10 bg-surface-raised/70 p-5 shadow-lift md:grid-cols-[48px_1fr]"
              >
                <div className="grid h-11 w-11 place-items-center rounded-md border border-accent-primary/30 bg-accent-primary/10 text-accent-primary">
                  <Icon size={21} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-accent-primary">{event.year}</p>
                  <h3 className="mt-1 text-xl font-semibold text-text-light">{event.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-text-muted">{event.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Timeline;
