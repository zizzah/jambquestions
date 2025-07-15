import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getUserSubjects } from '@/app/lid/database/practice';
import PracticeClient from './practiceClient';

export default async function PracticePage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect('/login');
  }

  try {
    const userSubjects = await getUserSubjects(session.user.id);
    
    return <PracticeClient userSubjects={userSubjects} userId={session.user.id} />;
  } catch (error) {
    console.error('Error loading practice page:', error);
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-6 text-red-600">Error Loading Practice</h1>
          <p className="text-gray-600">
            There was an error loading your practice subjects. Please try refreshing the page or contact support if the problem persists.
          </p>
        </div>
      </div>
    );
  }
} 