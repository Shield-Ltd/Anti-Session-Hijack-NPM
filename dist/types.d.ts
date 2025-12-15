export interface User {
    id: string;
    name: string;
    email: string;
    password_hash?: string;
    created_at?: Date | string;
}
export interface Session {
    id: string;
    user_id: string;
    auth_token_hash: string;
    fingerprint: string;
    created_at: Date | string;
}
export interface SignupInput {
    name: string;
    email: string;
    password: string;
}
export interface SignupResult {
    id: string;
    name: string;
    email: string;
    created_at: string;
}
export interface LoginInput {
    email: string;
    password: string;
}
export interface LoginResult {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}
export interface VerifyInput {
    authToken: string;
}
export interface VerifyResult {
    valid: boolean;
    hijacked?: boolean;
    user?: {
        id: string;
        name: string;
        email: string;
    };
}
export interface DBOptions {
    jwtSecret: string;
    jwtExpiry?: string;
}
