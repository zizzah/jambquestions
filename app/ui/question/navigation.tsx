// components/ui/question/Navigation.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onQuestionSelect: (index: number) => void;
}

/**
 * A Navigation component for navigating through questions.
 *
 * @param {{ currentQuestion: number; totalQuestions: number; onPrevious: () => void; onNext: () => void; onQuestionSelect: (index: number) => void }} props
 * @returns {JSX.Element}
 */
/**
 * @prop {number} currentQuestion - The current question index.
 * @prop {number} totalQuestions - The total number of questions.
 * @prop {() => void} onPrevious - The callback function to go to the previous question.
 * @prop {() => void} onNext - The callback function to go to the next question.
 * @prop {(index: number) => void} onQuestionSelect - The callback function to go to the question at the given index.
 */

const Navigation: React.FC<NavigationProps> = ({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
  onQuestionSelect,
}) => {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-white/10">
      <button
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        className="flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </button>

      <div className="flex space-x-2">
        {Array.from({ length: totalQuestions }, (_, index) => (
          <button
            key={index}
            onClick={() => onQuestionSelect(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentQuestion 
                ? 'bg-yellow-400' 
                : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={currentQuestion === totalQuestions - 1}
        className="flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
};

export default Navigation;