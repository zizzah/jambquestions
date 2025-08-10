'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  BookOpen,
  Trophy,
  RefreshCw,
} from 'lucide-react';
import { PracticeQuestion } from '@/app/lid/database/practice';

interface PracticeSessionProps {
  session: {
    id: string;
    subject: string;
    questions: PracticeQuestion[];
    currentQuestionIndex?: number;
    score?: number;
    totalQuestions?: number;
    startTime?: string;
  };
  onEnd: () => void;
  userId: string;
}

export default function MockSession({ session, onEnd, userId }: PracticeSessionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(session.currentQuestionIndex || 0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(session.score || 0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [sessionStartTime] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = session.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === session.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleAnswerSelect = (answer: string) => {
    if (answeredQuestions.has(currentQuestionIndex)) return;
    
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    // Check if answer is correct
    const isCorrect = answer === currentQuestion.answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setAnsweredQuestions(prev => new Set([...prev, currentQuestionIndex]));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < session.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleFinishSession = async () => {
    setIsSubmitting(true);
    try {
      const durationMinutes = Math.round((new Date().getTime() - sessionStartTime.getTime()) / (1000 * 60));
      
      const response = await fetch('/api/practice/end', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          subjectName: session.subject,
          score,
          totalQuestions: session.questions.length,
          durationMinutes
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save practice results');
      }

      onEnd();
    } catch {
      console.error('Error finishing practice session:');
      alert('Failed to save your results. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getOptionClass = (option: string) => {
    if (!showExplanation) {
      return selectedAnswer === option 
        ? 'bg-blue-500 text-white border-blue-500' 
        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';
    }

   
    if (selectedAnswer === option && option ) {
      return 'bg-blue-500 text-white border-white-500';
    }
    
    return 'bg-white text-gray-700 border-gray-300';
  };

  const progressPercentage = ((currentQuestionIndex + 1) / session.questions.length) * 100;
  const scorePercentage = Math.round((score / session.questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">{session.subject}</h1>
          </div>
          <div className="flex items-center gap-4 text-sm bg-gray-950">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold">{score}/{session.questions.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-500" >
             
              </Clock>
              <span>Question {currentQuestionIndex + 1} of {session.questions.length}</span>
            </div>
            
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Question Navigation */}
        <div className="flex flex-wrap gap-2">
          {session.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentQuestionIndex(index);
                setSelectedAnswer(null);
                setShowExplanation(false);
              }}
              className={`w-8 h-8 rounded-full text-xs font-semibold transition-all ${
                index === currentQuestionIndex
                  ? 'bg-blue-600 text-white'
                  : answeredQuestions.has(index)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {currentQuestion.type}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              {currentQuestion.year}
            </span>
          </div>
          
          <h2 className="text-lg font-semibold text-gray-800 mb-6 leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {Object.entries(currentQuestion.options).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleAnswerSelect(key)}
                disabled={answeredQuestions.has(currentQuestionIndex)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  getOptionClass(key)
                } ${answeredQuestions.has(currentQuestionIndex) ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{key}.</span>
                  <span>{value}</span>
                  {showExplanation && key === currentQuestion.answer && (
                                       <div></div>

                  )}
                  {showExplanation && selectedAnswer === key && key !== currentQuestion.answer && (
                    <div></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Explanation */}
      
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={prevQuestion}
          disabled={isFirstQuestion}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            isFirstQuestion
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="flex items-center gap-4">
          {isLastQuestion ? (
            <button
              onClick={handleFinishSession}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Trophy className="w-4 h-4" />
                  Finish Practice
                </>
              )}
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              disabled={!answeredQuestions.has(currentQuestionIndex)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                !answeredQuestions.has(currentQuestionIndex)
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Score Summary */}
      {isLastQuestion && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{score}</div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{scorePercentage}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{session.questions.length}</div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 