

export function getQuestionTableName(subjectId: string): string {
  // Map subject IDs to their exact table names (all correctly spelled)
  const tableMap: Record<string, string> = {
    'Mathematics': 'mathematics_questions',
    'English Language': 'english_questions',  
    'Physics': 'physics_questions',
    'Chemistry': 'chemistry_questions',
    'Biology': 'biology_questions',
    'Economics': 'economics_questions',
    'Government': 'government_questions',
    'Geography': 'geography_questions',
    'Literature': 'literature_questions',
    'Christian Religious Knowledge': 'crk_questions',
    'Islamic Religious Knowledge': 'irk_questions',
    'Commerce': 'commerce_questions',
    'Accounting': 'accounting_questions',
    'Agricultural Science': 'agriculture_questions',
    'Civic Education': 'civic_education_questions',
    'Computer Studies': 'computer_studies_questions',
    'Hausa': 'hausa_questions',
    'Igbo': 'igbo_questions',
    'Yoruba': 'yoruba_questions'
  };

  // Normalize the subjectId by trimming whitespace
  const normalizedSubjectId = subjectId.trim();

  if (!tableMap[normalizedSubjectId]) {
    throw new Error(`Invalid subject: ${subjectId}`);
  }

  return tableMap[normalizedSubjectId];
}