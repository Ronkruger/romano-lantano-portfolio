import { Suspense, lazy, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import AppShell from './components/AppShell';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProjectCaseStudyPage from './pages/ProjectCaseStudyPage';

const ThreeBackground = lazy(() => import('./components/ThreeBackground'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const AdminProjectsPage = lazy(() => import('./pages/AdminProjectsPage'));

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingScreen onLoadingComplete={() => setLoading(false)} />;
  }

  return (
    <ErrorBoundary>
      <Toaster position="top-center" />
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>

      <Routes>
        <Route path="admin/login" element={<Suspense fallback={null}><AdminLoginPage /></Suspense>} />
        <Route
          path="admin/projects"
          element={(
            <ProtectedAdminRoute>
              <Suspense fallback={null}>
                <AdminProjectsPage />
              </Suspense>
            </ProtectedAdminRoute>
          )}
        />
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="projects/:slug" element={<ProjectCaseStudyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
