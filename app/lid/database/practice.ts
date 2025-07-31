// practice.ts - Database functions for practice mode
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { 
  ssl: 'require',
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});
import { getQuestionTableName } from '@/app/utils/helper';
// Updated mapping from user subject names to database table names


// Subject configuration for UI
const subjectConfigs: { [key: string]: { icon: string; color: string; bgColor: string; displayName: string } } = {
  'english': { icon: '📚', color: 'text-green-600', bgColor: 'bg-green-500', displayName: 'English Language' },
  'mathematics': { icon: '📐', color: 'text-blue-600', bgColor: 'bg-blue-500', displayName: 'Mathematics' },
  'physics': { icon: '⚡', color: 'text-purple-600', bgColor: 'bg-purple-500', displayName: 'Physics' },
  'chemistry': { icon: '🧪', color: 'text-orange-600', bgColor: 'bg-orange-500', displayName: 'Chemistry' },
  'biology': { icon: '🧬', color: 'text-teal-600', bgColor: 'bg-teal-500', displayName: 'Biology' },
  'economics': { icon: '💰', color: 'text-yellow-600', bgColor: 'bg-yellow-500', displayName: 'Economics' },
  'government': { icon: '⚖️', color: 'text-red-600', bgColor: 'bg-red-500', displayName: 'Government' },
  'literature': { icon: '📖', color: 'text-pink-600', bgColor: 'bg-pink-500', displayName: 'Literature' },
  'geography': { icon: '🌍', color: 'text-indigo-600', bgColor: 'bg-indigo-500', displayName: 'Geography' },
  'commerce': { icon: '💼', color: 'text-gray-600', bgColor: 'bg-gray-500', displayName: 'Commerce' },
  'accounting': { icon: '📊', color: 'text-emerald-600', bgColor: 'bg-emerald-500', displayName: 'Accounting' },
  'agricultural_science': { icon: '🌾', color: 'text-lime-600', bgColor: 'bg-lime-500', displayName: 'Agricultural Science' },
  'civic_education': { icon: '🏛️', color: 'text-cyan-600', bgColor: 'bg-cyan-500', displayName: 'Civic Education' },
  'computer_studies': { icon: '💻', color: 'text-slate-600', bgColor: 'bg-slate-500', displayName: 'Computer Studies' },
  'crk': { icon: '✝️', color: 'text-blue-600', bgColor: 'bg-blue-500', displayName: 'Christian Religious Knowledge' },
  'irk': { icon: '☪️', color: 'text-green-600', bgColor: 'bg-green-500', displayName: 'Islamic Religious Knowledge' },
  'hausa': { icon: '📝', color: 'text-orange-600', bgColor: 'bg-orange-500', displayName: 'Hausa' },
  'igbo': { icon: '📝', color: 'text-green-600', bgColor: 'bg-green-500', displayName: 'Igbo' },
  'yoruba': { icon: '📝', color: 'text-yellow-600', bgColor: 'bg-yellow-500', displayName: 'Yoruba' }
};

export interface PracticeQuestion {
  id: string;
  year: number;
  subject: string;
  type: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: string;
  explanation: string;
}

export interface UserSubject {
  name: string;
  displayName: string;
  icon: string;
  color: string;
  bgColor: string;
  questionCount: number;
}

export interface PracticeSession {
  id: string;
  userId: string;
  subject: string;
  questions: PracticeQuestion[];
  currentQuestionIndex: number;
  score: number;
  totalQuestions: number;
  startTime: Date;
  endTime?: Date;
}

// Helper function to parse options from different formats
function parseOptions(options: string | { [key: string]: unknown }): { A: string; B: string; C: string; D: string } {
  if (typeof options === 'string') {
    try {
      return JSON.parse(options);
    } catch {
      return { A: 'Option A', B: 'Option B', C: 'Option C', D: 'Option D' };
    }
  }
  
  if (typeof options === 'object' && options !== null) {
    const obj = options as Record<string, unknown>;
    return {
      A: typeof obj.A === 'string' ? obj.A : 'Option A',
      B: typeof obj.B === 'string' ? obj.B : 'Option B',
      C: typeof obj.C === 'string' ? obj.C : 'Option C',
      D: typeof obj.D === 'string' ? obj.D : 'Option D'
    };
  }
  
  return { A: 'Option A', B: 'Option B', C: 'Option C', D: 'Option D' };
}
// Get user's selected subjects with question counts
export async function getUserSubjects(userId: string): Promise<UserSubject[]> {
  try {
    // Get user's selected subjects
    const userResult = await sql`
      SELECT subjects FROM users WHERE id = ${userId}
    `;

    if (userResult.length === 0) {
      throw new Error('User not found');
    }

    let userSubjects: string[] = [];
    const subjectsData = userResult[0].subjects;

    // Parse subjects from different possible formats
    if (typeof subjectsData === 'string') {
      try {
        userSubjects = JSON.parse(subjectsData);
      } catch {
        // If JSON parsing fails, try comma-separated
        userSubjects = subjectsData.split(',').map(s => s.trim().replace(/"/g, '')).filter(s => s);
      }
    } else if (Array.isArray(subjectsData)) {
      userSubjects = subjectsData;
    } else {
      console.warn('Unexpected subjects format:', subjectsData);
      userSubjects = [];
    }

    console.log('Parsed user subjects:', userSubjects);

    const subjects: UserSubject[] = [];

    // Get question count for each subject
    for (const subjectName of userSubjects) {
      const tableName = getQuestionTableName(subjectName);
      console.log('these are the tables',tableName)
      if (!tableName) {
        console.warn(`No table mapping found for subject: ${subjectName}`);
        continue;
      }

      try {
        const countResult = await sql`
          SELECT COUNT(*) as count FROM ${sql(tableName)}
        `;
        
        const questionCount = parseInt(countResult[0].count) || 0;
        const config = subjectConfigs[subjectName.toLowerCase()] || { 
          icon: '📚', 
          color: 'text-gray-600', 
          bgColor: 'bg-gray-500',
          displayName: subjectName
        };

        subjects.push({
          name: subjectName,
          displayName: config.displayName,
          icon: config.icon,
          color: config.color,
          bgColor: config.bgColor,
          questionCount
        });
      } catch (error) {
        console.error(`Error getting question count for ${subjectName}:`, error);
        // Add subject with 0 count if table doesn't exist
        const config = subjectConfigs[subjectName.toLowerCase()] || { 
          icon: '📚', 
          color: 'text-gray-600', 
          bgColor: 'bg-gray-500',
          displayName: subjectName
        };
        subjects.push({
          name: subjectName,
          displayName: config.displayName,
          icon: config.icon,
          color: config.color,
          bgColor: config.bgColor,
          questionCount: 0
        });
      }
    }

    return subjects;
  } catch (error) {
    console.error('Error getting user subjects:', error);
    throw error;
  }
}

// Get questions for a specific subject
export async function getSubjectQuestions(subjectName: string, limit: number = 10): Promise<PracticeQuestion[]> {
  try {
    const tableName = getQuestionTableName(subjectName);
    if (!tableName) {
      throw new Error(`No table mapping found for subject: ${subjectName}`);
    }

    // Try different possible column structures
    let questions;
    try {
      // First try with standard column names
      questions = await sql`
        SELECT 
          id,
          year,
          subject,
          type,
          question,
          options,
          answer,
          explanation
        FROM ${sql(tableName)}
        ORDER BY RANDOM()
        LIMIT ${limit}
      `;
    } catch (error) {
      console.log(`Standard query failed for ${tableName} ${error}, trying alternative structure`);
      // Try alternative structure with question_id
      questions = await sql`
        SELECT 
          question_id as id,
          year,
          subject,
          type,
          question,
          options,
          answer,
          explanation
        FROM ${sql(tableName)}
        ORDER BY RANDOM()
        LIMIT ${limit}
      `;
    }

    return questions.map(q => ({
      id: q.id?.toString() || Math.random().toString(),
      year: parseInt(q.year) || 2024,
      subject: q.subject || subjectName,
      type: q.type || 'general',
      question: q.question || 'Question text not available',
      options: parseOptions(q.options),
      answer: q.answer || 'A',
      explanation: q.explanation || 'Explanation not available'
    }));
  } catch (error) {
    console.error(`Error getting questions for ${subjectName}:`, error);
    throw error;
  }
}

// Create a new practice session
export async function createPracticeSession(userId: string, subjectName: string, questionCount: number = 10): Promise<PracticeSession> {
  try {
    const questions = await getSubjectQuestions(subjectName, questionCount);
    
    if (questions.length === 0) {
      throw new Error(`No questions available for ${subjectName}`);
    }

    const session: PracticeSession = {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      userId,
      subject: subjectName,
      questions,
      currentQuestionIndex: 0,
      score: 0,
      totalQuestions: questions.length,
      startTime: new Date()
    };

    return session;
  } catch (error) {
    console.error('Error creating practice session:', error);
    throw error;
  }
}

// Save practice session results
export async function savePracticeResults(
  userId: string, 
  subjectName: string, 
  score: number, 
  totalQuestions: number,
  durationMinutes: number
): Promise<void> {
  try {
    console.log('Saving practice results:', { userId, subjectName, score, totalQuestions, durationMinutes });

    // Update user statistics - try user_user_statistics first, then user_statistics
    try {
      await sql`
        INSERT INTO user_user_statistics (user_id, total_questions, correct_answers, study_time)
        VALUES (${userId}, ${totalQuestions}, ${score}, ${durationMinutes})
        ON CONFLICT (user_id) DO UPDATE SET
          total_questions = user_user_statistics.total_questions + ${totalQuestions},
          correct_answers = user_user_statistics.correct_answers + ${score},
          study_time = user_user_statistics.study_time + ${durationMinutes}
      `;
      console.log('Updated user_user_statistics successfully');
    } catch {
      console.log('user_user_statistics table not found, trying user_statistics');
      try {
        await sql`
          INSERT INTO user_statistics (user_id, total_questions, correct_answers, study_time)
          VALUES (${userId}, ${totalQuestions}, ${score}, ${durationMinutes})
          ON CONFLICT (user_id) DO UPDATE SET
            total_questions = user_statistics.total_questions + ${totalQuestions},
            correct_answers = user_statistics.correct_answers + ${score},
            study_time = user_statistics.study_time + ${durationMinutes}
        `;
        console.log('Updated user_statistics successfully');
      } catch {
        console.log('Neither statistics table exists, skipping statistics update');
      }
    }

    // Log activity - try different possible column structures
    try {
      // Try with score_achieved column
      await sql`
        INSERT INTO activity_log (user_id, activity_type, activity_description, score_achieved)
        VALUES (${userId}, 'practice', ${`Completed ${subjectName} practice session`}, ${(score / totalQuestions) * 100})
      `;
      console.log('Logged activity with score_achieved successfully');
    } catch {
      console.log('score_achieved column not found, trying alternative structure');
      try {
        // Try with different column names
        await sql`
          INSERT INTO activity_log (user_id, activity_type, activity_description)
          VALUES (${userId}, 'practice', ${`Completed ${subjectName} practice session - Score: ${Math.round((score / totalQuestions) * 100)}%`})
        `;
        console.log('Logged activity with alternative structure successfully');
      } catch {
        console.log('activity_log table not found or has different structure, skipping activity log');
      }
    }

    // Update subject progress - try multiple approaches
    const progressPercentage = Math.round((score / totalQuestions) * 100);
    const recentActivity = `Scored ${progressPercentage}% in practice`;
    
    // Try updating subjects table with different possible structures
    try {
      // First try with the standard structure
      await sql`
        UPDATE subjects 
        SET progress = ${progressPercentage}, questions = questions + ${totalQuestions}, recent = ${recentActivity}
        WHERE user_id = ${userId} AND name = ${subjectName}
      `;
      console.log('Updated subjects table successfully');
    } catch {
      console.log('Standard subjects update failed, trying alternative structures');
      
      try {
        // Try with different column names
        await sql`
          UPDATE subjects 
          SET progress_percentage = ${progressPercentage}, questions_answered = questions_answered + ${totalQuestions}, recent_activity = ${recentActivity}
          WHERE user_id = ${userId} AND subject_name = ${subjectName}
        `;
        console.log('Updated subjects with alternative column names successfully');
      } catch {
        console.log('Alternative subjects update failed, trying to create subject record');
        
        try {
          // Try to insert a new subject record if it doesn't exist
          const config = subjectConfigs[subjectName.toLowerCase()] || { 
            icon: '📚', 
            color: 'bg-gray-500',
            displayName: subjectName
          };
          
          await sql`
            INSERT INTO subjects (user_id, name, icon, color, progress, questions, recent)
            VALUES (${userId}, ${subjectName}, ${config.icon}, ${config.color}, ${progressPercentage}, ${totalQuestions}, ${recentActivity})
            ON CONFLICT (user_id, name) DO UPDATE SET
              progress = ${progressPercentage},
              questions = subjects.questions + ${totalQuestions},
              recent = ${recentActivity}
          `;
          console.log('Created/updated subject record successfully');
        } catch {
          console.log('Could not update subjects table, skipping subject progress update');
        }
      }
    }

    // Also try to update user_progress table if it exists
    try {
      await sql`
        INSERT INTO user_progress (user_id, streak)
        VALUES (${userId}, 1)
        ON CONFLICT (user_id) DO UPDATE SET
          streak = user_progress.streak + 1
      `;
      console.log('Updated user progress successfully');
    } catch {
      console.log('user_progress table not found or has different structure, skipping progress update');
    }

    console.log('Practice results saved successfully');

  } catch (error) {
    console.error('Error saving practice results:', error);
    throw error;
  }
} 