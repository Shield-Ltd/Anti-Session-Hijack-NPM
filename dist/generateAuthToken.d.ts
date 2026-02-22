interface GenerateAuthTokenOptions {
    payload: Record<string, any>;
    expiresIn?: string;
    algorithm?: string;
}
export declare function generateAuthToken(jwtSecret: string, options: GenerateAuthTokenOptions): Promise<string>;
export {};
