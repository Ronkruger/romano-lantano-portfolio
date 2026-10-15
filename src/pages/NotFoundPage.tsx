import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main className="relative z-10 flex min-h-screen items-center pt-28">
      <section className="mx-auto w-[90%] max-w-3xl px-5 py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-primary">404</p>
        <h1 className="mt-4 text-5xl font-semibold text-text-light md:text-7xl">Page not found</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-text-muted">
          This route does not exist yet. Head back to the portfolio and keep exploring the work.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md border border-accent-primary/60 bg-accent-primary px-5 py-3 text-sm font-semibold text-dark-bg transition hover:-translate-y-0.5 hover:bg-transparent hover:text-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/70"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to home
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;