/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { User } from './app/lid/datadefinition';
import postgres from 'postgres';
import type { JWT } from 'next-auth/jwt';

// Create a more robust database connection
const sql = postgres(process.env.POSTGRES_URL!, { 
  ssl: 'require',
  max: 1, // Limit connections for serverless
  idle_timeout: 20,
  connect_timeout: 10,
});

async function getUser(email: string): Promise<User | undefined> {
  try {
    console.log('Attempting to fetch user for email:', email);
    const users = await sql<User[]>`SELECT * FROM users WHERE email=${email.toLowerCase().trim()}`;
    console.log('User query result:', users.length > 0 ? 'User found' : 'No user found');
    return users[0];
  } catch (error) {
    console.error('Database error in getUser:', error);
    throw new Error('Failed to fetch user from database.');
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  secret: process.env.NEXTAUTH_SECRET, // Explicitly set secret
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('Authorization attempt started');
        
        // Validate credentials format
        const parsedCredentials = z
          .object({ 
            email: z.string().email().min(1), 
            password: z.string().min(6) 
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.error('Credential validation failed:', parsedCredentials.error.flatten());
          return null;
        }

        const { email, password } = parsedCredentials.data;
        
        try {
          const user = await getUser(email);
          
          if (!user) {
            console.error('User not found for email:', email);
            return null;
          }

          console.log('User found, checking password');
          const passwordsMatch = await bcrypt.compare(password, user.password);
          
          if (passwordsMatch) {
            console.log('Password match successful, returning user data');
            return {
              id: user.id.toString(), // Ensure ID is string
              email: user.email,
              name: user.name || user.email, // Fallback to email if name is null
            };
          } else {
            console.error('Password mismatch for user:', email);
            return null;
          }
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist user ID in the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback - url:', url, 'baseUrl:', baseUrl);
      
      // Handle relative URLs
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      
      // Handle same origin URLs
      if (url.startsWith(baseUrl)) {
        return url;
      }
      
      // Default redirect to dashboard
      return `${baseUrl}/dashboard`;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log('SignIn event:', { user: user?.email, account: account?.provider });
    },
    async signOut(message) {
      console.log('SignOut event triggered');
    },
  },
});