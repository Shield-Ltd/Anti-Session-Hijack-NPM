export { signup } from './auth/signup';
export { login } from './auth/login';
export { verifySession } from './auth/verify';

export { getFingerprint } from './utils/getFingerprint';
export { 
  hashPassword, 
  verifyPassword, 
  hashToken,
  generateUUID,
  generateNonce 
} from './utils/crypto';

export { initAuthSchema } from './schema';

export type { 
  User, 
  SignupInput, 
  SignupResult, 
  LoginInput, 
  LoginResult, 
  VerifyInput, 
  VerifyResult,
  DBOptions 
} from './types';