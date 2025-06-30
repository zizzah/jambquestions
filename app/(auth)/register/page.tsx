import { Suspense } from 'react';
import { Option } from '../../lid/data';
import Header from '../../ui/login/header';
import Whattoget from '../../ui/login/whattoget';
import Terms from '../../ui/login/terms';
import Tips from '../../ui/login/subjectSelectTip';
import Link from 'next/link';
import AnimatedBackground from '@/app/ui/register/animatedBackground';
import RegistrationClientWrapper from '@/app/ui/register/registrationClientWrapper';

const option: Option = {
  src: '/login',
  item: '   Already have an account?'
};

export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
      {/* Animated background elements */}
      <AnimatedBackground />

      <div className="relative z-10">
        {/* Header */}
        <Header option={option} />

        {/* Main Content with Client-side Logic */}
        < Suspense >
        <RegistrationClientWrapper>
          {/* Terms Component */}
          <Terms />
          
          {/* Login Link */}
          <div className="mt-8 text-center">
            <Link href='/login'>
              <p className="text-gray-300 text-sm">
                Already have an account?{' '}
                <span className="text-yellow-400 hover:underline font-semibold cursor-pointer">
                  Sign In
                </span>
              </p>
            </Link>
          </div>
          
          {/* Benefits Preview */}
          <Whattoget />
          
          {/* Subject Selection Tips */}
          <Tips />
        </RegistrationClientWrapper>
        </ Suspense >
      </div>
    </div>
  );
}