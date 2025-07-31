-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (enhance existing)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar VARCHAR(500),
  subjects JSONB DEFAULT '[]',
  target_score INTEGER DEFAULT 250,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Questions table
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject VARCHAR(100) NOT NULL,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of options
  correct_answer VARCHAR(10) NOT NULL, -- A, B, C, D
  explanation TEXT,
  difficulty VARCHAR(20) DEFAULT 'medium', -- easy, medium, hard
  year INTEGER,
  topic VARCHAR(200),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Practice sessions table
CREATE TABLE practice_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_type VARCHAR(50) NOT NULL, -- 'subject_quiz', 'full_practice', 'timed_test'
  subject VARCHAR(100), -- NULL for full practice tests
  total_questions INTEGER NOT NULL,
  questions_answered INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  time_limit INTEGER, -- in minutes, NULL for untimed
  time_spent INTEGER DEFAULT 0, -- in seconds
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'completed', 'abandoned'
  score DECIMAL(5,2), -- calculated percentage
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Practice answers table (stores individual answers)
CREATE TABLE practice_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES practice_sessions(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  user_answer VARCHAR(10), -- A, B, C, D or NULL if not answered
  is_correct BOOLEAN,
  time_taken INTEGER, -- seconds spent on this question
  answered_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(session_id, question_id)
);

-- User statistics table (enhance existing)
CREATE TABLE IF NOT EXISTS user_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_questions INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  study_time INTEGER DEFAULT 0, -- in minutes
  average_score DECIMAL(5,2) DEFAULT 0,
  best_score DECIMAL(5,2) DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_practice_date DATE,
  weekly_change DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Subject statistics table
CREATE TABLE subject_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(100) NOT NULL,
  total_questions INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  average_score DECIMAL(5,2) DEFAULT 0,
  best_score DECIMAL(5,2) DEFAULT 0,
  last_practice_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, subject)
);

-- Question topics table (for better organization)
CREATE TABLE question_topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject VARCHAR(100) NOT NULL,
  topic_name VARCHAR(200) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(subject, topic_name)
);

-- Indexes for better performance
CREATE INDEX idx_questions_subject ON questions(subject);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_year ON questions(year);
CREATE INDEX idx_practice_sessions_user_id ON practice_sessions(user_id);
CREATE INDEX idx_practice_sessions_status ON practice_sessions(status);
CREATE INDEX idx_practice_answers_session_id ON practice_answers(session_id);
CREATE INDEX idx_user_statistics_user_id ON user_statistics(user_id);
CREATE INDEX idx_subject_statistics_user_id ON subject_statistics(user_id);