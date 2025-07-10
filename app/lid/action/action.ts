// Updated action.ts - Fixed createUser function
'use server';

import { signIn, signOut, auth } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { createInitialUserData } from '../database/database';
import postgres from 'postgres';
import bcryptjs from 'bcryptjs';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

export interface UserData {
  name: string;
  email: string;
  avatar: string;
}

export type State = {
  success?: boolean;
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
    email?: string[];
    password?: string[];
    fullName?: string[];
    phone?: string[];
    state?: string[];
    targetScore?: string[];
    subjects?: string[];
  };
  message?: string | null;
};

// Invoice schemas (keep existing)
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// User registration schema
const UserSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  state: z.string().min(1, { message: 'Please select your state.' }),
  targetScore: z.string().min(1, { message: 'Please select your target score.' }),
  subjects: z.array(z.string()).length(4, { message: 'Please select exactly 4 subjects.' }),
});

const sql = postgres(process.env.POSTGRES_URL!, { 
  ssl: 'require',
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});

export async function createUser(prevState: State, formData: FormData): Promise<State> {
  console.log('createUser called with FormData');
  
  // Parse subjects from JSON string
  let subjects: string[] = [];
  try {
    const subjectsData = formData.get('subjects') as string;
    subjects = subjectsData ? JSON.parse(subjectsData) : [];
    console.log('Parsed subjects:', subjects);
  } catch (error) {
    console.error('Error parsing subjects:', error);
    return {
      success: false,
      errors: { subjects: ['Invalid subjects format'] },
      message: 'Failed to parse subject data.',
    };
  }

  // Extract and validate form data
  const rawFormData = {
    fullName: formData.get('fullName') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    phone: formData.get('phone') as string,
    state: formData.get('state') as string,
    targetScore: formData.get('targetScore') as string,
    subjects: subjects,
  };

  console.log('Raw form data:', { ...rawFormData, password: '[REDACTED]' });

  // Validate the form data
  const validatedFields = UserSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    console.error('Validation errors:', validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create user.',
    };
  }

  const { fullName, email, password, phone, state, targetScore, subjects: validatedSubjects } = validatedFields.data;

  try {
    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      console.log('User already exists:', email);
      return {
        success: false,
        errors: { email: ['An account with this email already exists.'] },
        message: 'User already exists.',
      };
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Insert user into database
    const result = await sql`
      INSERT INTO users (name, email, password, phone, state, target_score, subjects, created_at, updated_at)
      VALUES (${fullName}, ${email}, ${hashedPassword}, ${phone}, ${state}, ${targetScore}, ${JSON.stringify(validatedSubjects)}, NOW(), NOW())
      RETURNING id
    `;

    const userId = result[0].id;
    console.log('User created successfully with ID:', userId);

    // Create initial user dashboard data
    try {
      await createInitialUserData(userId);
      console.log('Initial user data created');
    } catch (error) {
      console.error('Error creating initial user data:', error);
      // Don't fail the registration if this fails
    }

    // Return success state - redirect will happen in the component
    return {
      success: true,
      message: 'Registration successful! Please sign in to continue.',
    };

  } catch (error) {
    console.error('Database error:', error);
    return {
      success: false,
      errors: {},
      message: 'Database error: Failed to create user.',
    };
  }
}

// Keep existing functions...
export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
   
  if(!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  
  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
    `;
  } catch (error) {
    console.log(error);
    return {
      errors: {},
      message: 'Database error: Failed to update invoice.',
    };
  }
  
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}






// ... (existing imports and code)


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log('Authentication attempt started');

    const result = await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: false, // Keep redirect: false to control it manually
    });

    console.log('SignIn result:', result);

    const session = await auth(); // Get the updated session after signIn
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
        // Decide how to handle this error. You might want to throw it or log more critically.
      }
    }

    // Revalidate the dashboard path after all data operations are done
    revalidatePath('/dashboard');
    console.log('Dashboard path revalidated.');

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

  // Finally, redirect after revalidation and data setup
  return'success';
}

// ... (rest of your action.ts)
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


export async function handleSignOut() {
  await signOut({ redirectTo: '/login' });
}

export async function initializeUserData(userId: string) {
  try {
    await createInitialUserData(userId);
    console.log('User data initialized successfully');
  } catch (error) {
    console.error('Error initializing user data:', error);
  }
}