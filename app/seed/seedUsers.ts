import postgres from 'postgres';
import bcryptjs from 'bcryptjs';

const sql = postgres(process.env.POSTGRES_URL!, { 
  ssl: 'require',
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});

export async function seedUsers() {
  try {
    console.log('Starting to seed users table...');

    // Drop existing users table
    await sql`DROP TABLE IF EXISTS users CASCADE`;
    console.log('Dropped existing users table');

    // Create new users table with all required columns
    await sql`
      CREATE TABLE users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        state VARCHAR(100),
        avatar VARCHAR(10) DEFAULT '👨🏾‍🎓',
        target_score INTEGER DEFAULT 280,
        subjects JSONB DEFAULT '[]',
        current_level VARCHAR(50) DEFAULT 'Beginner',
        join_date TIMESTAMP DEFAULT CURRENT_DATE,
        current_streak INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('Created new users table');

    // Create index on email for faster lookups
    await sql`CREATE INDEX idx_users_email ON users(email)`;
    console.log('Created email index');

    // Generate hash for a known password
    const knownPassword = 'password123'; // You can change this to any password you want
    const hashedPassword = await bcryptjs.hash(knownPassword, 10);
    console.log(`Using password: ${knownPassword}`);

    // Seed with initial user data
    await sql`
      INSERT INTO users (
        id,
        name,
        email,
        password,
        phone,
        state,
        avatar,
        target_score,
        subjects,
        current_level,
        join_date,
        current_streak,
        created_at,
        updated_at
      ) VALUES (
        '3958dc9e-712f-4377-85e9-fec4b6a6442b',
        'Kemi Adebayo',
        'kemi@example.com',
        ${hashedPassword},
        '+234-801-234-5678',
        'Lagos',
        '👨🏾‍🎓',
        280,
        ${JSON.stringify(["Mathematics", "English", "Physics", "Chemistry"])},
        'Beginner',
        '2025-05-31 23:00:00',
        3,
        '2025-06-01 03:38:30.834',
        '2025-06-01 03:38:30.834'
      )
    `;
    console.log('Seeded initial user data');

    // Verify the seeded data
    const users = await sql`SELECT * FROM users`;
    console.log('Verification - Users count:', users.length);
    console.log('Seeded user:', users[0]);

    return {
      success: true,
      message: 'Users table recreated and seeded successfully',
      usersCount: users.length
    };

  } catch (error) {
    console.error('Error seeding users table:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to seed users table'
    };
  }
}