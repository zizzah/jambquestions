interface StudyStreakProps {
  currentStreak: number;
}

export default function StudyStreak({ currentStreak }: StudyStreakProps) {
  const maxWeeklyStreak = 7;
  const displayStreak = Math.min(currentStreak, maxWeeklyStreak);

  return (
    <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6">
      <div className="text-center">
        <div className="text-4xl mb-2">🔥</div>
        <h3 className="text-2xl font-bold mb-2">{currentStreak} Day Streak!</h3>
        <p className="text-sm text-gray-300 mb-4">
          {currentStreak > 0 ? "You are on fire! Keep up the great work." : "Start your study streak today!"}
        </p>
        <div className="flex justify-center space-x-1">
          {[...Array(maxWeeklyStreak)].map((_, i) => (
            <div 
              key={i}
              className={`w-6 h-6 rounded-full ${
                i < displayStreak ? 'bg-orange-500' : 'bg-white/20'
              }`}
            ></div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">This week</p>
      </div>
    </div>
  );
}