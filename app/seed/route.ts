import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function enableUUIDExtension() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
}

async function seedUserStatisticsForAllUsers() {
  await sql`DROP TABLE IF EXISTS user_statistics CASCADE;`;
  await sql`
    CREATE TABLE IF NOT EXISTS user_statistics (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      total_questions INT DEFAULT 0,
      correct_answers INT DEFAULT 0,
      study_time INT DEFAULT 0,
      weekly_change INT DEFAULT 0,
      average_score FLOAT DEFAULT 0,
      mock_exams_taken INT DEFAULT 0,
      last_activity_date TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  const users = await sql`SELECT id FROM users`;
  for (const user of users) {
    await sql`
      INSERT INTO user_statistics (
        user_id, total_questions, correct_answers, study_time, weekly_change, 
        average_score, mock_exams_taken, last_activity_date
      )
      VALUES (
        ${user.id},
        150, 120, 480, 15.5, 78.5, 3, CURRENT_DATE
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
  }
}

async function seedSubjectsForAllUsers() {
  await sql`DROP TABLE IF EXISTS subjects CASCADE;`;
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
  const users = await sql`SELECT id FROM users`;
  const subjects = [
    { name: 'Mathematics', icon: '📊', color: 'blue', description: 'Algebra, Geometry, Statistics', progress: 75, questions: 50, recent: 'Completed Algebra chapter' },
    { name: 'English', icon: '📝', color: 'green', description: 'Grammar, Literature, Comprehension', progress: 60, questions: 40, recent: 'Practiced essay writing' },
    { name: 'Physics', icon: '⚡', color: 'purple', description: 'Mechanics, Electricity, Waves', progress: 45, questions: 35, recent: 'Studied motion laws' },
    { name: 'Chemistry', icon: '🧪', color: 'orange', description: 'Organic, Inorganic, Physical', progress: 30, questions: 25, recent: 'Learned periodic table' }
  ];
  for (const user of users) {
    for (const subject of subjects) {
      await sql`
        INSERT INTO subjects (user_id, name, icon, color, description, progress, questions, recent)
        VALUES (
          ${user.id},
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
          recent = EXCLUDED.recent,
          updated_at = CURRENT_TIMESTAMP;
      `;
    }
  }
}

// Repeat this pattern for user_progress, goals, notifications, activity_log, etc.
// Make sure to use only columns that exist in your schema.

export async function GET(): Promise<Response> {
  try {
    await enableUUIDExtension();
    await seedUserStatisticsForAllUsers();
    await seedSubjectsForAllUsers();
    // Add similar calls for other tables here...

    return Response.json({
      message: 'Database seeded for all users (except users table itself).'
    });
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    return Response.json({
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      details: 'Database seeding failed. Check server logs for more details.'
    }, { status: 500 });
  }
}