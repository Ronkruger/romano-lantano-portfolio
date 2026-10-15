import { ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { credibilityMetrics, heroStats } from '../data/portfolio';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useSettings } from '../context/SettingsContext';

const Hero = () => {
  const { profile } = useSettings();
  const prefersReducedMotion = usePrefersReducedMotion();
  const initialState = prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 };
  const animateState = { opacity: 1, y: 0 };

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden px-5 pb-20 pt-32">
      <div className="mx-auto grid w-[90%] max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <motion.div initial={initialState} animate={animateState} transition={{ duration: 0.8, ease: 'easeOut' }}>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-primary">{profile.title}</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[1.02] text-text-light md:text-7xl lg:text-8xl">
            Romano Lantano
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text-muted md:text-xl">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/#projects"
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent-primary px-5 py-3 text-sm font-semibold text-dark-bg transition hover:-translate-y-0.5 hover:bg-link-hover focus:outline-none focus:ring-2 focus:ring-accent-primary/70"
            >
              View projects
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-text-light transition hover:-translate-y-0.5 hover:border-highlight-blue/70 hover:text-highlight-blue focus:outline-none focus:ring-2 focus:ring-highlight-blue/70"
            >
              <Download size={18} aria-hidden="true" />
              Download CV
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-muted">
            <span className="inline-flex items-center gap-2"><MapPin size={16} aria-hidden="true" /> {profile.location}</span>
            <a className="inline-flex items-center gap-2 transition hover:text-accent-primary" href={`mailto:${profile.email}`}>
              <Mail size={16} aria-hidden="true" /> {profile.email}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className="grid gap-4"
        >
          <div className="rounded-lg border border-white/10 bg-surface-raised/70 p-6 shadow-editorial backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-muted">Selected signals</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-md border border-white/10 bg-white/[0.03] p-4">
                  <strong className="block text-3xl text-text-light">{stat.value}</strong>
                  <span className="mt-1 block text-xs leading-5 text-text-muted">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {credibilityMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="rounded-lg border border-white/10 bg-dark-bg-alt/70 p-4 backdrop-blur-md">
                  <Icon size={20} className="text-accent-primary" aria-hidden="true" />
                  <p className="mt-3 text-sm leading-6 text-text-muted">{metric.label}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;