'use client';

import React, { useState, useEffect } from 'react';
import Header from './ui/header';
import Link from 'next/link';
import { statss,subjectss,features} from './lid/data';

export default function JAMBQuizLanding() {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);







  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % statss.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
           <button className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all">
        <Link href="/login">
      Login
      </Link>
            </button>
        </Header>
        {/* Hero Section */}
        <main className="container mx-auto px-6 py-12">
          <div className={`text-center max-w-4xl mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <span className="text-yellow-400 mr-2">⭐</span>
              <span className="text-sm">Nigeria&apos;s #1 JAMB Prep Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              Ace Your JAMB
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                With Confidence
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Master every subject with our comprehensive question bank, 
              smart practice sessions, and detailed explanations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                Start Practicing Now
                <span className="ml-2 text-lg group-hover:translate-x-1 transition-transform inline-block">→</span>
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300">
                View Sample Questions
              </button>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {statss.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center transform transition-all duration-500 ${
                    currentStat === index ? 'scale-110' : 'scale-100 opacity-75'
                  }`}
                >
                  <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">All JAMB Subjects Covered</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {subjectss.map((subject, index) => (
                <div 
                  key={index}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="text-3xl mb-3">{subject.icon}</div>
                  <h3 className="font-semibold text-sm">{subject.name}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose JAMBPrep?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories Preview */}
          <div className="max-w-4xl mx-auto text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">⭐</span>
              ))}
            </div>
            <blockquote className="text-xl italic mb-4">
              &quot;JAMBPrep helped me increase my score from 180 to 310! The explanations are so clear and the practice questions are exactly like the real exam.&quot;
            </blockquote>
            <cite className="text-gray-300">- Adunni O., JAMB 2024 (Score: 310)</cite>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Success Journey?</h2>
            <p className="text-gray-300 mb-8">Join thousands of students who have achieved their JAMB goals with us.</p>
            <Link href='/register' >
            <button className="group px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto">
              Get Started - It&apos;s Free
              <span className="ml-3 text-xl">✓</span>
            </button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}