export async function sha256(message) {
    // Use crypto.subtle if available (browser)
    if (typeof crypto !== 'undefined' && crypto.subtle) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    else {
        // Fallback or error? For a modern library, crypto.subtle is expected.
        // We can implement a JS fallback if needed, but for now let's error or return a mock.
        throw new Error('Web Crypto API not supported');
    }
}
