
import { Activity } from "@/app/types/dashbord";

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-lg">{activity.icon}</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{activity.action}</h4>
              <p className="text-sm text-gray-300">{activity.subject} • {formatTime(activity.time)}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-400">{activity.score}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-3 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all text-center">
        View All Activity
      </button>
    </div>
  );
}