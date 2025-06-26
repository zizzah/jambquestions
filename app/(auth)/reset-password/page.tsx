// app/reset-password/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    if (!token) {
      setError('Invalid reset link. Please request a new password reset.');
    }
  }, [token]);

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setError('Invalid reset token');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setError(data.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl max-w-md mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❌</span>
            </div>
            <h1 className="text-2xl font-bold mb-4">Invalid Reset Link</h1>
            <p className="text-gray-300 text-sm mb-6">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link href="/forgot-password">
              <button className="w-full py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                Request New Reset Link
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className={`max-w-md w-full transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Form Container */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
            {!success ? (
              <>
                {/* Header Section */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔑</span>
                  </div>
                  <h1 className="text-2xl font-bold mb-2">Reset Your Password</h1>
                  <p className="text-gray-300 text-sm">
                    Enter your new password below
                  </p>
                </div>

                {/* Password Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (error) setError('');
                        }}
                        required
                        disabled={isLoading}
                        className="w-full px-4 py-3 pr-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all text-white placeholder-gray-400 disabled:opacity-50"
                        placeholder="Enter new password"
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
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (error) setError('');
                      }}
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all text-white placeholder-gray-400 disabled:opacity-50"
                      placeholder="Confirm new password"
                    />
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-sm">Password Requirements:</h3>
                    <div className="space-y-1 text-xs text-gray-300">
                      <div className={`flex items-center ${password.length >= 8 ? 'text-green-400' : ''}`}>
                        <span className="mr-2">{password.length >= 8 ? '✅' : '⚪'}</span>
                        At least 8 characters
                      </div>
                      <div className={`flex items-center ${/(?=.*[a-z])/.test(password) ? 'text-green-400' : ''}`}>
                        <span className="mr-2">{/(?=.*[a-z])/.test(password) ? '✅' : '⚪'}</span>
                        One lowercase letter
                      </div>
                      <div className={`flex items-center ${/(?=.*[A-Z])/.test(password) ? 'text-green-400' : ''}`}>
                        <span className="mr-2">{/(?=.*[A-Z])/.test(password) ? '✅' : '⚪'}</span>
                        One uppercase letter
                      </div>
                      <div className={`flex items-center ${/(?=.*\d)/.test(password) ? 'text-green-400' : ''}`}>
                        <span className="mr-2">{/(?=.*\d)/.test(password) ? '✅' : '⚪'}</span>
                        One number
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-red-400 text-sm flex items-center">
                        <span className="mr-2">⚠️</span>
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Resetting Password...
                      </>
                    ) : (
                      <>
                        Reset Password
                        <span className="ml-2 text-lg">🔒</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✅</span>
                  </div>
                  <h1 className="text-2xl font-bold mb-2">Password Reset!</h1>
                  <p className="text-gray-300 text-sm mb-6">
                    Your password has been successfully reset. You will be redirected to the login page in a few seconds.
                  </p>
                  <Link href="/login">
                    <button className="w-full py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                      Go to Login
                    </button>
                  </Link>
                </div>
              </>
            )}

            {/* Back to Login */}
            {!success && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}