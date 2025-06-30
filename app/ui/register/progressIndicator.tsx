import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= 1 ? 'bg-yellow-400 text-black' : 'bg-white/20'}`}>
            1
          </div>
          <span className="text-sm">Personal Info</span>
        </div>
        <div className="flex-1 h-1 mx-4 bg-white/20 rounded">
          <div className={`h-full bg-yellow-400 rounded transition-all duration-500 ${currentStep >= 2 ? 'w-full' : 'w-0'}`}></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= 2 ? 'bg-yellow-400 text-black' : 'bg-white/20'}`}>
            2
          </div>
          <span className="text-sm">Subjects</span>
        </div>
      </div>
    </div>
  );
}