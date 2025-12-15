import * as jose from 'jose';
import { DBOptions, VerifyInput, VerifyResult } from '../types';
import { hashToken } from '../utils/crypto';
import { getFingerprint } from '../utils/getFingerprint';

export async function verifySession(
  input: VerifyInput,
  db: any,
  options: DBOptions
): Promise<VerifyResult> {

  const { authToken } = input;
  const fingerprint = await getFingerprint();

  if (!authToken) {
    return { valid: false };
  }

  if (!fingerprint) {
    throw new Error('Error calculating fingerprint');
  }

  try {
    // Verify JWT
    const secretKey = new TextEncoder().encode(options.jwtSecret);
    const { payload } = await jose.jwtVerify(authToken, secretKey);
    
    // Hash the token
    const authTokenHash = hashToken(authToken);

    // Check session
    const sessions = await db`
      SELECT s.*, u.id as user_id, u.name, u.email 
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.auth_token_hash = ${authTokenHash}
        AND s.fingerprint = ${fingerprint}
    `;

    if (sessions.length === 0) {
      // Check for hijacking
      const otherSessions = await db`
        SELECT id FROM sessions 
        WHERE auth_token_hash = ${authTokenHash}
          AND fingerprint != ${fingerprint}
      `;

      if (otherSessions.length > 0) {
        // Hijacking detected - invalidate all sessions for this user
        const userId = payload.id as string;
        await db`
          DELETE FROM sessions WHERE user_id = ${userId}
        `;

        return {
          valid: false,
          hijacked: true,
        };
      }

      return { valid: false };
    }

    const session = sessions[0];

    return {
      valid: true,
      hijacked: false,
      user: {
        id: session.user_id,
        name: session.name,
        email: session.email,
      },
    };
  } catch (error) {
    return { valid: false };
  }
}