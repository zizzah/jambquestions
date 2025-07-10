/* eslint-disable @typescript-eslint/no-unused-vars */
import bcryptjs from 'bcryptjs';
import postgres from 'postgres';

// Type definitions for better type safety
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  created_at: Date;
  updated_at: Date;
}

interface Subject {
  id: string;
  user_id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  progress: number;
  questions: number;
  recent: string;
  is_active: boolean;
  created_at: Date;
}

interface Goal {
  id: string;
  user_id: string;
  title: string;
  description: string;
  target_value: number;
  current_value: number;
  progress: number;
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  status: 'active' | 'completed' | 'paused';
  created_at: Date;
  updated_at: Date;
}

interface Notification {
  id: string;
  user_id: string;
  type: 'info' | 'warning' | 'success' | 'achievement' | 'reminder' | 'update' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  is_read: boolean;
  created_at: Date;
}

interface ActivityLog {
  id: string;
  user_id: string;
  subject_id?: string;
  action: string;
  subject: string;
  activity_type: string;
  activity_description: string;
  score: string;
  time: string;
  icon: string;
  created_at: Date;
}

interface UserStatistics {
  id: string;
  user_id: string;
  total_questions: number;
  correct_answers: number;
  study_time: number;
  weekly_change: number;
  average_score: number;
  mock_exams_taken: number;
  last_activity_date: Date;
  created_at: Date;
  updated_at: Date;
}

interface UserProgress {
  id: string;
  user_id: string;
  subject_id?: string;
  questions_answered: number;
  correct_answers: number;
  progress_percentage: number;
  streak: number;
  last_practice_date: Date;
  created_at: Date;
  updated_at: Date;
}

interface PracticeSession {
  id: string;
  user_id: string;
  subject_id?: string;
  session_type: string;
  questions_attempted: number;
  correct_answers: number;
  score: number;
  duration_minutes: number;
  completed_at: Date;
  created_at: Date;
}

interface Question {
  id: string;
  subject_id?: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation: string;
  difficulty_level: 'easy' | 'medium' | 'hard';
  year: number;
  created_at: Date;
}

interface UserAnswer {
  id: string;
  user_id: string;
  question_id?: string;
  selected_answer: string;
  is_correct: boolean;
  time_taken: number;
  created_at: Date;
}

// Database connection with proper typing
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Login credentials for testing
const TEST_USER_CREDENTIALS = {
  email: 'kemi@example.com',
  password: 'SecurePass123!', // Plain text password for login
} as const;

// Store user ID globally for seeding relationships
let SAMPLE_USER_ID: string;

// Enable UUID extension first
async function enableUUIDExtension(): Promise<void> {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    console.log('✅ UUID extension enabled');
  } catch (error) {
    console.error('❌ Error enabling UUID extension:', error);
    throw error;
  }
}

// Drop and recreate users table with proper password hashing
async function seedUsers(): Promise<void> {
  try {
    // Drop existing table and all dependent tables (CASCADE)
    await sql`DROP TABLE IF EXISTS users CASCADE;`;
    
    // Create users table with proper constraints
    await sql`
      CREATE TABLE users (
         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  state VARCHAR(100),
  target_score VARCHAR(20),
  subjects JSONB,
  avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    // Hash the password securely
    const hashedPassword = await bcryptjs.hash(TEST_USER_CREDENTIALS.password, 12);
    
    // Insert sample user with hashed password
    const result = await sql`
      INSERT INTO users (name, email, password, avatar, created_at, updated_at)
      VALUES (
        'Kemi Adebayo',
        ${TEST_USER_CREDENTIALS.email},
        ${hashedPassword},
        '👨🏾‍🎓',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
      RETURNING id;
    `;
    
    // Store the generated user ID for use in other tables
    SAMPLE_USER_ID = result[0].id;
    
    console.log('✅ Users table seeded successfully');
    console.log(`📧 Login Email: ${TEST_USER_CREDENTIALS.email}`);
    console.log(`🔐 Login Password: ${TEST_USER_CREDENTIALS.password}`);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
}

// Add a function to insert one or two users for testing
async function seedTestUsers(): Promise<string[]> {
  const users = [
    {
      name: 'Kemi Adebayo',
      email: 'kemi@example.com',
      password: await bcryptjs.hash('SecurePass123!', 12),
      avatar: '👨🏾‍🎓',
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: await bcryptjs.hash('TestPass456!', 12),
      avatar: '👨🏻‍🎓',
    },
  ];
  const userIds: string[] = [];
  for (const user of users) {
    const result = await sql`
      INSERT INTO users (name, email, password, avatar, created_at, updated_at)
      VALUES (
        ${user.name},
        ${user.email},
        ${user.password},
        ${user.avatar},
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
      ON CONFLICT (email) DO UPDATE SET
        name = EXCLUDED.name,
        password = EXCLUDED.password,
        avatar = EXCLUDED.avatar,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id;
    `;
    userIds.push(result[0].id);
  }
  console.log('✅ Test users seeded:', users.map(u => u.email));
  return userIds;
}

// Fix user_statistics table name and columns
async function seedUserStatistics(): Promise<void> {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS user_statistics (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  total_questions INT DEFAULT 0,
  correct_answers INT DEFAULT 0,
  study_time INT DEFAULT 0,
  weekly_change INT DEFAULT 0,
  average_score FLOAT DEFAULT 0,
  mock_exams_taken INT DEFAULT 0,
  last_activity_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id)
  );
`;

    // Insert sample user statistics
    await sql`
      INSERT INTO user_statistics (
        user_id, total_questions, correct_answers, study_time, weekly_change, 
        average_score, mock_exams_taken, last_activity_date
      )
      VALUES (
        ${SAMPLE_USER_ID},
        150,
        120,
        480,
        15.5,
        78.5,
        3,
        CURRENT_DATE
      )
      ON CONFLICT (user_id) DO UPDATE SET
        total_questions = EXCLUDED.total_questions,
        correct_answers = EXCLUDED.correct_answers,
        study_time = EXCLUDED.study_time,
        weekly_change = EXCLUDED.weekly_change,
        average_score = EXCLUDED.average_score,
        mock_exams_taken = EXCLUDED.mock_exams_taken,
        last_activity_date = EXCLUDED.last_activity_date,
        updated_at = CURRENT_TIMESTAMP;
    `;

    console.log('✅ User statistics seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding user statistics:', error);
    throw error;
  }
}

// Fix subjects table to include user_id AND progress column
async function seedSubjects(): Promise<void> {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS subjects (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  icon VARCHAR(10),
  color VARCHAR(20),
  description TEXT,
  progress INT,
  questions INT,
  recent VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, name)
    );
  `;

    // Insert sample subjects
    const subjects = [
      { name: 'Mathematics', icon: '📊', color: 'blue', description: 'Algebra, Geometry, Statistics', progress: 75, questions: 50, recent: 'Completed Algebra chapter' },
      { name: 'English', icon: '📝', color: 'green', description: 'Grammar, Literature, Comprehension', progress: 60, questions: 40, recent: 'Practiced essay writing' },
      { name: 'Physics', icon: '⚡', color: 'purple', description: 'Mechanics, Electricity, Waves', progress: 45, questions: 35, recent: 'Studied motion laws' },
      { name: 'Chemistry', icon: '🧪', color: 'orange', description: 'Organic, Inorganic, Physical', progress: 30, questions: 25, recent: 'Learned periodic table' }
    ] as const;

    for (const subject of subjects) {
      await sql`
        INSERT INTO subjects (user_id, name, icon, color, description, progress, questions, recent)
        VALUES (
          ${SAMPLE_USER_ID},
          ${subject.name},
          ${subject.icon},
          ${subject.color},
          ${subject.description},
          ${subject.progress},
          ${subject.questions},
          ${subject.recent}
        )
        ON CONFLICT (user_id, name) DO UPDATE SET
          icon = EXCLUDED.icon,
          color = EXCLUDED.color,
          description = EXCLUDED.description,
          progress = EXCLUDED.progress,
          questions = EXCLUDED.questions,
          recent = EXCLUDED.recent;
      `;
    }

    console.log('✅ Subjects seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding subjects:', error);
    throw error;
  }
}

// Fix user_progress table to include streak
async function seedUserProgress(): Promise<void> {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS user_progress (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL UNIQUE,
        subject_id UUID,
        questions_answered INT DEFAULT 0 CHECK (questions_answered >= 0),
        correct_answers INT DEFAULT 0 CHECK (correct_answers >= 0),
        progress_percentage INT DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
        streak INT DEFAULT 0 CHECK (streak >= 0),
        last_practice_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE SET NULL,
        CONSTRAINT correct_answers_not_greater_than_answered CHECK (correct_answers <= questions_answered)
      );
    `;

    // Insert sample user progress
    await sql`
      INSERT INTO user_progress (
        user_id, questions_answered, correct_answers, progress_percentage, 
        streak, last_practice_date
      )
      VALUES (
        ${SAMPLE_USER_ID},
        150,
        120,
        80,
        3,
        CURRENT_DATE
      )
      ON CONFLICT (user_id) DO UPDATE SET
        questions_answered = EXCLUDED.questions_answered,
        correct_answers = EXCLUDED.correct_answers,
        progress_percentage = EXCLUDED.progress_percentage,
        streak = EXCLUDED.streak,
        last_practice_date = EXCLUDED.last_practice_date,
        updated_at = CURRENT_TIMESTAMP;
    `;

    console.log('✅ User progress seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding user progress:', error);
    throw error;
  }
}

// Fix goals table to match dashboard expectations
async function seedGoals(): Promise<void> {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS goals (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  target_value INT,
  current_value INT,
  progress INT,
  priority VARCHAR(10),
  deadline TIMESTAMP,
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

    // Insert sample goals
    const goals = [
      { title: 'Score 280 in JAMB', description: 'Achieve target score of 280 in upcoming JAMB exam', target_value: 280, current_value: 220, progress: 78, priority: 'high', deadline: '2 months', status: 'active' },
      { title: 'Complete Mathematics Syllabus', description: 'Finish all mathematics topics before exam', target_value: 100, current_value: 75, progress: 75, priority: 'high', deadline: '1 month', status: 'active' },
      { title: 'Practice 50 Questions Daily', description: 'Maintain daily practice routine', target_value: 50, current_value: 35, progress: 70, priority: 'medium', deadline: 'Daily', status: 'active' }
    ] as const;

    for (const goal of goals) {
      await sql`
        INSERT INTO goals (user_id, title, description, target_value, current_value, progress, priority, deadline, status)
        VALUES (
          ${SAMPLE_USER_ID},
          ${goal.title},
          ${goal.description},
          ${goal.target_value},
          ${goal.current_value},
          ${goal.progress},
          ${goal.priority},
          ${goal.deadline},
          ${goal.status}
        );
      `;
    }

    console.log('✅ Goals seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding goals:', error);
    throw error;
  }
}

// Fix activity_log table columns
async function seedActivityLog(): Promise<void> {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS activity_log (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        subject_id UUID,
        action TEXT NOT NULL CHECK (length(action) >= 3),
        subject VARCHAR(100),
        activity_type VARCHAR(50),
        activity_description TEXT,
        score VARCHAR(10),
        time VARCHAR(50),
        icon VARCHAR(10),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `;

    // Insert sample activity log
    const activities = [
      { action: 'Completed practice session', subject: 'Mathematics', activity_type: 'practice', activity_description: 'Solved 20 algebra questions', score: '85%', time: '2 hours ago', icon: '📊' },
      { action: 'Started new topic', subject: 'Physics', activity_type: 'study', activity_description: 'Began studying motion laws', score: '70%', time: '1 day ago', icon: '⚡' },
      { action: 'Took mock exam', subject: 'English', activity_type: 'exam', activity_description: 'Completed comprehensive test', score: '78%', time: '3 days ago', icon: '📝' }
    ] as const;

    for (const activity of activities) {
      await sql`
        INSERT INTO activity_log (user_id, action, subject, activity_type, activity_description, score, time, icon)
        VALUES (
          ${SAMPLE_USER_ID},
          ${activity.action},
          ${activity.subject},
          ${activity.activity_type},
          ${activity.activity_description},
          ${activity.score},
          ${activity.time},
          ${activity.icon}
        );
      `;
    }

    console.log('✅ Activity log seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding activity log:', error);
    throw error;
  }
}

// Fix notifications table
async function seedNotifications(): Promise<void> {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS notifications (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20),
  title VARCHAR(255),
  message TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insert sample notifications
    const notifications = [
      { type: 'achievement', title: 'Streak Milestone!', message: 'Congratulations! You have maintained a 3-day study streak.', is_read: false },
      { type: 'reminder', title: 'Daily Practice', message: 'Don\'t forget to complete your daily practice questions.', is_read: false },
      { type: 'success', title: 'Goal Progress', message: 'You\'re 78% closer to your target JAMB score!', is_read: true },
      { type: 'info', title: 'New Questions Available', message: 'Fresh practice questions have been added to Mathematics.', is_read: true }
    ] as const;

    for (const notification of notifications) {
      await sql`
        INSERT INTO notifications (user_id, type, title, message, is_read)
        VALUES (
          ${SAMPLE_USER_ID},
          ${notification.type},
          ${notification.title},
          ${notification.message},
          ${notification.is_read}
        );
      `;
    }

    console.log('✅ Notifications seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding notifications:', error);
    throw error;
  }
}

// Create practice_sessions table
async function seedPracticeSessions(): Promise<void> {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS practice_sessions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        subject_id UUID,
        session_type VARCHAR(50) DEFAULT 'practice',
        questions_attempted INT DEFAULT 0 CHECK (questions_attempted >= 0),
        correct_answers INT DEFAULT 0 CHECK (correct_answers >= 0),
        score DECIMAL(5,2) DEFAULT 0 CHECK (score >= 0 AND score <= 100),
        duration_minutes INT DEFAULT 0 CHECK (duration_minutes >= 0),
        completed_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE SET NULL,
        CONSTRAINT correct_not_greater_than_attempted CHECK (correct_answers <= questions_attempted)
      );
    `;

    // Insert sample practice session
    await sql`
      INSERT INTO practice_sessions (
        user_id, session_type, questions_attempted, correct_answers, 
        score, duration_minutes, completed_at
      )
      VALUES (
        ${SAMPLE_USER_ID},
        'practice',
        20,
        17,
        85.00,
        45,
        CURRENT_TIMESTAMP - INTERVAL '2 hours'
      );
    `;

    console.log('✅ Practice sessions seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding practice sessions:', error);
    throw error;
  }
}

// Create user_answers table
async function seedUserAnswers(): Promise<void> {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS user_answers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        question_id UUID,
        selected_answer VARCHAR(10) CHECK (selected_answer IN ('A', 'B', 'C', 'D')),
        is_correct BOOLEAN DEFAULT false,
        time_taken INT DEFAULT 0 CHECK (time_taken >= 0), -- in seconds
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `;

    // Insert sample user answer
    await sql`
      INSERT INTO user_answers (user_id, selected_answer, is_correct, time_taken)
      VALUES (
        ${SAMPLE_USER_ID},
        'A',
        true,
        45
      );
    `;

    console.log('✅ User answers seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding user answers:', error);
    throw error;
  }
}

// Create questions table
async function seedQuestions(): Promise<void> {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS questions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        subject_id UUID,
        question_text TEXT NOT NULL CHECK (length(question_text) >= 10),
        option_a TEXT NOT NULL CHECK (length(option_a) >= 1),
        option_b TEXT NOT NULL CHECK (length(option_b) >= 1),
        option_c TEXT NOT NULL CHECK (length(option_c) >= 1),
        option_d TEXT NOT NULL CHECK (length(option_d) >= 1),
        correct_answer VARCHAR(1) NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
        explanation TEXT,
        difficulty_level VARCHAR(20) DEFAULT 'medium' CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
        year INT CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM CURRENT_DATE)),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE SET NULL
      );
    `;

    // Insert sample question
    await sql`
      INSERT INTO questions (
        question_text, option_a, option_b, option_c, option_d, 
        correct_answer, explanation, difficulty_level, year
      )
      VALUES (
        'What is the square root of 144?',
        '12',
        '14',
        '16',
        '18',
        'A',
        'The square root of 144 is 12 because 12 × 12 = 144',
        'easy',
        2024
      );
    `;

    console.log('✅ Questions seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding questions:', error);
    throw error;
  }
}

// Create database indexes for performance
async function createIndexes(): Promise<void> {
  try {
    const indexes = [
      { name: 'idx_user_progress_user_id', table: 'user_progress', column: 'user_id' },
      { name: 'idx_practice_sessions_user_id', table: 'practice_sessions', column: 'user_id' },
      { name: 'idx_user_answers_user_id', table: 'user_answers', column: 'user_id' },
      { name: 'idx_user_answers_question_id', table: 'user_answers', column: 'question_id' },
      { name: 'idx_notifications_user_id', table: 'notifications', column: 'user_id' },
      { name: 'idx_activity_log_user_id', table: 'activity_log', column: 'user_id' },
      { name: 'idx_questions_subject_id', table: 'questions', column: 'subject_id' },
      { name: 'idx_subjects_user_id', table: 'subjects', column: 'user_id' },
      { name: 'idx_goals_user_id', table: 'goals', column: 'user_id' },
      { name: 'idx_user_statistics_user_id', table: 'user_statistics', column: 'user_id' }
    ];

    for (const index of indexes) {
      await sql`CREATE INDEX IF NOT EXISTS ${sql(index.name)} ON ${sql(index.table)}(${sql(index.column)})`;
    }

    console.log('✅ Database indexes created successfully');
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
    throw error;
  }
}

// Main seeding function with proper error handling and transaction safety
export async function GET(): Promise<Response> {
  try {
    console.log('🚀 Starting database seeding...');
    let userIds: string[] = [];
    await sql.begin(async (sql) => {
      await enableUUIDExtension();
      await seedUsers(); // Keep your original seedUsers for now
      userIds = await seedTestUsers(); // Add test users
    /*   SAMPLE_USER_ID = userIds[0]; // Use the first user for related seeds
      await seedSubjects();
      await seedUserProgress();
      await seedGoals();
      await seedNotifications();
      await seedUserStatistics();
      await seedActivityLog();
      await seedPracticeSessions();
      await seedUserAnswers();
      await seedQuestions();
      await createIndexes(); */
    });
    console.log('✅ Database seeded successfully!');
    return Response.json({
      message: 'Database seeded successfully with sample data',
      loginCredentials: [
        { email: 'kemi@example.com', password: 'SecurePass123!' },
        { email: 'john@example.com', password: 'TestPass456!' },
      ],
      note: 'Use these credentials to login to your application',
    });
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    return Response.json({
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      details: 'Database seeding failed. Check server logs for more details.'
    }, { status: 500 });
  }
}