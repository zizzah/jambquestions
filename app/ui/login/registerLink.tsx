import React from 'react';
import Link from 'next/link';

export default function RegisterLink() {
  return (
    <div className="mt-8 text-center">
      <p className="text-gray-300 text-sm">
        Don&apos;t have an account?{' '}
        <Link href='/register' className="text-yellow-400 hover:underline font-semibold">
          Create Account
        </Link>
      </p>
    </div>
  );
}