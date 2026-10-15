import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ScrollProgress from './ScrollProgress';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const AppShell = () => {
  const location = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (location.hash) {
      window.setTimeout(() => {
        const target = document.getElementById(location.hash.slice(1));
        target?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      }, 0);
      return;
    }

    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [location.pathname, location.hash, prefersReducedMotion]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ScrollProgress />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppShell;