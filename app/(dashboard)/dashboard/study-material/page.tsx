import React from 'react';
import { BookOpen, Youtube, Lightbulb } from 'lucide-react';

export default function StudyMaterialPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <BookOpen className="w-8 h-8 text-orange-600" />
        Study Materials
      </h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-500" />
          Recommended Textbooks
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>New General Mathematics for West Africa</li>
          <li>Essential Physics for Senior Secondary Schools</li>
          <li>Modern Biology for Senior Secondary Schools</li>
          <li>Countdown to English</li>
          <li>Comprehensive Economics for Senior Secondary Schools</li>
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Youtube className="w-6 h-6 text-red-500" />
          Video Resources
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><a href="#" className="text-blue-600 hover:underline">WAEC/JAMB Mathematics Tutorials (YouTube)</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">English Language Masterclass (YouTube)</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">Physics Concepts Explained (YouTube)</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">Biology Crash Course (YouTube)</a></li>
        </ul>
        <div className="mt-2 text-gray-400 text-sm">(Links coming soon)</div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          Study Tips
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Set a daily study schedule and stick to it.</li>
          <li>Practice past questions regularly.</li>
          <li>Join study groups for motivation and support.</li>
          <li>Take short breaks to improve focus and retention.</li>
        </ul>
      </div>
    </div>
  );
}
