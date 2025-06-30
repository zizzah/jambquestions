'use server';
 
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false, // Don't let NextAuth handle redirect
    });
    
    // If we reach here, authentication was successful
    if (result?.error) {
      return 'Invalid credentials.';
    }
    
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
  
  // Manually redirect after successful authentication
  redirect('/dashboard');
}

export async function handleSignOut() {
  await signOut({ redirectTo: '/' });
}