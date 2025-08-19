import postgres from 'postgres';
import {chemistry} from '@/app/lid/questions/jamb_chemistry_2000_2004';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedSubjects() {
  const insertedUsers = await Promise.all(
    chemistry.map(async (question, index) => {
      const id = index + 1; // Assuming id is sequential starting from 1
      return sql`
        INSERT INTO chemistry_questions ( question_id, year, subject, type, question, options, answer, explanation)
        VALUES (${id}, ${question.year}, ${question.subject}, ${question.type}, ${question.question}, ${JSON.stringify(question.options)}, ${question.answer}, ${question.explanation});
      `;
    }),
  );

  return insertedUsers;
}

export async function GET() {
  try {
    await sql.begin(() => [
      seedSubjects(),
    ]);

    return Response.json({ message: 'Biology Database seeded successfully' });
  } catch (error) {
    console.error('Detailed error:', error);
    return Response.json({ error }, { status: 500 });
  }
}