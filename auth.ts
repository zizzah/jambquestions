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
      /**
       * This function is called when the user tries to sign in.
       * It validates the `credentials` object against the expected
       * shape of the user's email and password. If the credentials are
       * valid, it fetches the user's data from the database and checks
       * if the provided password matches the hashed password from the
       * database. If the passwords match, it returns the user data.
       * If the credentials are invalid, or if the passwords don't match,
       * it returns `null`.
       * @param credentials The user's email and password.
       * @returns The user data if the credentials are valid and the passwords match, otherwise `null`.
       */
async authorize(credentials): Promise<User | null> {
  const parsedCredentials = z
    .object({ email: z.string().email(), password: z.string().min(6) })
    .safeParse(credentials);

  if (!parsedCredentials.success) {
    console.error('Failed to parse credentials:', parsedCredentials.error.flatten());
    return null;
  }

  const { email, password } = parsedCredentials.data;
  const user = await getUser(email);
   console.log(user)
  if (!user) return null;

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (passwordsMatch) {
    return user;
  }

  console.error('Invalid credentials or password mismatch');
  return null;
}
    }),
  ],
});