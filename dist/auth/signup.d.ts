import { DBOptions, SignupInput, SignupResult } from '../types';
export declare function signup(input: SignupInput, db: any, options: DBOptions): Promise<SignupResult>;
