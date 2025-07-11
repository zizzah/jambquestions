import React from 'react';
import { FileText, Timer, Users, PlayCircle } from 'lucide-react';

export default function MockTestPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FileText className="w-8 h-8 text-green-600" />
        JAMB Mock Test
      </h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col items-center">
            <Timer className="w-7 h-7 text-blue-500 mb-2" />
            <div className="text-lg font-semibold">2 hours</div>
            <div className="text-gray-600 text-sm">Time Limit</div>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-7 h-7 text-purple-500 mb-2" />
            <div className="text-lg font-semibold">4 Subjects</div>
            <div className="text-gray-600 text-sm">All selected</div>
          </div>
          <div className="flex flex-col items-center">
            <FileText className="w-7 h-7 text-orange-500 mb-2" />
            <div className="text-lg font-semibold">200 Questions</div>
            <div className="text-gray-600 text-sm">Total</div>
          </div>
        </div>
        <div className="mb-6 text-gray-700">
          <p>
            Take a full-length JAMB mock test to simulate the real exam experience. You will be tested on all your selected subjects. The test is timed and your results will be available immediately after submission.
          </p>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 text-lg shadow transition-all duration-200"
            // onClick={handleStartMockTest} // To be implemented
            disabled
          >
            <PlayCircle className="w-6 h-6" />
            Start Mock Test
          </button>
        </div>
        <div className="mt-4 text-center text-gray-400 text-sm">
          (Mock test functionality coming soon)
        </div>
      </div>
    </div>
  );
}
