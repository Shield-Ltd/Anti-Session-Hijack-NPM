import { DBOptions, VerifyInput, VerifyResult } from '../types';
export declare function verifySession(input: VerifyInput, db: any, options: DBOptions): Promise<VerifyResult>;
