import React from 'react';
import { PlayCircle, BookOpen } from 'lucide-react';

const subjects = [
  { key: 'english', name: 'English Language', color: 'bg-green-500', icon: <BookOpen className="w-6 h-6" /> },
  { key: 'mathematics', name: 'Mathematics', color: 'bg-blue-500', icon: <BookOpen className="w-6 h-6" /> },
  { key: 'physics', name: 'Physics', color: 'bg-purple-500', icon: <BookOpen className="w-6 h-6" /> },
  { key: 'chemistry', name: 'Chemistry', color: 'bg-orange-500', icon: <BookOpen className="w-6 h-6" /> },
  { key: 'biology', name: 'Biology', color: 'bg-teal-500', icon: <BookOpen className="w-6 h-6" /> },
  { key: 'literature', name: 'Literature', color: 'bg-pink-500', icon: <BookOpen className="w-6 h-6" /> },
  { key: 'economics', name: 'Economics', color: 'bg-yellow-500', icon: <BookOpen className="w-6 h-6" /> },
  { key: 'government', name: 'Government', color: 'bg-red-500', icon: <BookOpen className="w-6 h-6" /> },
  { key: 'geography', name: 'Geography', color: 'bg-indigo-500', icon: <BookOpen className="w-6 h-6" /> },
];

export default function PracticePage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <PlayCircle className="w-8 h-8 text-blue-600" />
        Practice Questions
      </h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Select a Subject to Practice</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {subjects.map((subject) => (
            <button
              key={subject.key}
              className={`flex items-center gap-3 p-4 rounded-lg shadow hover:scale-105 transition-all duration-200 text-white font-semibold ${subject.color}`}
              // onClick={() => handleSelectSubject(subject.key)} // To be implemented
              disabled
            >
              {subject.icon}
              <span>{subject.name}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 text-lg shadow transition-all duration-200"
            // onClick={handleStartPractice} // To be implemented
            disabled
          >
            <PlayCircle className="w-6 h-6" />
            Start Practice
          </button>
        </div>
        <div className="mt-4 text-center text-gray-400 text-sm">
          (Practice functionality coming soon)
        </div>
      </div>
    </div>
  );
} 