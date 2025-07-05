
'use client';

import { useRouter } from 'next/navigation';

export function QuickActions() {
  const router = useRouter();

  const handleStartPractice = () => {
    router.push('/practice');
  };

  const handleTakeMockExam = () => {
    router.push('/mock-exam');
  };

  const handleViewAnalytics = () => {
    router.push('/analytics');
  };

  const handleStudyMaterials = () => {
    router.push('/study-materials');
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
      <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button 
          onClick={handleStartPractice}
          className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:shadow-xl transition-all flex items-center justify-center"
        >
          <span className="mr-2">🚀</span>
          Start Practice Session
        </button>
        <button 
          onClick={handleTakeMockExam}
          className="w-full py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/15 transition-all flex items-center justify-center"
        >
          <span className="mr-2">📝</span>
          Take Mock Exam
        </button>
        <button 
          onClick={handleViewAnalytics}
          className="w-full py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/15 transition-all flex items-center justify-center"
        >
          <span className="mr-2">📊</span>
          View Analytics
        </button>
        <button 
          onClick={handleStudyMaterials}
          className="w-full py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/15 transition-all flex items-center justify-center"
        >
          <span className="mr-2">📚</span>
          Study Materials
        </button>
      </div>
    </div>
  );
}
