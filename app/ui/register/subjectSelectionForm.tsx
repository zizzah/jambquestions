'use client';

import React from 'react';
import { availableSubjects } from '../../lid/data';

interface SubjectSelectionFormProps {
  selectedSubjects: string[];
  onSubjectToggle: (subjectId: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function SubjectSelectionForm({
  selectedSubjects,
  onSubjectToggle,
  onBack,
  onSubmit
}: SubjectSelectionFormProps) {
  return (
    <>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📚</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Choose Your Subjects</h1>
        <p className="text-gray-300 text-sm">
          Select exactly 4 subjects for your JAMB exam
        </p>
        <div className="mt-2 text-yellow-400 font-semibold">
          {selectedSubjects.length}/4 subjects selected
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {availableSubjects.map(subject => (
          <div
            key={subject.id}
            onClick={() => onSubjectToggle(subject.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
              selectedSubjects.includes(subject.id)
                ? 'border-yellow-400 bg-yellow-400/20'
                : 'border-white/20 bg-white/5 hover:border-white/40'
            } ${subject.required ? 'opacity-100' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{subject.emoji}</span>
                <div>
                  <span className="font-medium">{subject.name}</span>
                  {subject.required && (
                    <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded">
                      Required
                    </span>
                  )}
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedSubjects.includes(subject.id)
                  ? 'border-yellow-400 bg-yellow-400'
                  : 'border-white/40'
              }`}>
                {selectedSubjects.includes(subject.id) && (
                  <span className="text-black text-sm">✓</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
        >
          <span className="mr-2 text-lg">←</span>
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={selectedSubjects.length !== 4}
          className={`flex-1 py-4 font-bold rounded-lg transition-all duration-300 flex items-center justify-center ${
            selectedSubjects.length === 4
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          Create Account
          <span className="ml-2 text-lg">✓</span>
        </button>
      </div>
    </>
  );
}