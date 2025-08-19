

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
    'Yoruba': 'yoruba_questions',
        'english': 'english_questions',  
        'mathematics': 'mathematics_questions',  
    'physics': 'physics_questions',
    'chemistry': 'chemistry_questions',
    'biology': 'biology_questions',
    'economics': 'economics_questions',
    'government': 'government_questions',
    'geography': 'geography_questions',
    'literature': 'literature_questions',
    'christian religious knowledge': 'crk_questions',
    'islamic religious knowledge': 'irk_questions',
    'commerce': 'commerce_questions',
    'accounting': 'accounting_questions',
    'agricultural science': 'agriculture_questions',
    'civic education': 'civic_education_questions',
    'computer studies': 'computer_studies_questions',
    'hausa': 'hausa_questions',
    'igbo': 'igbo_questions',
    'yoruba': 'yoruba_questions'
  };

  // Normalize the subjectId by trimming whitespace
  const normalizedSubjectId = subjectId.trim();

  if (!tableMap[normalizedSubjectId]) {
    throw new Error(`Invalid subject: ${subjectId}`);
  }

  return tableMap[normalizedSubjectId];
}