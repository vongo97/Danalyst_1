import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Loading({ size = 'md', className }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn('animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600', sizeClasses[size], className)} />
  );
}

export function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loading size="lg" />
        <p className="mt-4 text-gray-600">Cargando...</p>
      </div>
    </div>
  );
}

export function LoadingButton({ children, loading, ...props }: any) {
  return (
    <button {...props} disabled={loading}>
      {loading ? <Loading size="sm" className="mr-2" /> : null}
      {children}
    </button>
  );
}