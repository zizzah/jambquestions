/* eslint-disable @typescript-eslint/no-unused-vars */
import bcryptjs from 'bcryptjs';
import postgres from 'postgres';

import { JambEnglish3000 } from '@/app/lid/questions/jamb_english_3000';
import {jambMaths600}from '@/app/lid/questions/jamb_maths_questions';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


async function seedSubjects() {


  const insertedUsers = await Promise.all(
    jambMaths600.map(async (question) => {
      return sql`
          INSERT INTO mathematics_queations (year, subject, type, question, options, answer, explanation)
        VALUES (${question.year}, ${question.subject}, ${question.type}, ${question.question}, ${JSON.stringify(question.options)}, ${question.answer}, ${question.explanation})
        ON CONFLICT DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

/* async function seedSubjects() {
  await sql`
    CREATE TABLE IF NOT EXISTS subjects (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE,
      icon VARCHAR(10) NOT NULL,
      color VARCHAR(50) NOT NULL,
      description TEXT,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedSubjects = await Promise.all(
  subjects.map(
    (subject) => sql`
      INSERT INTO subjects (id, name, icon, color, description)
      VALUES (${subject.id}, ${subject.name}, ${subject.icon}, ${subject.color}, ${subject.description})
      ON CONFLICT (name) DO NOTHING;

      `,
    ),
  );

  return insertedSubjects;
}

async function seedQuestions() {
  await sql`
    CREATE TABLE IF NOT EXISTS questions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      subject_id UUID NOT NULL,
      question_text TEXT NOT NULL,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      correct_answer VARCHAR(1) NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
      explanation TEXT,
      difficulty_level VARCHAR(20) DEFAULT 'Medium',
      year INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedQuestions = await Promise.all(
    sampleQuestions.map(
      (question) => sql`
        INSERT INTO questions (id, subject_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, year)
        VALUES (${question.id}, ${question.subject_id}, ${question.question_text}, ${question.option_a}, ${question.option_b}, ${question.option_c}, ${question.option_d}, ${question.correct_answer}, ${question.explanation}, ${question.difficulty_level}, ${question.year})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedQuestions;
}

async function seedUserProgress() {
  await sql`
    CREATE TABLE IF NOT EXISTS user_progress (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      subject_id UUID NOT NULL,
      questions_answered INT DEFAULT 0,
      correct_answers INT DEFAULT 0,
      progress_percentage INT DEFAULT 0,
      last_practice_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, subject_id)
    );
  `;

  return sql`SELECT 1`; // Placeholder for now
}

async function seedPracticeSessions() {
  await sql`
    CREATE TABLE IF NOT EXISTS practice_sessions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      subject_id UUID NOT NULL,
      session_type VARCHAR(20) DEFAULT 'practice',
      questions_attempted INT DEFAULT 0,
      correct_answers INT DEFAULT 0,
      score_percentage DECIMAL(5,2),
      duration_minutes INT,
      started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      completed_at TIMESTAMP
    );
  `;

  return sql`SELECT 1`; // Placeholder for now
}

async function seedUserAnswers() {
  await sql`
    CREATE TABLE IF NOT EXISTS user_answers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      question_id UUID NOT NULL,
      session_id UUID,
      selected_answer VARCHAR(1) CHECK (selected_answer IN ('A', 'B', 'C', 'D')),
      is_correct BOOLEAN,
      time_taken_seconds INT,
      answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  return sql`SELECT 1`; // Placeholder for now
}

async function seedGoals() {
  await sql`
    CREATE TABLE IF NOT EXISTS goals (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      title VARCHAR(200) NOT NULL,
      description TEXT,
      target_value INT,
      current_value INT DEFAULT 0,
      progress_percentage INT DEFAULT 0,
      priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
      deadline DATE,
      status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  return sql`SELECT 1`; // Placeholder for now
}

async function seedNotifications() {
  await sql`
    CREATE TABLE IF NOT EXISTS notifications (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      type VARCHAR(20) NOT NULL CHECK (type IN ('achievement', 'reminder', 'update', 'system')),
      title VARCHAR(200),
      message TEXT NOT NULL,
      is_read BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  return sql`SELECT 1`; // Placeholder for now
}

async function seedUserStatistics() {
  await sql`
    CREATE TABLE IF NOT EXISTS user_statistics (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL UNIQUE,
      total_questions_answered INT DEFAULT 0,
      total_correct_answers INT DEFAULT 0,
      average_score DECIMAL(5,2) DEFAULT 0,
      mock_exams_taken INT DEFAULT 0,
      study_streak INT DEFAULT 0,
      last_activity_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  return sql`SELECT 1`; // Placeholder for now
}

async function seedActivityLog() {
  await sql`
    CREATE TABLE IF NOT EXISTS activity_log (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      subject_id UUID,
      activity_type VARCHAR(50) NOT NULL,
      activity_description TEXT NOT NULL,
      score_achieved DECIMAL(5,2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  return sql`SELECT 1`; // Placeholder for now
}

async function createIndexes() {
  await sql`CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_practice_sessions_user_id ON practice_sessions(user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_user_answers_user_id ON user_answers(user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_user_answers_question_id ON user_answers(question_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON activity_log(user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_questions_subject_id ON questions(subject_id)`;
  
  return sql`SELECT 1`;
}

export async function GET() {
  try {
    // Create extension once before starting any other operations
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    
    const result = await sql.begin((sql) => [
      seedSubjects(),
      seedQuestions(),
      seedUserProgress(),
      seedPracticeSessions(),
      seedUserAnswers(),
      seedGoals(),
      seedNotifications(),
      seedUserStatistics(),
      seedActivityLog(),
      createIndexes(),
    ]);

    return Response.json({ message: 'JAMB Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
} */



  export async function GET() {
  try {
    // Create extension once before starting any other operations
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    
    const result = await sql.begin((sql) => [
      seedSubjects(),
     
    ]);

    return Response.json({ message: 'JAMB Database maths seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}