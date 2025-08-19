// practice.ts - Database functions for practice mode
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { 
  ssl: 'require',
  max: 10, // Increased connection pool size
  idle_timeout: 20,
  connect_timeout: 10,
});
import { getQuestionTableName } from '@/app/utils/helper';

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
  'agricultural science': { icon: '🌾', color: 'text-lime-600', bgColor: 'bg-lime-500', displayName: 'Agricultural Science' },
  'civic education': { icon: '🏛️', color: 'text-cyan-600', bgColor: 'bg-cyan-500', displayName: 'Civic Education' },
  'computer studies': { icon: '💻', color: 'text-slate-600', bgColor: 'bg-slate-500', displayName: 'Computer Studies' },
  'christian religious knowledge': { icon: '✝️', color: 'text-blue-600', bgColor: 'bg-blue-500', displayName: 'Christian Religious Knowledge' },
  'islamic religious knowledge': { icon: '☪️', color: 'text-green-600', bgColor: 'bg-green-500', displayName: 'Islamic Religious Knowledge' },
  'hausa': { icon: '📝', color: 'text-orange-600', bgColor: 'bg-orange-500', displayName: 'Hausa' },
  'igbo': { icon: '📝', color: 'text-green-600', bgColor: 'bg-green-500', displayName: 'Igbo' },
  'yoruba': { icon: '📝', color: 'text-yellow-600', bgColor: 'bg-yellow-500', displayName: 'Yoruba' },
  'English Language': { icon: '📚', color: 'text-blue-600', bgColor: 'bg-blue-500', displayName: 'English Language' },
  'Mathematics': { icon: '➗', color: 'text-red-600', bgColor: 'bg-red-500', displayName: 'Mathematics' },
  'Physics': { icon: '⚛️', color: 'text-purple-600', bgColor: 'bg-purple-500', displayName: 'Physics' },
  'Chemistry': { icon: '🧪', color: 'text-yellow-600', bgColor: 'bg-yellow-500', displayName: 'Chemistry' },
  'Economics': { icon: '💵', color: 'text-green-600', bgColor: 'bg-green-500', displayName: 'Economics' },
  'Geography': { icon: '🌍', color: 'text-indigo-600', bgColor: 'bg-indigo-500', displayName: 'Geography' },
  'Government': { icon: '🏛️', color: 'text-blue-600', bgColor: 'bg-blue-500', displayName: 'Government' },
  'Commerce': { icon: '🛒', color: 'text-orange-600', bgColor: 'bg-orange-500', displayName: 'Commerce' },
  'Computer Science': { icon: '💻', color: 'text-gray-600', bgColor: 'bg-gray-500', displayName: 'Computer Science' },
  'Hausa': { icon: '📝', color: 'text-orange-600', bgColor: 'bg-orange-500', displayName: 'Hausa' },
  'Literature in English': { icon: '📖', color: 'text-purple-600', bgColor: 'bg-purple-500', displayName: 'Literature in English' },
  'History': { icon: '📜', color: 'text-teal-600', bgColor: 'bg-teal-500', displayName: 'History' },
  'Islamic Religious Knowledge': { icon: '☪️', color: 'text-green-600', bgColor: 'bg-green-500', displayName: 'Islamic Religious Knowledge' },
  'Igbo': { icon: '📝', color: 'text-yellow-600', bgColor: 'bg-yellow-500', displayName: 'Igbo' },
  'Yoruba':{ icon: '📝', color: 'text-yellow-600', bgColor: 'bg-yellow-500', displayName: 'Yoruba' },
  'Accounting': { icon: '📊', color: 'text-emerald-600', bgColor: 'bg-emerald-500', displayName: 'Accounting' }
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

// Global tracking for used questions to prevent repetition
class QuestionTracker {
  private usedQuestions = new Map<string, Set<string>>();
  private readonly resetThreshold = 0.8; // Reset when 80% of questions used
  
  getExcludedIds(subjectName: string): string[] {
    return Array.from(this.usedQuestions.get(subjectName) || []);
  }
  
  markQuestionsUsed(subjectName: string, questionIds: string[]): void {
    if (!this.usedQuestions.has(subjectName)) {
      this.usedQuestions.set(subjectName, new Set());
    }
    
    const usedSet = this.usedQuestions.get(subjectName)!;
    questionIds.forEach(id => usedSet.add(id));
  }
  
  shouldReset(subjectName: string, totalQuestions: number): boolean {
    const usedSet = this.usedQuestions.get(subjectName);
    if (!usedSet) return false;
    
    return usedSet.size >= (totalQuestions * this.resetThreshold);
  }
  
  reset(subjectName: string): void {
    this.usedQuestions.delete(subjectName);
  }
}

const questionTracker = new QuestionTracker();

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
      console.log('these are the tables', tableName)
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

// Get questions for a specific subject with improved randomization
export async function getSubjectQuestions(subjectName: string, limit: number = 10): Promise<PracticeQuestion[]> {
  try {
    const tableName = getQuestionTableName(subjectName);
    if (!tableName) {
      throw new Error(`No table mapping found for subject: ${subjectName}`);
    }

    // Get total question count first
    let totalCount = 0;
    try {
      const countResult = await sql`SELECT COUNT(*) as count FROM ${sql(tableName)}`;
      totalCount = parseInt(countResult[0].count) || 0;
    } catch (error) {
      console.error(`Error getting count for ${tableName}:`, error);
    }

    // Check if we should reset the tracker
    if (questionTracker.shouldReset(subjectName, totalCount)) {
      console.log(`Resetting question tracker for ${subjectName}`);
      questionTracker.reset(subjectName);
    }

    // Get excluded question IDs
    const excludedIds = questionTracker.getExcludedIds(subjectName);
    console.log(`Excluding ${excludedIds.length} previously used questions for ${subjectName}`);

    // Create exclusion clause
    const hasExclusions = excludedIds.length > 0;
    const randomSeed = Math.floor(Math.random() * 1000000) + Date.now();

    let questions;
    try {
      // Enhanced query with multiple randomization methods
      if (hasExclusions) {
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
          WHERE id NOT IN (${sql(excludedIds)})
          ORDER BY 
            RANDOM() * ${randomSeed},
            RANDOM(),
            MD5(CONCAT(id::text, ${Date.now()}::text))
          LIMIT ${limit}
        `;
      } else {
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
          ORDER BY 
            RANDOM() * ${randomSeed},
            RANDOM(),
            MD5(CONCAT(id::text, ${Date.now()}::text))
          LIMIT ${limit}
        `;
      }
    } catch (error) {
      console.log(`Enhanced query failed for ${tableName}, trying alternative structure`,error);
      
      // Fallback to alternative column structure
      if (hasExclusions) {
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
          WHERE question_id NOT IN (${sql(excludedIds)})
          ORDER BY RANDOM()
          LIMIT ${limit}
        `;
      } else {
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
    }

    // If we don't get enough questions and have exclusions, try without exclusions
    if (questions.length < limit && hasExclusions) {
      console.log(`Only got ${questions.length} questions, trying without exclusions`);
      try {
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
          ORDER BY 
            RANDOM() * ${randomSeed + 1000},
            RANDOM()
          LIMIT ${limit}
        `;
      } catch {
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
      // Reset tracker since we're reusing questions
      questionTracker.reset(subjectName);
    }

    const processedQuestions = questions.map(q => ({
      id: q.id?.toString() || Math.random().toString(),
      year: parseInt(q.year) || 2024,
      subject: q.subject || subjectName,
      type: q.type || 'general',
      question: q.question || 'Question text not available',
      options: parseOptions(q.options),
      answer: q.answer || 'A',
      explanation: q.explanation || 'Explanation not available'
    }));

    // Track the used questions
    const questionIds = processedQuestions.map(q => q.id);
    questionTracker.markQuestionsUsed(subjectName, questionIds);
    
    console.log(`Retrieved ${processedQuestions.length} questions for ${subjectName}`);
    return processedQuestions;

  } catch (error) {
    console.error(`Error getting questions for ${subjectName}:`, error);
    throw error;
  }
}

// Alternative method using offset-based selection for better distribution
export async function getSubjectQuestionsWithOffset(subjectName: string, limit: number = 10): Promise<PracticeQuestion[]> {
  try {
    const tableName = getQuestionTableName(subjectName);
    if (!tableName) {
      throw new Error(`No table mapping found for subject: ${subjectName}`);
    }

    // Get total count
    const countResult = await sql`SELECT COUNT(*) as count FROM ${sql(tableName)}`;
    const totalQuestions = parseInt(countResult[0].count) || 0;
    
    if (totalQuestions === 0) {
      throw new Error(`No questions found in ${tableName}`);
    }

    // Generate random starting points
    const maxOffset = Math.max(0, totalQuestions - limit);
    const randomOffset = Math.floor(Math.random() * (maxOffset + 1));
    
    let questions;
    try {
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
        ORDER BY id
        LIMIT ${limit}
        OFFSET ${randomOffset}
      `;
    } catch (error) {
      console.log(`Error with offset query for ${tableName}, trying alternative structure`, error);
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
        ORDER BY question_id
        LIMIT ${limit}
        OFFSET ${randomOffset}
      `;
    }

    // Shuffle the results for additional randomness
    const shuffled = questions.sort(() => Math.random() - 0.5);

    return shuffled.map(q => ({
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
    console.error(`Error getting questions with offset for ${subjectName}:`, error);
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

// Reset question tracking for a subject (useful for testing)
export function resetQuestionTracking(subjectName?: string): void {
  if (subjectName) {
    questionTracker.reset(subjectName);
  } else {
    // Reset all subjects
    const subjects = Object.keys(subjectConfigs);
    subjects.forEach(subject => questionTracker.reset(subject));
  }
}

// Get tracking statistics (useful for debugging)
export function getTrackingStats(subjectName: string): { usedCount: number, excludedIds: string[] } {
  const excludedIds = questionTracker.getExcludedIds(subjectName);
  return {
    usedCount: excludedIds.length,
    excludedIds
  };
}

// Add these helper functions to practice.ts

/**
 * Normalize subject name to match database entries
 * This helps handle inconsistencies between how subjects are stored and referenced
 */
export function normalizeSubjectName(subjectName: string): string {
  // Handle common variations
  const nameMap: { [key: string]: string } = {
    'english': 'English Language',
    'mathematics': 'Mathematics',
    'physics': 'Physics',
    'chemistry': 'Chemistry',
    'biology': 'Biology',
    'economics': 'Economics',
    'government': 'Government',
    'literature': 'Literature in English',
    'geography': 'Geography',
    'commerce': 'Commerce',
    'accounting': 'Accounting',
    'agricultural science': 'Agricultural Science',
    'civic education': 'Civic Education',
    'computer studies': 'Computer Studies',
    'christian religious knowledge': 'Christian Religious Knowledge',
    'islamic religious knowledge': 'Islamic Religious Knowledge',
    'hausa': 'Hausa',
    'igbo': 'Igbo',
    'yoruba': 'Yoruba'
  };

  const lowercaseName = subjectName.toLowerCase().trim();
  return nameMap[lowercaseName] || subjectName;
}

/**
 * Find the correct subject name in the database for a given subject
 */
export async function findCorrectSubjectName(userId: string, targetSubjectName: string): Promise<string | null> {
  try {
    // First, try exact match
    const exactMatch = await sql`
      SELECT name FROM subjects 
      WHERE user_id = ${userId} AND name = ${targetSubjectName}
      LIMIT 1
    `;
    
    if (exactMatch.length > 0) {
      return exactMatch[0].name;
    }

    // Try case-insensitive match
    const caseInsensitiveMatch = await sql`
      SELECT name FROM subjects 
      WHERE user_id = ${userId} AND LOWER(name) = LOWER(${targetSubjectName})
      LIMIT 1
    `;
    
    if (caseInsensitiveMatch.length > 0) {
      return caseInsensitiveMatch[0].name;
    }

    // Try normalized name
    const normalizedName = normalizeSubjectName(targetSubjectName);
    const normalizedMatch = await sql`
      SELECT name FROM subjects 
      WHERE user_id = ${userId} AND LOWER(name) = LOWER(${normalizedName})
      LIMIT 1
    `;
    
    if (normalizedMatch.length > 0) {
      return normalizedMatch[0].name;
    }

    // Try partial match (for subjects like "Literature in English" vs "Literature")
    const partialMatch = await sql`
      SELECT name FROM subjects 
      WHERE user_id = ${userId} AND (
        LOWER(name) LIKE LOWER(${`%${targetSubjectName}%`}) OR
        LOWER(${targetSubjectName}) LIKE LOWER(CONCAT('%', name, '%'))
      )
      LIMIT 1
    `;
    
    if (partialMatch.length > 0) {
      return partialMatch[0].name;
    }

    return null;
  } catch (error) {
    console.error('Error finding correct subject name:', error);
    return null;
  }
}

/**
 * Debug function to check subject names for a user
 */
export async function debugUserSubjects(userId: string): Promise<void> {
  try {
    const subjects = await sql`
      SELECT name, progress, questions, recent, created_at, updated_at 
      FROM subjects 
      WHERE user_id = ${userId}
      ORDER BY name
    `;
    
    console.log('=== USER SUBJECTS DEBUG ===');
    console.log(`User ID: ${userId}`);
    console.log(`Total subjects: ${subjects.length}`);
    console.log('Subjects:');
    subjects.forEach((subject, index) => {
      console.log(`${index + 1}. Name: "${subject.name}"`);
      console.log(`   Progress: ${subject.progress}%`);
      console.log(`   Questions: ${subject.questions}`);
      console.log(`   Recent: ${subject.recent}`);
      console.log(`   Last Updated: ${subject.updated_at}`);
      console.log('---');
    });
  } catch (error) {
    console.error('Error debugging user subjects:', error);
  }
}



// Save practice session results
// Improved savePracticeResults function with better subject name matching
export async function savePracticeResults(
  userId: string, 
  subjectName: string, 
  score: number, 
  totalQuestions: number,
  durationMinutes: number
): Promise<void> {
  try {
    console.log('Saving practice results:', { userId, subjectName, score, totalQuestions, durationMinutes });

    // Debug user subjects first
    await debugUserSubjects(userId);

    // Find the correct subject name in the database
    const correctSubjectName = await findCorrectSubjectName(userId, subjectName);
    const subjectToUpdate = correctSubjectName || subjectName;
    
    console.log(`Subject name mapping: "${subjectName}" -> "${subjectToUpdate}"`);

    // Calculate progress percentage
    const progressPercentage = Math.round((score / totalQuestions) * 100);
    const recentActivity = `Scored ${progressPercentage}% in practice`;
    
    // Use a transaction to ensure all operations succeed or fail together
    await sql.begin(async (sql) => {
      // Update user statistics
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
      } catch (error) {
        console.log('user_user_statistics table not found, trying alternatives', error);
      }

      // Update subjects table with better logic
      try {
        if (correctSubjectName) {
          // Subject exists, update it
          const currentSubject = await sql`
            SELECT progress, questions FROM subjects 
            WHERE user_id = ${userId} AND name = ${correctSubjectName}
          `;

          if (currentSubject.length > 0) {
            const currentProgress = currentSubject[0].progress || 0;
            const currentQuestions = currentSubject[0].questions || 0;
            
            // Use a weighted average for progress calculation
            // Give more weight to recent performance
            const totalAttempts = Math.ceil(currentQuestions / 10) + 1; // Estimate previous attempts
            const newProgress = Math.round(((currentProgress * (totalAttempts - 1)) + progressPercentage) / totalAttempts);
            
            await sql`
              UPDATE subjects 
              SET 
                progress = ${newProgress}, 
                questions = ${currentQuestions + totalQuestions}, 
                recent = ${recentActivity},
                updated_at = CURRENT_TIMESTAMP
              WHERE user_id = ${userId} AND name = ${correctSubjectName}
            `;
            
            console.log(`✅ Updated subject "${correctSubjectName}": ${currentProgress}% -> ${newProgress}%`);
          }
        } else {
          // Subject doesn't exist, create it
          const config = subjectConfigs[subjectName.toLowerCase()] || 
                        subjectConfigs[normalizeSubjectName(subjectName).toLowerCase()] || { 
            icon: '📚', 
            color: 'bg-gray-500',
            displayName: subjectName
          };
          
          await sql`
            INSERT INTO subjects (user_id, name, icon, color, progress, questions, recent, created_at, updated_at)
            VALUES (${userId}, ${subjectToUpdate}, ${config.icon}, ${config.color}, ${progressPercentage}, ${totalQuestions}, ${recentActivity}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          `;
          
          console.log(`✅ Created new subject "${subjectToUpdate}" with ${progressPercentage}% progress`);
        }

        // Verify the update worked
        const verifyUpdate = await sql`
          SELECT name, progress, questions, recent, updated_at 
          FROM subjects 
          WHERE user_id = ${userId} AND (name = ${subjectToUpdate} OR name = ${correctSubjectName})
          ORDER BY updated_at DESC
          LIMIT 1
        `;
        
        if (verifyUpdate.length > 0) {
          console.log('✅ Subject update verified:', verifyUpdate[0]);
        } else {
          console.log('❌ Could not verify subject update');
        }

      } catch (subjectError) {
        console.error('❌ Error updating subjects table:', subjectError);
        
        // Enhanced debugging
        try {
          const allSubjects = await sql`
            SELECT id, name, progress, questions FROM subjects WHERE user_id = ${userId}
          `;
          console.log('📋 Current subjects in database:', allSubjects);
        } catch (debugError) {
          console.error('Could not fetch subjects for debugging:', debugError);
        }
        
        throw new Error(`Failed to update subject progress: ${subjectError}`);
      }

      // Log activity
      try {
        await sql`
          INSERT INTO activity_log (user_id, action, subject, time, score, icon)
          VALUES (${userId}, 'Completed practice session', ${subjectToUpdate}, ${new Date().toISOString()}, ${progressPercentage + '%'}, '📚')
        `;
        console.log('✅ Activity logged successfully');
      } catch (activityError) {
        console.log('Activity logging failed:', activityError);
      }

      // Update user progress streak
      try {
        await sql`
          INSERT INTO user_progress (user_id, streak)
          VALUES (${userId}, 1)
          ON CONFLICT (user_id) DO UPDATE SET
            streak = user_progress.streak + 1
        `;
        console.log('✅ User streak updated successfully');
      } catch (streakError) {
        console.log('Streak update failed:', streakError);
      }
    });

    console.log('🎉 Practice results saved successfully');

  } catch (error) {
    console.error('💥 Error saving practice results:', error);
    throw error;
  }
}

// Also add a function to manually sync subjects if needed
export async function syncUserSubjects(userId: string): Promise<void> {
  try {
    // Get user's selected subjects from the users table
    const userData = await sql`
      SELECT subjects FROM users WHERE id = ${userId}
    `;
    
    if (userData.length === 0) {
      throw new Error('User not found');
    }
    
    let userSubjects: string[] = [];
    const subjectsData = userData[0].subjects;
    
    // Parse subjects
    if (typeof subjectsData === 'string') {
      try {
        userSubjects = JSON.parse(subjectsData);
      } catch {
        userSubjects = subjectsData.split(',').map(s => s.trim().replace(/"/g, '')).filter(s => s);
      }
    } else if (Array.isArray(subjectsData)) {
      userSubjects = subjectsData;
    }
    
    // Ensure all subjects exist in the subjects table
    for (const subject of userSubjects) {
      const normalizedName = normalizeSubjectName(subject);
      
      const exists = await sql`
        SELECT id FROM subjects 
        WHERE user_id = ${userId} AND (name = ${subject} OR name = ${normalizedName})
      `;
      
      if (exists.length === 0) {
        const config = subjectConfigs[subject.toLowerCase()] || 
                      subjectConfigs[normalizedName.toLowerCase()] || {
          icon: '📚',
          color: 'bg-gray-500',
          displayName: normalizedName
        };
        
        await sql`
          INSERT INTO subjects (user_id, name, icon, color, progress, questions, recent, created_at, updated_at)
          VALUES (${userId}, ${normalizedName}, ${config.icon}, ${config.color}, 0, 0, 'Not started', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `;
        
        console.log(`Created missing subject: ${normalizedName}`);
      }
    }
    
    console.log('User subjects synced successfully');
  } catch (error) {
    console.error('Error syncing user subjects:', error);
    throw error;
  }
}