import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: unknown): State {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { hasError: true, message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <main className="relative z-10 flex min-h-screen items-center justify-center px-5" role="alert" aria-live="assertive">
          <div className="mx-auto max-w-md rounded-lg border border-white/10 bg-surface-raised/75 p-8 text-center shadow-editorial">
            <AlertTriangle className="mx-auto mb-4 text-accent-primary" size={40} aria-hidden="true" />
            <h1 className="mb-2 text-xl font-semibold text-text-light">Something went wrong</h1>
            <p className="mb-6 text-sm text-text-muted">{this.state.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent-primary px-5 py-2 text-sm font-semibold text-dark-bg transition hover:bg-link-hover focus:outline-none focus:ring-2 focus:ring-accent-primary/70"
            >
              Reload page
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
