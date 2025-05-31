'use client';

import React, { useState, useEffect } from 'react';
import { availableSubjects,nigerianStates } from '../lid/data';
import { Option } from '../lid/data';
import Header from '../ui/login/header';
import Whattoget from '../ui/login/whattoget';
import Terms from '../ui/login/terms';
import Tips from '../ui/login/subjectSelectTip';



const option:Option ={
    src:'/login',
    item:'   Already have an account?'
}
export default function RegistrationPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Personal Info, 2: Subject Selection
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    state: '',
    targetScore: '',
    subjects: [] as string[]
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubjectToggle = (subjectId: string) => {
    setFormData(prev => {
      const currentSubjects = prev.subjects;
      const isSelected = currentSubjects.includes(subjectId);
      
      // English is required and cannot be deselected
      if (subjectId === 'english' && isSelected) {
        return prev;
      }
      
      if (isSelected) {
        // Remove subject
        return {
          ...prev,
          subjects: currentSubjects.filter(id => id !== subjectId)
        };
      } else {
        // Add subject (max 4 subjects)
        if (currentSubjects.length >= 4) {
          alert('You can only select up to 4 subjects');
          return prev;
        }
        return {
          ...prev,
          subjects: [...currentSubjects, subjectId]
        };
      }
    });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      // Validate personal info
      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone || !formData.state || !formData.targetScore) {
        alert('Please fill in all fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      
      // Auto-select English as it's required
      if (!formData.subjects.includes('english')) {
        setFormData(prev => ({
          ...prev,
          subjects: ['english']
        }));
      }
      
      setCurrentStep(2);
    }
  };

  const handleSubmit = () => {
    if (formData.subjects.length !== 4) {
      alert('Please select exactly 4 subjects');
      return;
    }
    
    console.log('Registration data:', formData);
    alert('Registration successful! Welcome to JAMBPrep!');
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}

           <Header option={option}/>


        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <div className={`max-w-lg mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Progress Indicator */}
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

            {/* Form Container */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
              
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">👤</span>
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Join JAMBPrep</h1>
                    <p className="text-gray-300 text-sm">
                      Lets start with your basic information
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all text-white placeholder-gray-400"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all text-white placeholder-gray-400"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all text-white placeholder-gray-400"
                        placeholder="e.g., 08012345678"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">State of Origin</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all text-white"
                      >
                        <option value="" className="bg-gray-800">Select your state</option>
                        {nigerianStates.map(state => (
                          <option key={state} value={state} className="bg-gray-800">{state}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Target JAMB Score</label>
                      <select
                        name="targetScore"
                        value={formData.targetScore}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all text-white"
                      >
                        <option value="" className="bg-gray-800">Select target score</option>
                        <option value="200-250" className="bg-gray-800">200-250</option>
                        <option value="250-300" className="bg-gray-800">250-300</option>
                        <option value="300-350" className="bg-gray-800">300-350</option>
                        <option value="350-400" className="bg-gray-800">350-400</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 pr-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all text-white placeholder-gray-400"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showPassword ? '🙈' : '👁️'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Confirm Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 pr-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all text-white placeholder-gray-400"
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showConfirmPassword ? '🙈' : '👁️'}
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    >
                      Next: Select Subjects
                      <span className="ml-2 text-lg">→</span>
                    </button>
                  </div>
                </>
              )}

              {/* Step 2: Subject Selection */}
              {currentStep === 2 && (
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
                      {formData.subjects.length}/4 subjects selected
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    {availableSubjects.map(subject => (
                      <div
                        key={subject.id}
                        onClick={() => handleSubjectToggle(subject.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                          formData.subjects.includes(subject.id)
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
                            formData.subjects.includes(subject.id)
                              ? 'border-yellow-400 bg-yellow-400'
                              : 'border-white/40'
                          }`}>
                            {formData.subjects.includes(subject.id) && (
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
                      onClick={handleBack}
                      className="flex-1 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                    >
                      <span className="mr-2 text-lg">←</span>
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={formData.subjects.length !== 4}
                      className={`flex-1 py-4 font-bold rounded-lg transition-all duration-300 flex items-center justify-center ${
                        formData.subjects.length === 4
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Create Account
                      <span className="ml-2 text-lg">✓</span>
                    </button>
                  </div>
                </>
              )}

              {/* Terms and Conditions */}
              {currentStep === 1 && (
                 <Terms/>
              )}
            </div>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-300 text-sm">
                Already have an account?{' '}
                <button className="text-yellow-400 hover:underline font-semibold">
                  Sign In
                </button>
              </p>
            </div>
            {/* Benefits Preview - Only show on step 1 */}
            {currentStep === 1 && (
                    <Whattoget/>
            )}
            {/* Subject Selection Tips - Only show on step 2 */}
            {currentStep === 2 && (
                    <Tips/>
)}
          </div>
        </main>
      </div>
    </div>
  );
}