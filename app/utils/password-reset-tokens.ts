// utils/password-reset-tokens.ts
import crypto from 'crypto';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export interface CreateTokenResult {
  token: string;
  expiresAt: Date;
  success: boolean;
  error?: string;
}

export async function createPasswordResetToken(email: string, expirationHours: number = 1): Promise<CreateTokenResult> {
  try {
    // Generate a secure random token
    const token = crypto.randomBytes(32).toString('hex');
    
    // Create expiration date (default 1 hour from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + expirationHours);
    
    console.log('Creating password reset token:', {
      email,
      expirationHours,
      expiresAt: expiresAt.toISOString(),
      currentTime: new Date().toISOString()
    });

    // Delete any existing tokens for this email first
    await sql`
      DELETE FROM password_reset_tokens 
      WHERE email = ${email}
    `;

    // Insert new token
    await sql`
      INSERT INTO password_reset_tokens (token, email, expires_at, created_at, used)
      VALUES (${token}, ${email}, ${expiresAt}, CURRENT_TIMESTAMP, false)
    `;

    console.log('Password reset token created successfully');

    return {
      token,
      expiresAt,
      success: true
    };

  } catch (error) {
    console.error('Error creating password reset token:', error);
    return {
      token: '',
      expiresAt: new Date(),
      success: false,
      error: 'Failed to create reset token'
    };
  }
}

export async function validateToken(token: string): Promise<{
  valid: boolean;
  email?: string;
  error?: string;
  expired?: boolean;
  used?: boolean;
}> {
  try {
    const tokenRecords = await sql`
      SELECT email, expires_at, used, created_at
      FROM password_reset_tokens 
      WHERE token = ${token}
    `;

    if (tokenRecords.length === 0) {
      return { valid: false, error: 'Token not found' };
    }

    const tokenRecord = tokenRecords[0];
    const now = new Date();
    const expiresAt = new Date(tokenRecord.expires_at);

    if (tokenRecord.used) {
      return { 
        valid: false, 
        error: 'Token already used', 
        used: true,
        email: tokenRecord.email 
      };
    }

    if (now > expiresAt) {
      return { 
        valid: false, 
        error: 'Token expired', 
        expired: true,
        email: tokenRecord.email 
      };
    }

    return { 
      valid: true, 
      email: tokenRecord.email 
    };

  } catch (error) {
    console.error('Error validating token:', error);
    return { 
      valid: false, 
      error: 'Database error' 
    };
  }
}

// Example usage in your forgot password API route:
export async function createAndSendResetEmail(email: string) {
  // Create token with 24 hours expiration
  const tokenResult = await createPasswordResetToken(email, 24);
  
  if (!tokenResult.success) {
    throw new Error(tokenResult.error || 'Failed to create token');
  }

  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${tokenResult.token}`;
  
  // Send email with resetUrl
  console.log('Reset URL:', resetUrl);
  console.log('Token expires at:', tokenResult.expiresAt.toISOString());
  
  return {
    resetUrl,
    expiresAt: tokenResult.expiresAt,
    token: tokenResult.token
  };
}