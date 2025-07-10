/* eslint-disable @typescript-eslint/no-unused-vars */
import bcryptjs from 'bcryptjs';
import postgres from 'postgres';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Enable UUID extension first
async function enableUUIDExtension() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  return sql`SELECT 1`;
}

// Create users table first
async function seedUsers() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      avatar VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  return sql`SELECT 1`;
}

// Fixed schema to match your dashboard queries

//-- 1. Fix user_statistics table name and columns
async function seedUserStatistics() {
  await sql`
    CREATE TABLE IF NOT EXISTS user_user_statistics (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL UNIQUE,
      total_questions INT DEFAULT 0,
      correct_answers INT DEFAULT 0,
      study_time INT DEFAULT 0, -- in minutes
      weekly_change DECIMAL(5,2) DEFAULT 0,
      average_score DECIMAL(5,2) DEFAULT 0,
      mock_exams_taken INT DEFAULT 0,
      last_activity_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  return sql`SELECT 1`;
}

//-- 2. Fix subjects table to include user_id AND progress column
async function seedSubjects() {
  await sql`
    CREATE TABLE IF NOT EXISTS subjects (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      name VARCHAR(50) NOT NULL,
      icon VARCHAR(10) NOT NULL,
      color VARCHAR(50) NOT NULL,
      description TEXT,
      progress INT DEFAULT 0,
      questions INT DEFAULT 0,
      recent VARCHAR(100) DEFAULT 'Not started',
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  return sql`SELECT 1`;
}

//-- 3. Fix user_progress table to include streak
async function seedUserProgress() {
  await sql`
    CREATE TABLE IF NOT EXISTS user_progress (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL UNIQUE,
      subject_id UUID,
      questions_answered INT DEFAULT 0,
      correct_answers INT DEFAULT 0,
      progress_percentage INT DEFAULT 0,
      streak INT DEFAULT 0,
      last_practice_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE SET NULL
    );
  `;

  return sql`SELECT 1`;
}

//-- 4. Fix goals table to match dashboard expectations
async function seedGoals() {
  await sql`
    CREATE TABLE IF NOT EXISTS goals (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      title VARCHAR(200) NOT NULL,
      description TEXT,
      target_value INT,
      current_value INT DEFAULT 0,
      progress INT DEFAULT 0, -- Match dashboard expectation
      priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
      deadline VARCHAR(50), -- Store as string like "1 week", "2 days"
      status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  return sql`SELECT 1`;
}

//5. Fix activity_log table columns
async function seedActivityLog() {
  await sql`
    CREATE TABLE IF NOT EXISTS activity_log (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      subject_id UUID,
      action TEXT NOT NULL, -- Match dashboard expectation
      subject VARCHAR(100), -- Subject name, not just ID
      activity_type VARCHAR(50),
      activity_description TEXT,
      score VARCHAR(10), -- Store as string like "85%"
      time VARCHAR(50), -- Store as string like "2 hours ago"
      icon VARCHAR(10),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  return sql`SELECT 1`;
}

// 6. Fix notifications table
async function seedNotifications() {
  await sql`
    CREATE TABLE IF NOT EXISTS notifications (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      type VARCHAR(20) NOT NULL CHECK (type IN ('info', 'warning', 'success', 'achievement', 'reminder', 'update', 'system')),
      title VARCHAR(200),
      message TEXT NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Match dashboard expectation
      is_read BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  return sql`SELECT 1`;
}

// 7. Create practice_sessions table (referenced in indexes)
async function seedPracticeSessions() {
  await sql`
    CREATE TABLE IF NOT EXISTS practice_sessions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      subject_id UUID,
      session_type VARCHAR(50) DEFAULT 'practice',
      questions_attempted INT DEFAULT 0,
      correct_answers INT DEFAULT 0,
      score DECIMAL(5,2) DEFAULT 0,
      duration_minutes INT DEFAULT 0,
      completed_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE SET NULL
    );
  `;

  return sql`SELECT 1`;
}

// 8. Create user_answers table (referenced in indexes)
async function seedUserAnswers() {
  await sql`
    CREATE TABLE IF NOT EXISTS user_answers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      question_id UUID,
      selected_answer VARCHAR(10),
      is_correct BOOLEAN DEFAULT false,
      time_taken INT DEFAULT 0, -- in seconds
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  return sql`SELECT 1`;
}

// 9. Create questions table (referenced in indexes)
async function seedQuestions() {
  await sql`
    CREATE TABLE IF NOT EXISTS questions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      subject_id UUID,
      question_text TEXT NOT NULL,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      correct_answer VARCHAR(1) NOT NULL,
      explanation TEXT,
      difficulty_level VARCHAR(20) DEFAULT 'medium',
      year INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE SET NULL
    );
  `;

  return sql`SELECT 1`;
}

async function createIndexes() {
  await sql`CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_practice_sessions_user_id ON practice_sessions(user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_user_answers_user_id ON user_answers(user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_user_answers_question_id ON user_answers(question_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON activity_log(user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_questions_subject_id ON questions(subject_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_subjects_user_id ON subjects(user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_goals_user_id ON goals(user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_user_statistics_user_id ON user_user_statistics(user_id)`;
  
  return sql`SELECT 1`;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      enableUUIDExtension(),
      seedUsers(),
      seedSubjects(), // Now includes progress column
      seedUserProgress(), 
      seedGoals(), 
      seedNotifications(), 
      seedUserStatistics(), 
      seedActivityLog(), 
      seedPracticeSessions(),
      seedUserAnswers(),
      seedQuestions(),
      createIndexes(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}