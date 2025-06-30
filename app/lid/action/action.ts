'use server';
 
import { signIn,signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
  
  // If we reach here, authentication was successful
  // NextAuth will handle the redirect automatically
  redirect('/dashboard');
}

export async function handleSignOut() {
  await signOut({ redirectTo: '/' });
}