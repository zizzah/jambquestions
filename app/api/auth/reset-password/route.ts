// app/api/auth/reset-password/route.ts
import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';
import bcrypt from 'bcryptjs';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Find valid token
    const tokenRecords = await sql`
      SELECT email, expires_at, used 
      FROM password_reset_tokens 
      WHERE token = ${token}
    `;

    if (tokenRecords.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    const tokenRecord = tokenRecords[0];

    // Check if token is expired
    if (new Date() > new Date(tokenRecord.expires_at)) {
      return NextResponse.json(
        { error: 'Reset token has expired' },
        { status: 400 }
      );
    }

    // Check if token is already used
    if (tokenRecord.used) {
      return NextResponse.json(
        { error: 'Reset token has already been used' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user password
    const updateResult = await sql`
      UPDATE users 
      SET password = ${hashedPassword}, updated_at = CURRENT_TIMESTAMP
      WHERE email = ${tokenRecord.email}
    `;

    if (updateResult.count === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Mark token as used
    await sql`
      UPDATE password_reset_tokens 
      SET used = true 
      WHERE token = ${token}
    `;

    // Optional: Delete all tokens for this user for extra security
    await sql`
      DELETE FROM password_reset_tokens 
      WHERE email = ${tokenRecord.email}
    `;

    return NextResponse.json(
      { message: 'Password has been reset successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}