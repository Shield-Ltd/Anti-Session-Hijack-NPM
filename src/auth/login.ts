import * as jose from 'jose';
import { DBOptions, LoginInput, LoginResult } from '../types';
import { verifyPassword, hashToken, generateUUID, generateNonce } from '../utils/crypto';

export async function login(
  input: LoginInput,
  db: any,
  fingerprint: string,
  options: DBOptions
): Promise<LoginResult> {

  const { email, password } = input;
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  if (!fingerprint) {
    throw new Error('Error calculating fingerprint');
  }

  // Find user
  const users = await db`
    SELECT id, name, email, password_hash FROM users WHERE email = ${email}
  `;

  if (users.length === 0) {
    throw new Error('Invalid email or password');
  }

  const user = users[0];

  // Verify password
  const isPasswordValid = await verifyPassword(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const secretKey = new TextEncoder().encode(options.jwtSecret);
  const nonce = generateNonce();
  const sessionId = generateUUID();

  const token = await new jose.SignJWT({
    id: user.id,
    email: user.email,
    nonce,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(options.jwtExpiry || '7d')
    .sign(secretKey);

  // Hash the token for storage
  const authTokenHash = hashToken(token);
  const sessionUUID = generateUUID();

  // Store session
  await db`
    INSERT INTO sessions (id, user_id, auth_token_hash, fingerprint)
    VALUES (${sessionUUID}, ${user.id}, ${authTokenHash}, ${fingerprint})
    ON CONFLICT (user_id, fingerprint) 
    DO UPDATE SET 
      auth_token_hash = EXCLUDED.auth_token_hash,
      created_at = NOW()
  `;

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}