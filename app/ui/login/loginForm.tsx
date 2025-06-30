'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { authenticate } from '@/app/lid/action/action';
import { useFormState, useFormStatus } from 'react-dom';

interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Signing In...' : 'Sign In'}
      <span className="ml-2 text-lg">{pending ? '⏳' : '✓'}</span>
    </button>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
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

      <form action={dispatch} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            name="email"
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

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <p className="text-red-400 text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <SubmitButton />

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
      </form>
    </div>
  );
}