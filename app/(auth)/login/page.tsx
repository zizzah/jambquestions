import React from 'react';
import Header from '../../ui/login/header';
import { Option } from '../../lid/data';
import LoginForm from '../../ui/login/loginForm';
import RegisterLink from '../../ui/login/registerLink';
import BenefitsPreview from '../../ui/login/benefitsPreview';
import SocialLogin from '../../ui/login/socialLogi';
import AnimatedBackground from '../../ui/login/animatedBackground';


const option: Option = {
  src: "/help",
  item: "   Need Help?"
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
      {/* Animated background elements */}
      <AnimatedBackground />

      <div className="relative z-10">
        {/* Header */}
        <Header option={option} />
        
        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <div className="max-w-md mx-auto">
            {/* Login Form */}
            <LoginForm />
            
            {/* Social Login */}
            <SocialLogin />
            
            {/* Register Link */}
            <RegisterLink />
            
            {/* Benefits Preview */}
            <BenefitsPreview />
          </div>
        </main>
      </div>
    </div>
  );
}