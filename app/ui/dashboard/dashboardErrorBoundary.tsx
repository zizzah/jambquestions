'use client';

import { useRouter } from 'next/navigation';

interface DashboardErrorBoundaryProps {
  error: unknown;
}

export function DashboardErrorBoundary({ error }: DashboardErrorBoundaryProps) {
  const router = useRouter();

  const handleRetry = () => {
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Unable to load dashboard</h1>
          <p className="text-gray-300 mb-6">
            There was an error loading your dashboard data. This might be due to missing database tables or configuration issues.
          </p>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={handleRetry}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Retry Loading
          </button>
          
          <button 
            onClick={() => router.push('/login')}
            className="w-full px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Back to Login
          </button>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-400 hover:text-white">
              Show Error Details
            </summary>
            <pre className="mt-2 text-xs bg-black/20 p-4 rounded-lg overflow-auto text-red-300">
              {error instanceof Error ? error.message : String(error)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}