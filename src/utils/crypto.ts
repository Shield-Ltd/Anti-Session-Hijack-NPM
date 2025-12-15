import * as bcrypt from 'bcryptjs';
import { createHash, randomUUID } from 'crypto';

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

// Token hashing
export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

// Generate UUID
export function generateUUID(): string {
  return randomUUID();
}

// Generate random string for nonce
export function generateNonce(): string {
  return createHash('sha256')
    .update(randomUUID() + Date.now().toString())
    .digest('hex')
    .substring(0, 32);
}