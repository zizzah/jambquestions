/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { authenticate } from '@/app/lid/action/action';
import { useFormState, useFormStatus } from 'react-dom';
import { signIn } from 'next-auth/react';

interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
}

function SubmitButton({ pending, loginMethod }: { pending: boolean; loginMethod: 'password' | 'otp' }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        loginMethod === 'password' ? 'Signing In...' : 'Verifying...'
      ) : (
        loginMethod === 'password' ? 'Sign In' : 'Verify Code'
      )}
      <span className="ml-2 text-lg">{pending ? '⏳' : '✓'}</span>
    </button>
  );
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  
  // OTP specific states
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [otpStep, setOtpStep] = useState<'email' | 'otp'>('email');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');

  useEffect(() => {
    if (errorMessage === 'success') {
      window.location.href = '/dashboard';
    }
  }, [errorMessage]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpLoading(true);
    setOtpError('');

    try {
      const response = await fetch('/api/auth/send-login-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setOtpStep('otp');
      } else {
        setOtpError(data.message || 'Failed to send login code');
      }
    } catch (error) {
      setOtpError(`Failed to send login code: ${error}`);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpLoading(true);
    setOtpError('');

    try {
      const result = await signIn('otp', {
        email,
        otp,
        redirect: false
      });

      if (result?.error) {
        setOtpError('Invalid or expired login code');
      } else if (result?.ok) {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setOtpError(`Login failed. Please try again: ${error}`);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setOtpLoading(true);
    setOtpError('');
    
    try {
      const response = await fetch('/api/auth/send-login-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setOtpError('New code sent! ✅');
        setTimeout(() => setOtpError(''), 3000);
      }
    } catch (error) {
      setOtpError(`Failed to resend code: ${error}`);
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🔐</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-gray-300 text-sm">
          Sign in to continue your JAMB preparation journey
        </p>
      </div>

      {/* Login Method Toggle */}
      <div className="flex mb-6 bg-white/5 rounded-lg p-1">
        <button
          type="button"
          onClick={() => {
            setLoginMethod('password');
            setOtpStep('email');
            setOtpError('');
          }}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            loginMethod === 'password'
              ? 'bg-yellow-400 text-black'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Password
        </button>
        <button
          type="button"
          onClick={() => {
            setLoginMethod('otp');
            setOtpStep('email');
            setOtpError('');
          }}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            loginMethod === 'otp'
              ? 'bg-yellow-400 text-black'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Email Code
        </button>
      </div>

      {loginMethod === 'password' ? (
        // Password Login Form
        <form action={dispatch} className="space-y-6">
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

          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm">{errorMessage}</p>
            </div>
          )}

          <SubmitButton pending={false} loginMethod="password" />

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
      ) : (
        // OTP Login Form
        <div className="space-y-6">
          {otpStep === 'email' ? (
            <form onSubmit={handleSendOTP}>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all text-white placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>
              
              {otpError && (
                <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{otpError}</p>
                </div>
              )}

              <SubmitButton pending={otpLoading} loginMethod="otp" />
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP}>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Login Code</label>
                <p className="text-gray-400 text-sm mb-3">Enter the 6-digit code sent to {email}</p>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all text-white placeholder-gray-400 text-center text-lg tracking-widest"
                  placeholder="000000"
                />
              </div>

              {otpError && (
                <div className={`mb-4 rounded-lg p-3 ${
                  otpError.includes('sent') 
                    ? 'bg-green-500/10 border border-green-500/20' 
                    : 'bg-red-500/10 border border-red-500/20'
                }`}>
                  <p className={`text-sm ${otpError.includes('sent') ? 'text-green-400' : 'text-red-400'}`}>
                    {otpError}
                  </p>
                </div>
              )}

              <div className="flex gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setOtpStep('email');
                    setOTP('');
                    setOtpError('');
                  }}
                  className="flex-1 py-3 bg-white/5 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={otpLoading || otp.length !== 6}
                  className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {otpLoading ? 'Verifying...' : 'Verify Code'}
                </button>
              </div>

              <button
                type="button"
                onClick={handleResendOTP}
                disabled={otpLoading}
                className="w-full text-sm text-gray-300 hover:text-yellow-400 transition-colors disabled:opacity-50"
              >
                Didn&apos;t receive the code? Resend
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}