import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { User } from './app/lid/datadefinition';
import postgres from 'postgres';
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.error('Failed to parse credentials:', parsedCredentials.error.flatten());
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);
        console.log(user);
        
        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) {
          // Return user object without password
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            // Add any other user properties you need, but exclude password
          };
        }

        console.error('Invalid credentials or password mismatch');
        return null;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to dashboard after successful login
      if (url.startsWith('/') || url.startsWith(baseUrl)) {
        return url.startsWith('/dashboard') ? url : `${baseUrl}/dashboard`;
      }
      return `${baseUrl}/dashboard`;
    },
  },
  session: {
    strategy: 'jwt',
  },
});