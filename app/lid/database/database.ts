// database.ts
import postgres from 'postgres';
import { DashboardData, Stat } from '@/app/types/dashbord';

// Database connection with better error handling
const sql = postgres(process.env.POSTGRES_URL!, { 
  ssl: 'require',
  max: 1, // Limit connections for serverless
  idle_timeout: 20,
  connect_timeout: 10,
});

// Database row types - match your actual database columns
interface UserRow {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface StatsRow {
  total_questions: number;
  correct_answers: number;
  study_time: number;
  weekly_change: number;
}

interface SubjectRow {
  id: string;
  name: string;
  icon: string;
  color: string;
  progress: number;
  questions: number;
  recent: string;
}

interface ActivityRow {
  id: string;
  action: string;
  subject: string;
  time: string;
  score: string;
  icon: string;
}

interface GoalRow {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  progress: number;
  deadline: string;
}

interface NotificationRow {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  timestamp: string;
}

interface StreakRow {
  streak: number;
}

// Main function to get dashboard data
export async function getDashboardData(userId: string): Promise<DashboardData> {
  try {
    console.log('Fetching dashboard data for user:', userId);

    // Execute all queries in parallel for better performance
    const [
      userQuery,
      statsQuery,
      subjectsQuery,
      activityQuery,
      goalsQuery,
      notificationsQuery,
      streakQuery
    ] = await Promise.all([
      sql<UserRow[]>`
        SELECT id, name, email, avatar 
        FROM users 
        WHERE id = ${userId}
      `,
      sql<StatsRow[]>`
        SELECT 
          COALESCE(total_questions, 0) as total_questions,
          COALESCE(correct_answers, 0) as correct_answers,
          COALESCE(study_time, 0) as study_time,
          COALESCE(weekly_change, 0) as weekly_change
        FROM user_user_statistics
        WHERE user_id = ${userId}
      `,
      sql<SubjectRow[]>`
        SELECT id, name, icon, color, progress, questions, recent 
        FROM subjects 
        WHERE user_id = ${userId}
        ORDER BY progress DESC
      `,
      sql<ActivityRow[]>`
        SELECT id, action, subject, time, score, icon 
        FROM activity_log
        WHERE user_id = ${userId} 
        ORDER BY time DESC 
        LIMIT 10
      `,
      sql<GoalRow[]>`
        SELECT id, title, priority, progress, deadline 
        FROM goals 
        WHERE user_id = ${userId}
        ORDER BY 
          CASE priority 
            WHEN 'high' THEN 1 
            WHEN 'medium' THEN 2 
            WHEN 'low' THEN 3 
          END,
          deadline ASC
      `,
      sql<NotificationRow[]>`
        SELECT id, message, type, timestamp 
        FROM notifications 
        WHERE user_id = ${userId}
        ORDER BY timestamp DESC
        LIMIT 5
      `,
      sql<StreakRow[]>`
        SELECT COALESCE(streak, 0) as streak
        FROM user_progress 
        WHERE user_id = ${userId}
      `
    ]);

    // Check if user exists
    if (userQuery.length === 0) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Use default values if no data exists
    const defaultStats: StatsRow = {
      total_questions: 0,
      correct_answers: 0,
      study_time: 0,
      weekly_change: 0
    };

    const statsData = statsQuery.length > 0 ? statsQuery[0] : defaultStats;

    const dashboardData: DashboardData = {
      user: userQuery[0],
      stats: formatStats(statsData),
      subjects: subjectsQuery.length > 0 ? subjectsQuery : getDefaultSubjects(),
      recentActivity: activityQuery.length > 0 ? activityQuery : getDefaultActivity(),
      upcomingGoals: goalsQuery.length > 0 ? goalsQuery : getDefaultGoals(),
      notifications: notificationsQuery.length > 0 ? notificationsQuery : [],
      currentStreak: streakQuery.length > 0 ? streakQuery[0].streak : 0
    };

    console.log('Successfully fetched dashboard data');
    return dashboardData;

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new Error(`Failed to fetch dashboard data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Helper function to format stats
function formatStats(statsRow: StatsRow): Stat[] {
  const accuracyPercent = statsRow.total_questions > 0 
    ? Math.round((statsRow.correct_answers / statsRow.total_questions) * 100)
    : 0;

  return [
    {
      icon: '📊',
      value: statsRow.total_questions.toString(),
      title: 'Total Questions',
      change: `+${statsRow.weekly_change}%`,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '✅',
      value: statsRow.correct_answers.toString(),
      title: 'Correct Answers',
      change: `${accuracyPercent}%`,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '⏱️',
      value: `${Math.round(statsRow.study_time / 60)}h`,
      title: 'Study Time',
      change: '+12%',
      color: 'from-purple-500 to-purple-600'
    }
  ];
}

// Default subjects if none exist in database
function getDefaultSubjects() {
  return [
    {
      id: 'math',
      name: 'Mathematics',
      icon: '📐',
      color: 'bg-blue-500',
      progress: 0,
      questions: 0,
      recent: 'Not started'
    },
    {
      id: 'english',
      name: 'English Language',
      icon: '📚',
      color: 'bg-green-500',
      progress: 0,
      questions: 0,
      recent: 'Not started'
    },
    {
      id: 'physics',
      name: 'Physics',
      icon: '⚡',
      color: 'bg-purple-500',
      progress: 0,
      questions: 0,
      recent: 'Not started'
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      icon: '🧪',
      color: 'bg-orange-500',
      progress: 0,
      questions: 0,
      recent: 'Not started'
    }
  ];
}

// Default activity if none exists
function getDefaultActivity() {
  return [
    {
      id: '1',
      action: 'Welcome to JAMB Prep!',
      subject: 'Getting Started',
      time: 'Just now',
      score: '0%',
      icon: '👋'
    }
  ];
}

// Default goals if none exist
function getDefaultGoals() {
  return [
    {
      id: '1',
      title: 'Complete first practice test',
      priority: 'high' as const,
      progress: 0,
      deadline: '1 week'
    },
    {
      id: '2',
      title: 'Study Mathematics basics',
      priority: 'medium' as const,
      progress: 0,
      deadline: '2 weeks'
    }
  ];
}

// Function to create initial user data (call this after user registration)
export async function createInitialUserData(userId: string) {
  try {
    console.log('Creating initial user data for:', userId);
    
    // Use a transaction to ensure all operations succeed or fail together
    await sql.begin(async (sql) => {
      // Create initial statistics
      await sql`
        INSERT INTO user_user_statistics (user_id, total_questions, correct_answers, study_time, weekly_change)
        VALUES (${userId}, 0, 0, 0, 0)
        ON CONFLICT (user_id) DO UPDATE SET
          total_questions = EXCLUDED.total_questions,
          correct_answers = EXCLUDED.correct_answers,
          study_time = EXCLUDED.study_time,
          weekly_change = EXCLUDED.weekly_change
      `;

      // Create initial progress
      await sql`
        INSERT INTO user_progress (user_id, streak)
        VALUES (${userId}, 0)
        ON CONFLICT (user_id) DO UPDATE SET
          streak = EXCLUDED.streak
      `;

      // Check if subjects already exist
      const existingSubjects = await sql`
        SELECT COUNT(*) as count FROM subjects WHERE user_id = ${userId}
      `;

      if (existingSubjects[0].count === 0) {
        // Create default subjects
        const defaultSubjects = [
          { name: 'Mathematics', icon: '📐', color: 'bg-blue-500' },
          { name: 'English Language', icon: '📚', color: 'bg-green-500' },
          { name: 'Physics', icon: '⚡', color: 'bg-purple-500' },
          { name: 'Chemistry', icon: '🧪', color: 'bg-orange-500' }
        ];

        for (const subject of defaultSubjects) {
          await sql`
            INSERT INTO subjects (user_id, name, icon, color, progress, questions, recent)
            VALUES (${userId}, ${subject.name}, ${subject.icon}, ${subject.color}, 0, 0, 'Not started')
          `;
        }
      }

      // Check if goals already exist
      const existingGoals = await sql`
        SELECT COUNT(*) as count FROM goals WHERE user_id = ${userId}
      `;

      if (existingGoals[0].count === 0) {
        // Create initial goals
        const defaultGoals = [
          { title: 'Complete first practice test', priority: 'high', progress: 0, deadline: '1 week' },
          { title: 'Study Mathematics basics', priority: 'medium', progress: 0, deadline: '2 weeks' }
        ];

        for (const goal of defaultGoals) {
          await sql`
            INSERT INTO goals (user_id, title, priority, progress, deadline)
            VALUES (${userId}, ${goal.title}, ${goal.priority}, ${goal.progress}, ${goal.deadline})
          `;
        }
      }
    });

    console.log('Initial user data created successfully for:', userId);
  } catch (error) {
    console.error('Error creating initial user data:', error);
    throw error; // Re-throw to handle in calling function
  }
}