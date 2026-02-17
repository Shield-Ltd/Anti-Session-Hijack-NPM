# anti-session-hijack

[![npm version](https://img.shields.io/npm/v/anti-session-hijack.svg)](https://www.npmjs.com/package/anti-session-hijack)
[![npm downloads](https://img.shields.io/npm/dt/anti-session-hijack.svg)](https://www.npmjs.com/package/anti-session-hijack)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight session hijacking detection library for modern web applications using Redis. Designed for Next.js App Router, serverless, and edge-compatible environments.

This package detects session hijacking by binding an authentication token to a browser/device fingerprint and validating it on every request.

## GitHub Repository
[Anti Session Hijack](https://github.com/Shield-Ltd/Anti-Session-Hijack-NPM)

## Installation

```bash
npm install anti-session-hijack
```

## Features

- Detects stolen or reused authentication tokens.
- Fingerprint-based session binding.
- Redis-backed (compatible with Upstash, ioredis, and node-redis)
- Minimal and dependency-free core.
- TypeScript support included.

## Usage

### 1. Client-Side: Generate Fingerprint

To obtain the browser's unique identifier in a React or Next.js Client Component, use the `generateFingerprint` function inside a `useEffect` hook.

```typescript
import { generateFingerprint } from "anti-session-hijack";
import { useEffect, useState } from "react";

// ... inside your component
const [visitorId, setVisitorId] = useState<string>("");

useEffect(() => {
  const getFingerprint = async () => {
    const result = await generateFingerprint();
    setVisitorId(result.id);
  };

  getFingerprint();
}, []);
```

### 2. Server-Side: Manage Sessions

Import the server-side functions to add and verify sessions.

```typescript
import { addSession, verifySession, email } from "anti-session-hijack";
```

## API Reference

### `generateFingerprint()`

Collects browser signals (hardware, OS, canvas, etc.) to generate a unique fingerprint.

- **Parameters**: None.
- **Returns**: `Promise<FingerprintResult>`
  - `id` (string): The unique 64-character hexadecimal fingerprint hash.
  - `components` (object): The raw components used to generate the fingerprint.
  - `version` (string): The version of the fingerprinting algorithm.
  - `time` (number): Timestamp of generation.

### `addSession(authTokenHash, fingerprint, redis)`

Associates a hashed authentication token with a browser fingerprint in Redis. Call this function upon successful user login.

- **Parameters**:
  - `authTokenHash` (string): The hashed version of the authentication token.
  - `fingerprint` (string): The unique browser fingerprint generated on the client side.
  - `redis` (object): A Redis client instance (e.g., `@upstash/redis`, `ioredis`).
- **Returns**: `Promise<void>`

**Example:**
```typescript
await addSession(hashedToken, userFingerprint, redisClient);
```

### `verifySession(authTokenHash, fingerprint, redis)`

Checks if the provide fingerprint matches the one stored for the given authentication token. Call this on every protected request or route.

- **Parameters**:
  - `authTokenHash` (string): The hashed authentication token to verify.
  - `fingerprint` (string): The current browser fingerprint received from the client.
  - `redis` (object): The Redis client instance.
- **Returns**: `Promise<object>`
  - `valid` (boolean): `true` if the session is valid (fingerprints match), `false` otherwise.
  - `hijacked` (boolean): `true` if the fingerprints do not match (potential hijacking), `false` otherwise.
  - `receivedFingerprint` (string | undefined): The fingerprint currently stored in Redis (useful for debugging).

**Example:**
```typescript
const result = await verifySession(hashedToken, currentFingerprint, redisClient);

if (result.hijacked) {
  // Handle session hijacking (e.g., revoke session, send alert)
}
```

### `email(service, senderEmail, senderAppPassword, receiverEmail)`

Sends a standardized security alert email to the user indicating a session compromise.

- **Parameters**:
  - `service` (string): The email service provider (e.g., "gmail").
  - `senderEmail` (string): The email address used to send the alert.
  - `senderAppPassword` (string): The application-specific password for the sender email account.
  - `receiverEmail` (string): The recipient's email address.
- **Returns**: `Promise<void>`

**Example:**
```typescript
await email(
  "gmail",
  process.env.EMAIL_USER,
  process.env.EMAIL_PASSWORD,
  userEmail
);
```

## Redis Compatibility

This package is compatible with any Redis client that exposes standard `get` and `set` methods.

- **Recommended**: `@upstash/redis` (for serverless/edge).
- **Supported**: `ioredis`, `redis` (node-redis).

## Author

[Ashin Sabu Mathew](https://github.com/AshinSMathew)

[Deon Sebastian](https://github.com/deonsebastian)