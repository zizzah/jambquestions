// Updated action.ts
'use server';

import { signIn, signOut, auth } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { createInitialUserData } from '../database/database';
import postgres from 'postgres';

export interface UserData {
  name: string;
  email: string;
  avatar: string;
}

const sql = postgres(process.env.POSTGRES_URL!, { 
  ssl: 'require',
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Check if user has dashboard data
async function checkUserDashboardData(userId: string): Promise<boolean> {
  try {
    const stats = await sql`SELECT id FROM user_user_statistics WHERE user_id = ${userId}`;
    return stats.length > 0;
  } catch (error) {
    console.error('Error checking user dashboard data:', error);
    return false;
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log('Authentication attempt started');
    
    const result = await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: false,
    });

    console.log('SignIn result:', result);
    
    // 🔥 INITIALIZE USER DATA AFTER SUCCESSFUL SIGN IN
    const session = await auth();
    if (session?.user?.id) {
      try {
        const hasDashboardData = await checkUserDashboardData(session.user.id);
        
        if (!hasDashboardData) {
          console.log('Creating initial dashboard data for user:', session.user.id);
          await createInitialUserData(session.user.id);
          console.log('Initial dashboard data created successfully');
        }
      } catch (error) {
        console.error('Error initializing user dashboard data:', error);
        // Don't prevent login if dashboard init fails
      }
    }
    
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials. Please check your email and password.';
        case 'CallbackRouteError':
          return 'Authentication failed. Please try again.';
        default:
          return 'Something went wrong. Please try again.';
      }
    }
    return 'An unexpected error occurred. Please try again.';
  }
  
  redirect('/dashboard');
}

export async function handleSignOut() {
  await signOut({ redirectTo: '/login' });
}

// You can also create a manual initialization function
export async function initializeUserData(userId: string) {
  try {
    await createInitialUserData(userId);
    console.log('User data initialized successfully');
  } catch (error) {
    console.error('Error initializing user data:', error);
  }


}