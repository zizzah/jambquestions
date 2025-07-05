

import { Goal } from "@/app/types/dashbord";
interface GoalsSectionProps {
  goals: Goal[];
}

export function GoalsSection({ goals }: GoalsSectionProps) {
  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
      <h3 className="text-lg font-bold mb-4">Current Goals</h3>
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm">{goal.title}</h4>
              <span className={`text-xs px-2 py-1 rounded-full ${
                goal.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                goal.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-green-500/20 text-green-300'
              }`}>
                {goal.priority}
              </span>
            </div>
            <div className="mb-2">
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">{goal.progress}% complete</span>
              <span className="text-gray-400">{formatDeadline(goal.deadline)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}