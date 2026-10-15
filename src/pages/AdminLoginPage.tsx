import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { loginAdmin } from '../api/admin';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/admin/projects';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await loginAdmin(username, password);
      navigate(from, { replace: true });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to sign in.');
    } finally {
      setSubmitting(false);
    }
  };

  if (from === '/admin/login') {
    return <Navigate to="/admin/projects" replace />;
  }

  return (
    <main className="relative z-10 flex min-h-screen items-center px-5 py-16">
      <section className="mx-auto grid w-full max-w-5xl gap-8 rounded-lg border border-white/10 bg-surface-raised/75 p-5 shadow-editorial md:grid-cols-[0.9fr_1.1fr] md:p-8">
        <div className="flex flex-col justify-between gap-8 rounded-lg border border-white/10 bg-dark-bg/60 p-5">
          <div>
            <Link to="/" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-text-muted transition hover:border-accent-primary/60 hover:text-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/70">
              <ArrowLeft size={17} aria-hidden="true" />
              Portfolio
            </Link>
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.26em] text-accent-primary">Admin access</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-text-light md:text-5xl">Project control room</h1>
            <p className="mt-5 text-base leading-7 text-text-muted">Sign in to manage the portfolio project list backed by Railway PostgreSQL.</p>
          </div>
          <div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] p-4 text-sm text-text-muted">
            <ShieldCheck size={20} className="text-accent-primary" aria-hidden="true" />
            Sessions use an httpOnly cookie.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-1 md:p-4">
          <div>
            <label htmlFor="admin-username" className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Username</label>
            <input
              id="admin-username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 min-h-11 w-full rounded-md border border-white/10 bg-dark-bg/75 px-3 py-2 text-sm text-text-light outline-none transition focus:border-accent-primary/70 focus:ring-2 focus:ring-accent-primary/20"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 min-h-11 w-full rounded-md border border-white/10 bg-dark-bg/75 px-3 py-2 text-sm text-text-light outline-none transition focus:border-accent-primary/70 focus:ring-2 focus:ring-accent-primary/20"
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="rounded-md border border-red-400/30 bg-red-950/30 px-4 py-3 text-sm text-red-200" role="alert">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-accent-primary px-5 py-3 text-sm font-semibold text-dark-bg transition hover:bg-link-hover focus:outline-none focus:ring-2 focus:ring-accent-primary/70 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </section>
    </main>
  );
};

export default AdminLoginPage;