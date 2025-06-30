'use client';

import React from 'react';
import { nigerianStates } from '../../lid/data';

interface PersonalInfoFormProps {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    phone: string;
    state: string;
    targetScore: string;
  };
  showPassword: boolean;
  showConfirmPassword: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onShowPasswordToggle: () => void;
  onShowConfirmPasswordToggle: () => void;
  onNext: () => void;
}

export default function PersonalInfoForm({
  formData,
  showPassword,
  showConfirmPassword,
  onInputChange,
  onShowPasswordToggle,
  onShowConfirmPasswordToggle,
  onNext
}: PersonalInfoFormProps) {
  return (
    <>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">👤</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Join JAMBPrep</h1>
        <p className="text-gray-300 text-sm">
          Let&apos;s start with your basic information
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
              onChange={onInputChange}
              required
              className="w-full px-4 py-3 pr-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all text-white placeholder-gray-400"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={onShowPasswordToggle}
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
              onChange={onInputChange}
              required
              className="w-full px-4 py-3 pr-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all text-white placeholder-gray-400"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={onShowConfirmPasswordToggle}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onNext}
          className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
        >
          Next: Select Subjects
          <span className="ml-2 text-lg">→</span>
        </button>
      </div>
    </>
  );
}