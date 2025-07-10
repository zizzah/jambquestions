// app/dashboard/page.tsx
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getDashboardData } from '@/app/lid/database/database';
import { DashboardClient } from '@/app/ui/dashboard/dashboardClient';
import { DashboardErrorBoundary } from '@/app/ui/dashboard/dashboardErrorBoundary';
import { Suspense } from 'react';

// Loading component for Suspense fallback
function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      <p className="ml-4 text-lg text-gray-600">Loading dashboard...</p>
    </div>
  );
}

// Separate component for the data fetching logic
async function DashboardContent({ userId }: { userId: string }) {
  try {
    // Fetch dashboard data for the logged-in user
    const dashboardData = await getDashboardData(userId);
    
    // Pass the data to the client component
    console.log()
    return <DashboardClient data={dashboardData} />;
  } catch (error) {
    console.error('Error loading dashboard:', error);
    
    // Return error boundary component
    return <DashboardErrorBoundary error={error} />;
  }
}

export default async function DashboardPage() {
  // Get the current session
  const session = await auth();
  
  // If no session, redirect to login
  if (!session?.user?.id) {
    redirect('/login');
  }

  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent userId={session.user.id} />
    </Suspense>
  );
}