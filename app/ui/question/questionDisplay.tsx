// components/ui/question/QuestionDisplay.tsx
import React from 'react';
import { Clock } from 'lucide-react';

// Sample question format
interface SampleQuestion {
  id: string;
  subject: string;
  icon: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// JAMB question format
interface JAMBQuestion {
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
  answer: string; // "A", "B", "C", or "D"
  explanation: string;
}

// Union type for both question formats
type Question = SampleQuestion | JAMBQuestion;

interface QuestionDisplayProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  showExplanation: boolean;
  onAnswerSelect: (optionIndex: number) => void;
}

/**
 * A component that displays a single question with options and explanation.
 * Supports both sample questions (array options) and JAMB questions (object options).
 */

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  showExplanation,
  onAnswerSelect,
}) => {
  // Helper function to check if question is JAMB format
  const isJAMBQuestion = (q: Question): q is JAMBQuestion => {
    return 'year' in q && 'options' in q && typeof q.options === 'object' && !Array.isArray(q.options);
  };

  // Helper function to get normalized options array
  const getOptionsArray = (q: Question): string[] => {
    if (isJAMBQuestion(q)) {
      return [q.options.A, q.options.B, q.options.C, q.options.D];
    }
    return q.options;
  };

  // Helper function to get correct answer index
  const getCorrectAnswerIndex = (q: Question): number => {
    if (isJAMBQuestion(q)) {
      const answerMap: { [key: string]: number } = { A: 0, B: 1, C: 2, D: 3 };
      return answerMap[q.answer] || 0;
    }
    return q.correctAnswer;
  };

  // Helper function to get subject icon
  const getSubjectIcon = (q: Question): string => {
    if (isJAMBQuestion(q)) {
      // Default icons for common subjects, you can expand this
      const subjectIcons: { [key: string]: string } = {
        'Government': '🏛️',
        'Mathematics': '📐',
        'English': '📚',
        'Physics': '⚛️',
        'Chemistry': '🧪',
        'Biology': '🧬',
        'Economics': '📈',
        'Geography': '🌍',
        'History': '📜',
        'Literature': '📖',
      };
      return subjectIcons[q.subject] || '📝';
    }
    return q.icon;
  };

  // Helper function to get question type/label
  const getQuestionLabel = (q: Question): string => {
    if (isJAMBQuestion(q)) {
      return `${q.year} JAMB`;
    }
    return 'Sample Question';
  };

  const optionsArray = getOptionsArray(question);
  const correctAnswerIndex = getCorrectAnswerIndex(question);
  const subjectIcon = getSubjectIcon(question);
  const questionLabel = getQuestionLabel(question);

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-xl">{subjectIcon}</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">{question.subject}</h3>
            <div className="flex items-center text-sm text-gray-300">
              <Clock className="w-4 h-4 mr-1" />
              <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            </div>
          </div>
        </div>
        <div className="text-sm bg-white/10 px-3 py-1 rounded-full">
          {questionLabel}
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl font-medium leading-relaxed mb-6">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {optionsArray.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              disabled={showExplanation}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                selectedAnswer === index
                  ? index === correctAnswerIndex
                    ? 'bg-green-500/20 border-green-400 text-green-100'
                    : 'bg-red-500/20 border-red-400 text-red-100'
                  : showExplanation && index === correctAnswerIndex
                  ? 'bg-green-500/20 border-green-400 text-green-100'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center">
                <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
                {showExplanation && index === correctAnswerIndex && (
                  <span className="ml-auto text-green-400">✓</span>
                )}
                {selectedAnswer === index && index !== correctAnswerIndex && showExplanation && (
                  <span className="ml-auto text-red-400">✗</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-6 mb-6">
          <h4 className="font-semibold mb-2 text-blue-200">Explanation:</h4>
          <p className="text-gray-200 leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;