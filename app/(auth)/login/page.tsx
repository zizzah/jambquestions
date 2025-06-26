'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../ui/login/header';
import { Option } from '../../lid/data';
import Link from 'next/link';

  const option:Option ={
src:"/help",
item :"   Need Help?"
}
 function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = () => {
    console.log('Login data:', formData);
    alert('Login successful! Redirecting to dashboard...');
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


        <Header option={option} />
        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <div className={`max-w-md mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Form Container */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔑</span>
                </div>
                <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
                <p className="text-gray-300 text-sm">
                  Sign in to continue your JAMB preparation journey
                </p>
              </div>

              <div className="space-y-6">
                {/* Email Field */}
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

                {/* Password Field */}
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

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  Sign In
                  <span className="ml-2 text-lg">✓</span>
                </button>

                {/* Forgot Password */}
                <div className="text-center">
                  <Link href='/forgot-password'>
                  <button
                    type="button"
                    className="text-sm text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    Forgot Password?
                  </button>
                  </Link>
                </div>
              </div>

              {/* Social Login */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-transparent text-gray-300">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/10 transition-all flex items-center justify-center">
                    <span className="mr-2">📧</span>
                    <span className="text-sm font-medium">Google</span>
                  </button>
                  <button className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/10 transition-all flex items-center justify-center">
                    <span className="mr-2">📱</span>
                    <span className="text-sm font-medium">Facebook</span>
                  </button>
                </div>
              </div>

              {/* Register Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-300 text-sm">
                  Don&apos;t have an account?{' '}
                  <Link  href='/register'>
                  <button className="text-yellow-400 hover:underline font-semibold">
                    Create Account
                  </button>
                  </Link>
                </p>
              </div>
            </div>

            {/* Benefits Preview */}
            <div className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold mb-3 text-center">🚀 What you will get:</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-2">✓</span>
                  Access to 50,000+ practice questions
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-2">✓</span>
                  Detailed explanations for every answer
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-2">✓</span>
                  Performance tracking and analytics
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-2">✓</span>
                  Mock exams and timed practice
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


export default LoginPage