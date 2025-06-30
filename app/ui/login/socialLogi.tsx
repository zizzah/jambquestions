'use client';

import React from 'react';

interface SocialLoginProps {
  onGoogleLogin?: () => void;
  onFacebookLogin?: () => void;
}

export default function SocialLogin({ onGoogleLogin, onFacebookLogin }: SocialLoginProps) {
  const handleGoogleClick = () => {
    if (onGoogleLogin) {
      onGoogleLogin();
    } else {
      console.log('Google login clicked');
    }
  };

  const handleFacebookClick = () => {
    if (onFacebookLogin) {
      onFacebookLogin();
    } else {
      console.log('Facebook login clicked');
    }
  };

  return (
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
        <button 
          onClick={handleGoogleClick}
          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/10 transition-all flex items-center justify-center"
        >
          <span className="mr-2">📧</span>
          <span className="text-sm font-medium">Google</span>
        </button>
        <button 
          onClick={handleFacebookClick}
          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/10 transition-all flex items-center justify-center"
        >
          <span className="mr-2">📱</span>
          <span className="text-sm font-medium">Facebook</span>
        </button>
      </div>
    </div>
  );
}