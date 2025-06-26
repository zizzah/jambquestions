export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};


interface JambExamRow {
  exam: string;
  year: number;
  subject: string;
  total_questions: number;
  time_allowed: string;
  instruction: string;
  questions: Question[];
}

interface Question {
  question_number: number;
  type: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correct_answer: string;
  explanation: string;
  passage?: string;
}





// app/lid/datadefinition.ts
export interface Subjects {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Questions {
  id: string;
  subject: string;
  icon: string;
  question: string;
  options: string[];
   correctAnswer: number;
  explanation: string;
}

export interface QuizStats {
  totalQuestions: string;
  updated: string;
  successRate: string;
}

export type { JambExamRow, Question };
