/* eslint-disable @typescript-eslint/no-unused-vars */
import { PracticeQuestion } from '../database/practice';
import { getUserSubjects } from '../database/practice';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { 
  ssl: 'require',
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});
import { getQuestionTableName } from '@/app/utils/helper';


export async function getMockQuestions() {
  try {
    const mockQuestion = await sql`
      SELECT * FROM mock_questions
    `;
    return mockQuestion;
  } catch (error) {
    console.error('Error fetching mock questions:', error);
    return [];
  }
}