// API route: app/api/auth/send-login-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { User } from '@/app/lid/datadefinition';

const sql = postgres(process.env.POSTGRES_URL!, { 
  ssl: 'require',
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Create nodemailer transporter (using your existing email config)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS?.replace(/\s/g, ''), // Remove spaces from app password
  },
});

function generateLoginOTPEmail(otp: string, userName: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Your Login Code</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">🔐 Login Code</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #dee2e6;">
            <p>Hi ${userName || 'there'},</p>
            
            <p>You requested to log in to your JAMB preparation account. Use this code to complete your login:</p>
            
            <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
                <div style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 8px;">${otp}</div>
            </div>
            
            <p><strong>This code will expire in 10 minutes.</strong></p>
            
            <p>If you didn't request this login code, please ignore this email or contact support if you have concerns.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 14px; color: #6c757d;">
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    // Check if user exists
    const users = await sql<User[]>`SELECT * FROM users WHERE email = ${email.toLowerCase().trim()}`;
    
    if (users.length === 0) {
      return NextResponse.json({ message: 'User not found. Please register first.' }, { status: 404 });
    }

    const user = users[0];

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Clean up old unused login OTPs for this email
    await sql`
      DELETE FROM otps 
      WHERE email = ${email.toLowerCase().trim()} 
        AND type = 'LOGIN' 
        AND used = false
    `;

    // Store new OTP
    await sql`
      INSERT INTO otps (email, code, type, expires_at, used, created_at)
      VALUES (${email.toLowerCase().trim()}, ${otp}, 'LOGIN', ${expiresAt.toISOString()}, false, NOW())
    `;

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: '🔐 Your Login Code - JAMB Prep',
      html: generateLoginOTPEmail(otp, user.name)
    });

    return NextResponse.json({ message: 'Login code sent successfully' });
  } catch (error) {
    console.error('Error sending login OTP:', error);
    return NextResponse.json({ message: 'Failed to send login code' }, { status: 500 });
  }
}