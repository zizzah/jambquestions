/* eslint-disable @typescript-eslint/no-unused-vars */
import bcryptjs from 'bcryptjs';
import postgres from 'postgres';
import { jambGovernment } from '@/app/lid/questions/government';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


async function seedSubject() {
  await sql`
     CREATE TABLE IF NOT EXISTS government_queations (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      year TEXT NOT NULL,
      subject VARCHAR(255) NOT NULL,
      type TEXT NOT NULL,   
      question TEXT NOT NULL,
      options JSONB NOT NULL,
      answer TEXT NOT NULL,
      explanation TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedUsers = await Promise.all(
    jambGovernment.map(async (question) => {
      return sql`
          INSERT INTO government_queations (year, subject, type, question, options, answer, explanation)
        VALUES (${question.year}, ${question.subject}, ${question.type}, ${question.question}, ${JSON.stringify(question.options)}, ${question.answer}, ${question.explanation})
        ON CONFLICT DO NOTHING;
      `;
    }),
  );
  console.log(insertedUsers)
  return insertedUsers;
}




  export async function GET() {
      try {
        // Create extension once before starting any other operations
        await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      
        const result = await sql.begin((sql) => [
       // seedUsers(),
       seedSubject(),
      /*     seedSubjects(),
          seedQuestions(),
          seedUserProgress(),
          seedPracticeSessions(),
          seedUserAnswers(),
          seedGoals(),
          seedNotifications(),
          seedUserStatistics(),
          seedActivityLog(),
          createIndexes(), */
        ]);
  
        return Response.json({ message: 'JAMB Database Government seeded successfully' });

      } catch (error) {
        return Response.json({ error }, { status: 500 });
      }
    }