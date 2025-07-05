// app/dashboard/page.tsx
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getDashboardData } from '@/app/lid/database/database';
import { DashboardClient } from '@/app/ui/dashboard/dashboardClient';
import { DashboardErrorBoundary } from '@/app/ui/dashboard/dashboardErrorBoundary';
export default async function DashboardPage() {
  // Get the current session
  const session = await auth();
  
  // If no session, redirect to login
  if (!session?.user?.id) {
    redirect('/login');
  }

  try {
    // Fetch dashboard data for the logged-in user
    const dashboardData = await getDashboardData(session.user.id);
    
    // Pass the data to the client component
    return <DashboardClient data={dashboardData} />;
  } catch (error) {
    console.error('Error loading dashboard:', error);
    
    // Return a server component instead of using onClick
    return <DashboardErrorBoundary error={error} />;
  }
}