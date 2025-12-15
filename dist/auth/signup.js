import { hashPassword, generateUUID } from '../utils/crypto';
export async function signup(input, db) {
    const { name, email, password } = input;
    if (!name || !email || !password) {
        throw new Error('Name, email, and password are required');
    }
    // Check if user exists
    const existingUsers = await db `
    SELECT id FROM users WHERE email = ${email}
  `;
    if (existingUsers.length > 0) {
        throw new Error('User with this email already exists');
    }
    // Hash password
    const passwordHash = await hashPassword(password);
    // Generate UUID for user
    const userId = generateUUID();
    // Create user
    const newUsers = await db `
    INSERT INTO users (id, name, email, password_hash)
    VALUES (${userId}, ${name}, ${email}, ${passwordHash})
    RETURNING id, name, email, created_at
  `;
    const newUser = newUsers[0];
    return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        created_at: newUser.created_at,
    };
}
