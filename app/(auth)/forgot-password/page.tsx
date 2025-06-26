'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../ui/login/header';
import { Option } from '../../lid/data';
import Link from 'next/link';

const option: Option = {
  src: "/login",
  item: "Back to Login"
}

export default function ForgotPasswordPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    if (error) setError(''); // Clear error when user types
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  



  const handleSubmit = async () => {
  if (!email.trim()) {
    setError('Please enter your email address');
    return;
  }

  if (!validateEmail(email)) {
    setError('Please enter a valid email address');
    return;
  }
  
  setIsLoading(true);
  setError('');
  
  try {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });

    const data = await response.json();

    if (response.ok) {
      // Only show "check your email" UI if email was actually sent
      if (data.emailSent === true) {
        setIsEmailSent(true);
      } else {
        // For security, show same message but don't change UI state
        // This way user can't tell if email exists or not
        setError(''); // Clear any errors
        alert('Password reset instructions have been sent to your email if an account exists.');
      }
    } else {
      setError(data.error || 'An error occurred. Please try again.');
    }
  } catch (error) {
    console.error('Error sending reset email:', error);
    setError('Network error. Please check your connection and try again.');
  } finally {
    setIsLoading(false);
  }
};

  const handleResendEmail = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await response.json();
        console.log(data)
      if (response.ok) {
        alert('Password reset link sent again!');
      } else {
        alert(data.error || 'Failed to resend email. Please try again.');
      }
    } catch (error) {
      console.error('Error resending email:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
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
        <Header option={option} />

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <div className={`max-w-md mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Form Container */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
              {!isEmailSent ? (
                <>
                  {/* Header Section */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🔐</span>
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
                    <p className="text-gray-300 text-sm">
                      No worries! Enter your email and we&apos;ll send you a reset link
                    </p>
                  </div>

                  {/* Email Form */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        required
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Enter your registered email"
                      />
                      {error && (
                        <p className="text-red-400 text-sm mt-2 flex items-center">
                          <span className="mr-1">⚠️</span>
                          {error}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="w-full py-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Sending Reset Link...
                        </>
                      ) : (
                        <>
                          Send Reset Link
                          <span className="ml-2 text-lg">📧</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Success State */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">✅</span>
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Check Your Email!</h1>
                    <p className="text-gray-300 text-sm mb-4">
                      We&lsquo;ve sent a password reset link to
                    </p>
                    <p className="text-yellow-400 font-semibold text-sm break-all">
                      {email}
                    </p>
                  </div>

                  {/* Instructions */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold mb-2 text-sm">📋 Next Steps:</h3>
                    <div className="space-y-2 text-xs text-gray-300">
                      <div className="flex items-start">
                        <span className="text-yellow-400 mr-2 mt-0.5">1.</span>
                        Check your email inbox (and spam folder)
                      </div>
                      <div className="flex items-start">
                        <span className="text-yellow-400 mr-2 mt-0.5">2.</span>
                        Click the reset link in the email
                      </div>
                      <div className="flex items-start">
                        <span className="text-yellow-400 mr-2 mt-0.5">3.</span>
                        Create a new secure password
                      </div>
                      <div className="flex items-start">
                        <span className="text-yellow-400 mr-2 mt-0.5">4.</span>
                        Sign in with your new password
                      </div>
                    </div>
                  </div>

                  {/* Resend Button */}
                  <button
                    type="button"
                    onClick={handleResendEmail}
                    disabled={isLoading}
                    className="w-full py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/10 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Resending...
                      </>
                    ) : (
                      <>
                        Didn&lsquo;t receive the email? Resend
                        <span className="ml-2">🔄</span>
                      </>
                    )}
                  </button>
                </>
              )}

              {/* Back to Login */}
              <div className="mt-8 text-center">
                <p className="text-gray-300 text-sm">
                  Remember your password?{' '}
                  <Link href='/login'>
                    <button className="text-yellow-400 hover:underline font-semibold">
                      Back to Login
                    </button>
                  </Link>
                </p>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold mb-3 text-center">🤔 Need Help?</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center">
                  <span className="text-blue-400 mr-2">•</span>
                  Reset link expires in 15 minutes
                </div>
                <div className="flex items-center">
                  <span className="text-blue-400 mr-2">•</span>
                  Check your spam/junk folder
                </div>
                <div className="flex items-center">
                  <span className="text-blue-400 mr-2">•</span>
                  Make sure the email address is correct
                </div>
                <div className="flex items-center">
                  <span className="text-blue-400 mr-2">•</span>
                  Still having trouble? Contact support
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}