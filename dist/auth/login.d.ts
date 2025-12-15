import { DBOptions, LoginInput, LoginResult } from '../types';
export declare function login(input: LoginInput, db: any, options: DBOptions): Promise<LoginResult>;
