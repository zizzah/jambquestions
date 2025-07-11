import React from 'react';
import { BarChart3, TrendingUp, BookOpen, ArrowUpRight } from 'lucide-react';

export default function AnalysisPage() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <BarChart3 className="w-8 h-8 text-blue-600" />
        Performance Analysis
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg shadow flex flex-col items-center">
          <TrendingUp className="w-7 h-7 text-blue-500 mb-2" />
          <div className="text-2xl font-semibold">--%</div>
          <div className="text-gray-600">Overall Accuracy</div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow flex flex-col items-center">
          <BookOpen className="w-7 h-7 text-green-500 mb-2" />
          <div className="text-2xl font-semibold">--</div>
          <div className="text-gray-600">Total Questions</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow flex flex-col items-center">
          <ArrowUpRight className="w-7 h-7 text-purple-500 mb-2" />
          <div className="text-2xl font-semibold">--h</div>
          <div className="text-gray-600">Study Time</div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Subject Breakdown</h2>
        <div className="w-full h-56 flex items-center justify-center text-gray-400">
          {/* Placeholder for subject-wise chart */}
          <span>Charts coming soon...</span>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Improvement Tips</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Focus on subjects with the lowest scores for targeted improvement.</li>
          <li>Review your incorrect answers to understand common mistakes.</li>
          <li>Increase your study time gradually for better retention.</li>
          <li>Take regular mock tests to track your progress.</li>
        </ul>
      </div>
    </div>
  );
}
