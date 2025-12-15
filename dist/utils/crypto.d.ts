export declare function hashPassword(password: string): Promise<string>;
export declare function verifyPassword(password: string, hash: string): Promise<boolean>;
export declare function hashToken(token: string): string;
export declare function generateUUID(): string;
export declare function generateNonce(): string;
