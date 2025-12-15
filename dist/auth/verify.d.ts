import { DBOptions, VerifyInput, VerifyResult } from '../types';
export declare function verifySession(input: VerifyInput, db: any, fingerprint: string, options: DBOptions): Promise<VerifyResult>;
