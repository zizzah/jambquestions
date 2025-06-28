// app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/app/lid/action/email';

// Initialize postgres connection with better error handling
let sql: postgres.Sql;

try {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL environment variable is not set');
  }
  
  sql = postgres(process.env.POSTGRES_URL, { 
    ssl: 'require',
    max: 1, // Limit connections for serverless
    idle_timeout: 20,
    connect_timeout: 10,
  });
} catch (error) {
  console.error('Database connection error:', error);
}

export async function POST(request: NextRequest) {
  try {
    // Check if database connection exists
    if (!sql) {
      console.error('Database connection not available');
      return NextResponse.json(
        { error: 'Database connection error' },
        { status: 500 }
      );
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    console.log('Checking for email:', normalizedEmail);

    // Check if user exists with better error handling
    let users;
    try {
      users = await sql`
        SELECT id, email FROM users 
        WHERE email = ${normalizedEmail}
      `;
    } catch (dbError) {
      console.error('Database query error:', dbError);
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      );
    }
    
    console.log('Users found:', users.length);

    if (users.length === 0) {
      // Don't reveal that the email doesn't exist for security
      console.log('Email not found in database, returning success message without sending email');
      return NextResponse.json(
        { 
          message: 'If an account with that email exists, we have sent a password reset link.',
          emailSent: false
        },
        { status: 200 }
      );
    }

    console.log('Email found, proceeding with reset token generation');

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    try {
      // Delete any existing tokens for this email
      await sql`
        DELETE FROM password_reset_tokens 
        WHERE email = ${normalizedEmail}
      `;

      // Insert new reset token
      await sql`
        INSERT INTO password_reset_tokens (email, token, expires_at)
        VALUES (${normalizedEmail}, ${resetToken}, ${expiresAt})
      `;
    } catch (dbError) {
      console.error('Database operation error:', dbError);
      return NextResponse.json(
        { error: 'Failed to create reset token' },
        { status: 500 }
      );
    }

    // Send reset email
    let emailResult;
    try {
      emailResult = await sendPasswordResetEmail(normalizedEmail, resetToken);
    } catch (emailError) {
      console.error('Email service error:', emailError);
      return NextResponse.json(
        { error: 'Email service unavailable' },
        { status: 500 }
      );
    }

    if (!emailResult.success) {
      console.error('Failed to send reset email:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send reset email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'If an account with that email exists, we have sent a password reset link.',
        emailSent: true
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Forgot password error:', error);
    
    // More specific error logging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}