// app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/app/lid/action/email';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    console.log('Checking for email:', normalizedEmail);

    // Check if user exists
    const users = await sql`
      SELECT id, email FROM users 
      WHERE email = ${normalizedEmail}
    `;
    
    console.log('Users found:', users.length);

    if (users.length === 0) {
      // Don't reveal that the email doesn't exist for security
      // But return a different structure so frontend knows not to show "email sent" UI
      console.log('Email not found in database, returning success message without sending email');
      return NextResponse.json(
        { 
          message: 'If an account with that email exists, we have sent a password reset link.',
          emailSent: false  // Add this flag
        },
        { status: 200 }
      );
    }

    console.log('Email found, proceeding with reset token generation');

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

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

    // Send reset email
    const emailResult = await sendPasswordResetEmail(normalizedEmail, resetToken);

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
        emailSent: true  // Add this flag
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}