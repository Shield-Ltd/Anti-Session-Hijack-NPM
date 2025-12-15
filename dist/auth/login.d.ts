import { DBOptions, LoginInput, LoginResult } from '../types';
export declare function login(input: LoginInput, db: any, fingerprint: string, options: DBOptions): Promise<LoginResult>;
