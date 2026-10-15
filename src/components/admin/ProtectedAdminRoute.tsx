import { useEffect, useState, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { getAdminSession } from '../../api/admin';

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const location = useLocation();
  const [status, setStatus] = useState<'checking' | 'allowed' | 'denied'>('checking');

  useEffect(() => {
    let active = true;

    getAdminSession()
      .then(() => {
        if (active) {
          setStatus('allowed');
        }
      })
      .catch(() => {
        if (active) {
          setStatus('denied');
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (status === 'checking') {
    return (
      <main className="relative z-10 flex min-h-screen items-center justify-center px-5">
        <div className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-surface-raised/75 px-5 py-4 text-sm font-semibold text-text-muted shadow-editorial">
          <LoaderCircle className="animate-spin text-accent-primary" size={18} aria-hidden="true" />
          Checking admin session
        </div>
      </main>
    );
  }

  if (status === 'denied') {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedAdminRoute;