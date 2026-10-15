import { ArrowUp } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const ScrollProgress = () => {
  const scrollProgress = useScrollProgress();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <>
      <div className="fixed left-0 top-0 z-[9999] h-1 w-full bg-dark-bg-alt">
        <div
          className="h-full bg-gradient-to-r from-accent-primary via-highlight-blue to-link-hover transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {scrollProgress > 20 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })}
          className="fixed bottom-6 right-6 z-50 grid min-h-12 min-w-12 place-items-center rounded-md border border-white/10 bg-surface-raised/90 text-accent-primary shadow-editorial backdrop-blur-md transition hover:-translate-y-0.5 hover:border-accent-primary/60 hover:bg-accent-primary hover:text-dark-bg focus:outline-none focus:ring-2 focus:ring-accent-primary/70"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </button>
      )}
    </>
  );
};

export default ScrollProgress;
