'use client';

import React, { useState } from 'react';
import { PlayCircle, BookOpen, Clock, CheckCircle } from 'lucide-react';
import { PracticeQuestion, UserSubject } from '@/app/lid/database/practice';
import PracticeSession from './practiceSession';

interface PracticeClientProps {
  userSubjects: UserSubject[];
  userId: string;
}

interface Session {
  id: string;
  subject: string;
  questions: PracticeQuestion[];
  currentQuestionIndex?: number;
  score?: number;
  totalQuestions?: number;
  startTime?: string;
  userId?: string; // Add this if needed
}

export default function PracticeClient({ userSubjects, userId }: PracticeClientProps) {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(25);
  const [isStartingSession, setIsStartingSession] = useState(false);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);

  const handleSelectSubject = (subjectName: string) => {
    setSelectedSubject(subjectName);
  };

  const handleStartPractice = async () => {
    if (!selectedSubject) return;

    setIsStartingSession(true);
    try {
      // Get the selected subject to determine max questions
      const subject = userSubjects.find(s => s.name === selectedSubject);
      const maxQuestions = subject?.questionCount || 0;
      
      // Use the selected count, but don't exceed available questions
      const questionCount = Math.min(selectedQuestionCount, maxQuestions);
      
      // Create practice session
      const response = await fetch('/api/practice/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          subjectName: selectedSubject,
          questionCount
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start practice session');
      }

      const session = await response.json();
      setCurrentSession(session);
    } catch {
      console.error('Error starting practice session:');
      alert('Failed to start practice session. Please try again.');
    } finally {
      setIsStartingSession(false);
    }
  };

  const handleEndSession = () => {
    setCurrentSession(null);
    setSelectedSubject(null);
  };

  // If we have an active session, show the practice interface
  if (currentSession) {
    return (
      <PracticeSession 
        session={currentSession} 
        onEnd={handleEndSession}
        userId={userId}
      />
    );
  }

  const selectedSubjectData = userSubjects.find(s => s.name === selectedSubject);
  const availableQuestions = selectedSubjectData?.questionCount || 0;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <PlayCircle className="w-8 h-8 text-blue-600" />
        Practice Questions
      </h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Select a Subject to Practice</h2>
        
        {userSubjects.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No subjects found for your account.</p>
            <p className="text-sm text-gray-500">
              Please contact support to set up your subjects.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {userSubjects.map((subject) => (
                <button
                  key={subject.name}
                  className={`flex items-center gap-3 p-4 rounded-lg shadow hover:scale-105 transition-all duration-200 text-white font-semibold ${
                    selectedSubject === subject.name 
                      ? 'ring-4 ring-blue-300 ring-offset-2' 
                      : ''
                  } ${subject.bgColor}`}
                  onClick={() => handleSelectSubject(subject.name)}
                  disabled={subject.questionCount === 0}
                >
                  <span className="text-2xl">{subject.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold">{subject.displayName}</div>
                    <div className="text-sm opacity-90">
                      {subject.questionCount} questions
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {selectedSubject && (
              <>
                {/* Question Count Selection */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Number of Questions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[10, 25, 50].map((count) => (
                      <button
                        key={count}
                        onClick={() => setSelectedQuestionCount(count)}
                        disabled={count > availableQuestions}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                          selectedQuestionCount === count
                            ? 'bg-blue-600 text-white'
                            : count > availableQuestions
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                    <button
                      onClick={() => setSelectedQuestionCount(availableQuestions)}
                      disabled={availableQuestions === 0}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        selectedQuestionCount === availableQuestions
                          ? 'bg-blue-600 text-white'
                          : availableQuestions === 0
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      All ({availableQuestions})
                    </button>
                  </div>
                </div>

                <div className="flex justify-center mb-6">
                  <button
                    className={`px-8 py-3 rounded-lg flex items-center gap-2 text-lg shadow transition-all duration-200 font-semibold ${
                      selectedSubject && !isStartingSession
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={handleStartPractice}
                    disabled={!selectedSubject || isStartingSession}
                  >
                    {isStartingSession ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        Starting...
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-6 h-6" />
                        Start Practice
                      </>
                    )}
                  </button>
                </div>

                {/* Practice Session Details */}
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    Practice Session Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-700">
                        Subject: <strong>{selectedSubjectData?.displayName}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-700">
                        Questions: <strong>{Math.min(selectedQuestionCount, availableQuestions)}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-orange-700">
                        Time: <strong>Unlimited</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Practice Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 Practice Tips</h3>
        <ul className="space-y-2 text-gray-600">
          <li>• Take your time to read each question carefully</li>
          <li>• Review explanations after answering to learn from mistakes</li>
          <li>• Practice regularly to improve your performance</li>
          <li>• Focus on subjects where you need the most improvement</li>
        </ul>
      </div>
    </div>
  );
} 