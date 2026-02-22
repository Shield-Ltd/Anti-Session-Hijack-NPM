# anti-session-hijack

<p align="center">
  <a href="https://www.npmjs.com/package/anti-session-hijack"><img src="https://img.shields.io/npm/v/anti-session-hijack.svg" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/anti-session-hijack"><img src="https://img.shields.io/npm/dt/anti-session-hijack.svg" alt="npm downloads" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" /></a>
</p>

<p align="center">
  A lightweight session hijacking detection library for modern web applications using Redis.<br/>
  Designed for Next.js App Router, serverless, and edge-compatible environments.
</p>

---

## Overview

`anti-session-hijack` detects session hijacking by binding an authentication token to a browser and device fingerprint, then validating that binding on every request. If the fingerprint changes — indicating a stolen token being used from a different device — the session is flagged immediately.

---

## Installation

```bash
npm install anti-session-hijack
```

---

## Features

- Stolen and reused authentication token detection
- Fingerprint-based session binding
- Redis-backed storage (compatible with Upstash, ioredis, and node-redis)
- Minimal, dependency-free core
- Full TypeScript support

---

## API Reference

### `generateFingerprint()`

Collects browser signals — hardware, OS, canvas, and more — and produces a SHA-256 hash of those components as a stable, unique device identifier.

**Parameters:** None

**Returns:** `Promise<FingerprintResult>` — An object containing `id` (a 64-character hexadecimal SHA-256 hash), the raw `components` used in hashing, the algorithm `version`, and a generation `time` timestamp.

```typescript
"use client";

import { generateFingerprint } from "anti-session-hijack";
import { useEffect, useState } from "react";

const [fingerprint, setFingerprint] = useState<string>("");

useEffect(() => {
  const load = async () => {
    const result = await generateFingerprint();
    setFingerprint(result.id);
  };

  load();
}, []);
```

---

### `addSession(authTokenHash, fingerprint, redis)`

Associates a hashed authentication token with a browser fingerprint in Redis. Call this upon successful user login.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `authTokenHash` | `string` | The hashed version of the authentication token |
| `fingerprint` | `string` | The unique browser fingerprint from the client |
| `redis` | `object` | A Redis client instance (`@upstash/redis`, `ioredis`, etc.) |

**Returns:** `Promise<void>`

```typescript
await addSession(hashedToken, userFingerprint, redisClient);
```

---

### `verifySession(authTokenHash, fingerprint, redis)`

Checks whether the provided fingerprint matches the one stored for the given authentication token. Call this on every protected request or route.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `authTokenHash` | `string` | The hashed authentication token to verify |
| `fingerprint` | `string` | The current browser fingerprint from the client |
| `redis` | `object` | A Redis client instance |

**Returns:** `Promise<object>`

| Field | Type | Description |
|---|---|---|
| `valid` | `boolean` | `true` if fingerprints match |
| `hijacked` | `boolean` | `true` if fingerprints do not match |
| `receivedFingerprint` | `string \| undefined` | Fingerprint currently stored in Redis (for debugging) |

```typescript
const result = await verifySession(hashedToken, currentFingerprint, redisClient);

if (result.hijacked) {
  // Revoke session, notify user, or trigger an alert
}
```

---

### `email(service, senderEmail, senderAppPassword, receiverEmail)`

Sends a standardized security alert email to the user indicating a potential session compromise.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `service` | `string` | Email service provider (e.g., `"gmail"`) |
| `senderEmail` | `string` | Address used to send the alert |
| `senderAppPassword` | `string` | Application-specific password for the sender account |
| `receiverEmail` | `string` | Recipient's email address |

**Returns:** `Promise<void>`

```typescript
await email(
  "gmail",
  process.env.EMAIL_USER,
  process.env.EMAIL_PASSWORD,
  userEmail
);
```

---

### `generateAuthToken(jwtSecret, options)`

Generates a signed JWT authentication token with a unique nonce to prevent replay attacks.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `jwtSecret` | `string` | Secret key used to sign the JWT |
| `options.payload` | `Record<string, any>` | Data to include in the token payload |
| `options.expiresIn` | `string` (optional) | Token expiration time (default: `"7d"`) |
| `options.algorithm` | `string` (optional) | Signing algorithm (default: `"HS256"`) |

**Returns:** `Promise<string>` — The signed JWT token.

```typescript
const token = await generateAuthToken("your-secret-key", {
  payload: { userId: 123, role: "admin" },
  expiresIn: "1h",
});
```

---

## Redis Compatibility

This package works with any Redis client that exposes standard `get` and `set` methods.

| Client | Support |
|---|---|
| `@upstash/redis` | Recommended for serverless and edge environments |
| `ioredis` | Fully supported |
| `redis` (node-redis) | Fully supported |

---

## Repository

[github.com/Shield-Ltd/Anti-Session-Hijack-NPM](https://github.com/Shield-Ltd/Anti-Session-Hijack-NPM)

---

## Authors

- [Ashin Sabu Mathew](https://github.com/AshinSMathew)
- [Deon Sebastian](https://github.com/deonsebastian)

---

## License

[MIT](https://opensource.org/licenses/MIT)