import React from 'react';

const benefits = [
  'Access to 50,000+ practice questions',
  'Detailed explanations for every answer',
  'Performance tracking and analytics',
  'Mock exams and timed practice'
];

export default function BenefitsPreview() {
  return (
    <div className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <h3 className="font-semibold mb-3 text-center">🚀 What you will get:</h3>
      <div className="space-y-2 text-sm text-gray-300">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center">
            <span className="text-yellow-400 mr-2">✓</span>
            {benefit}
          </div>
        ))}
      </div>
    </div>
  );
}