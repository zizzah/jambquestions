import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login', // Add error page
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      const isOnRegister = nextUrl.pathname.startsWith('/register');
      const isOnForgotPassword = nextUrl.pathname.startsWith('/forgot-password');
      const isOnResetPassword = nextUrl.pathname.startsWith('/reset-password');
      console.log(auth?.user)
      // Allow access to auth-related pages
      if (isOnLogin || isOnRegister || isOnForgotPassword || isOnResetPassword) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
      }
      
      // Protect dashboard routes
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL('/login', nextUrl)); // Redirect unauthenticated users to login page
      }
      
      // Allow access to other pages
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
  debug: process.env.NODE_ENV === 'development', // Enable debug in development
} satisfies NextAuthConfig;