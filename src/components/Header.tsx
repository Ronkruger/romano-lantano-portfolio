import { FileText, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems, profile } from '../data/portfolio';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = menuOpen ? 'hidden' : '';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }

    return location.pathname === '/' && location.hash === href.replace('/', '');
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-dark-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex w-[90%] max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="group flex min-h-11 items-center gap-3 focus:outline-none focus:ring-2 focus:ring-accent-primary/70">
          <span className="grid h-10 w-10 place-items-center rounded-md border border-accent-primary/40 bg-accent-primary/10 text-sm font-bold text-accent-primary transition group-hover:bg-accent-primary group-hover:text-dark-bg">
            RL
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold text-text-light">{profile.name}</span>
            <span className="block text-xs text-text-muted">Web developer</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-accent-primary/70 ${
                isActive(item.href)
                  ? 'bg-white/[0.06] text-accent-primary'
                  : 'text-text-muted hover:bg-white/[0.04] hover:text-text-light'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-text-light transition hover:border-accent-primary/70 hover:text-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/70"
          >
            <FileText size={17} aria-hidden="true" />
            CV
          </a>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-white/15 text-text-light transition hover:border-accent-primary/70 hover:text-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/70 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label="Open navigation menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={22} aria-hidden="true" />
        </button>
      </div>

      {menuOpen && (
        <>
          <button className="fixed inset-0 -z-10 bg-black/60 lg:hidden" aria-label="Close navigation menu" aria-hidden="true" tabIndex={-1} onClick={() => setMenuOpen(false)} />

          <aside
            id="mobile-navigation"
            className="fixed right-0 top-0 h-screen w-[min(88vw,360px)] border-l border-white/10 bg-dark-bg p-6 shadow-editorial transition-transform duration-300 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-text-light">Navigation</span>
              <button
                type="button"
                className="grid min-h-11 min-w-11 place-items-center rounded-md border border-white/15 text-text-light transition hover:border-accent-primary/70 hover:text-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/70"
                aria-label="Close navigation menu"
                onClick={() => setMenuOpen(false)}
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <nav className="mt-10 grid gap-2" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="rounded-md border border-white/10 px-4 py-3 text-base font-medium text-text-light transition hover:border-accent-primary/70 hover:text-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/70"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-accent-primary px-4 py-3 text-sm font-semibold text-dark-bg transition hover:bg-link-hover focus:outline-none focus:ring-2 focus:ring-accent-primary/70"
            >
              <FileText size={17} aria-hidden="true" />
              Download CV
            </a>
          </aside>
        </>
      )}
    </header>
  );
};

export default Header;
