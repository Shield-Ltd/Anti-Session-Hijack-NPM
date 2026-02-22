import * as jose from "jose";
import { randomBytes } from "crypto";
function generateNonce(length = 16) {
    return randomBytes(length).toString("hex");
}
export async function generateAuthToken(jwtSecret, options) {
    if (!jwtSecret) {
        throw new Error("JWT secret is required");
    }
    if (!options?.payload) {
        throw new Error("Payload is required to generate token");
    }
    const { payload, expiresIn = "7d", algorithm = "HS256", } = options;
    const secretKey = new TextEncoder().encode(jwtSecret);
    const tokenPayload = {
        ...payload,
        nonce: generateNonce(),
    };
    const token = await new jose.SignJWT(tokenPayload)
        .setProtectedHeader({ alg: algorithm })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(secretKey);
    return token;
}
