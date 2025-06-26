'use client';

import React, { useState, useMemo } from 'react';
import { Award } from 'lucide-react';
import Header from '../ui/header';
import Link from 'next/link';
import Display from '../ui/question/display';
import Sidebar from '../ui/question/sidebar';
import QuestionDisplay from '../ui/question/questionDisplay';
import Navigation from '../ui/question/navigation';
import { regeneratedQuestions } from '../lid/placeholder-data';
import { samplessubjects } from '../lid/data';



export default function JAMBSampleQuestions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");

  // Filter questions based on selected subject
  const filteredQuestions = useMemo(() => {
    if (selectedSubject === "All Subjects") {
      return regeneratedQuestions;
    }
    return regeneratedQuestions.filter(q => q.subject === selectedSubject);
  }, [selectedSubject]);

  // Reset to first question when subject changes
  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestion(index);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  // Get current question from filtered questions
  const question = filteredQuestions[currentQuestion];

  // Show message if no questions available for selected subject
  if (filteredQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="relative z-10">
          <Header>
            <Link href='/'>
              <button className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all">
                Back to Home
              </button>
            </Link>
          </Header>
          <main className="container mx-auto px-6 py-8">
            <Display/>
            <div className="text-center mt-12">
              <h2 className="text-2xl font-bold mb-4">No questions available for {selectedSubject}</h2>
              <p className="text-gray-300">Please select a different subject or check back later.</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <Header>
          <Link href='/'>
            <button className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all">
              Back to Home
            </button>
          </Link>
        </Header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          {/* Page Title */}
          <Display/>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar - Subject Filter */}
              <div className="lg:col-span-1">
                <Sidebar 
                  subjects={samplessubjects} 
                  onSubjectChange={handleSubjectChange}
                  selectedSubject={selectedSubject}
                />
                
                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-white/10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-yellow-400" />
                    Quick Stats
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Total Questions:</span>
                      <span className="text-yellow-400 font-medium">15,000+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Current Subject:</span>
                      <span className="text-green-400 font-medium">{selectedSubject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Available:</span>
                      <span className="text-yellow-400 font-medium">{filteredQuestions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Success Rate:</span>
                      <span className="text-yellow-400 font-medium">94%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Question Area */}
              <div className="lg:col-span-3">
                <QuestionDisplay
                  question={question}
                  currentQuestionIndex={currentQuestion}
                  totalQuestions={filteredQuestions.length}
                  selectedAnswer={selectedAnswer}
                  showExplanation={showExplanation}
                  onAnswerSelect={handleAnswerSelect}
                />

                <Navigation
                  currentQuestion={currentQuestion}
                  totalQuestions={filteredQuestions.length}
                  onPrevious={prevQuestion}
                  onNext={nextQuestion}
                  onQuestionSelect={handleQuestionSelect}
                />

                {/* CTA Section */}
                <div className="mt-8 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20 rounded-xl p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready for the Full Experience?</h3>
                  <p className="text-gray-300 mb-6">
                    Get access to 15,000+ questions, detailed analytics, and personalized study plans.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href='/register'>
                      <button className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                        Start Free Practice
                        <span className="ml-2 text-lg group-hover:translate-x-1 transition-transform inline-block">→</span>
                      </button>
                    </Link>
                    <Link href='/'>
                      <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300">
                        View All Features
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}