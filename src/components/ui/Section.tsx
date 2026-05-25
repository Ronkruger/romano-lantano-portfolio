import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  muted?: boolean;
  centered?: boolean;
}

const Section = ({ id, eyebrow, title, description, children, className = '', muted = false, centered = false }: SectionProps) => {
  return (
    <section id={id} className={`relative overflow-hidden py-20 md:py-28 ${muted ? 'bg-dark-bg-alt/70' : ''} ${className}`}>
      <div className="relative z-10 mx-auto w-[90%] max-w-7xl px-5">
        <div className={`mb-12 max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent-primary">
              {eyebrow}
            </p>
          )}
          <h2 className="text-4xl font-semibold leading-tight text-text-light md:text-5xl">{title}</h2>
          {description && <p className="mt-4 text-base leading-7 text-text-muted md:text-lg">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;