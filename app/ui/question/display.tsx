'use client';

import  { useState, useEffect } from 'react';

import { BookOpen } from 'lucide-react';

const Display = () => {
      const [isVisible, setIsVisible] = useState(false);
    
useEffect(() => {
    setIsVisible(true);
  }, []);

    
  return (
      <div className={`text-center mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
              <BookOpen className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-sm">Sample Questions</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              Practice with Real
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                JAMB Questions
              </span>
            </h1>
            <p className="text-gray-300 text-lg">
              Experience the actual difficulty and format of JAMB questions
            </p>
          </div>
  );
}
export default Display