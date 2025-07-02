'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log('Authentication attempt started');
    
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    if (!email || !password) {
      return 'Email and password are required.';
    }

    // Use signIn without redirectTo to handle manually
    const result = await signIn('credentials', {
      email: email.toLowerCase().trim(),
      password,
      redirect: false,
    });

    console.log('SignIn result:', result);
    
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        case 'CallbackRouteError':
          return 'Authentication failed. Please try again.';
        default:
          return 'An authentication error occurred.';
      }
    }
    
    // If it's a redirect error (success case), handle it
    if (error && typeof error === 'object' && 'digest' in error) {
      // This is likely a redirect, which means success
      redirect('/dashboard');
    }
    
    throw error;
  }
  
  // If we get here without error, redirect to dashboard
  redirect('/dashboard');
}

export async function handleSignOut() {
  try {
    await signOut({ 
      redirect: true,
      redirectTo: '/login' 
    });
  } catch (error) {
    console.error('Sign out error:', error);
    redirect('/login');
  }
}