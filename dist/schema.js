export async function initAuthSchema(db) {
    try {
        console.log('Authentication schema initialized successfully');
    }
    catch (error) {
        console.error('Failed to initialize authentication schema:', error);
        throw error;
    }
}
