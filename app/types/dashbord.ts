// types/dashboard.ts
export interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Stat {
  icon: string;
  value: string;
  title: string;
  change: string;
  color: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  progress: number;
  questions: number;
  recent: string;
}

export interface Activity {
  id: string;
  action: string;
  subject: string;
  time: string;
  score: string;
  icon: string;
}

export interface Goal {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  progress: number;
  deadline: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  timestamp: string;
}

export interface DashboardData {
  user: UserData;
  stats: Stat[];
  subjects: Subject[];
  recentActivity: Activity[];
  upcomingGoals: Goal[];
  notifications: Notification[];
  currentStreak: number;
}