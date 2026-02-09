# anti-session-hijack

A lightweight session hijacking detection library for modern web applications using Redis.
Designed for Next.js App Router, serverless, and edge-compatible environments.

This package detects session hijacking by binding an authentication token to a browser/device fingerprint and validating it on every request.

### Features
- Detects stolen or reused auth tokens
- Fingerprint-based session binding
- Redis-backed (Upstash / ioredis / node-redis)
- Framework-agnostic (works with Next.js, Express, etc.)
- Minimal & dependency-free

### Installation
```bash
npm i anti-session-hijack
```

### How It Works
- On login, hash the auth token and store it in Redis with the user’s fingerprint
- On every request, recompute the fingerprint
- Compare the stored fingerprint with the received one
- If they differ → session hijack detected

### API Reference
`addSession(authTokenHash, fingerprint, redis)`
Stores a new session in Redis.

##### Example
```bash
import { addSession } from "anti-session-hijack";

await addSession(authTokenHash, fingerprint, redis);
```

`verifySession(authTokenHash, fingerprint, redis)`
Verifies if the session is valid or hijacked.

Returns
```bash
{
  valid: boolean;
  hijacked?: boolean;
  receivedFingerprint?: string;
}
```

##### Example
```bash
import { verifySession } from "anti-session-hijack";

const result = await verifySession(authTokenHash, fingerprint, redis);
```


`email(service, senderEmail, senderAppPassword, receiverEmail)`
Sends a session hijack alert email to the affected user.
```bash
import { email } from "anti-session-hijack";
await email(
  "gmail",
  process.env.EMAIL_ID!,
  process.env.EMAIL_APP_PASSWORD!,
  userEmail
);
```
##### Email Content Sent to User: 
```bash
Subject: "Immediate Action Required: Session Compromise Detected",
Body:
Hello,

Shield detected unauthorized access to your account through a compromised session.

The affected session has been terminated to prevent further access.

REQUIRED ACTIONS:
- Log out from all devices immediately
- Change your account password immediately
- Log in again from a trusted device
- Review recent account activity

Failure to act quickly may put your data at risk.

If you do not recognize this activity, your credentials may be compromised.

— Shield Incident Response Team
shieldcorporationsltd@gmail.com
```
This email is intended to immediately alert the user and guide them to secure their account.

## Redis Compatibility

This package works with any Redis client that supports:
```bash
redis.get(key)
redis.set(key, value)
```
Recommended (Serverless): **Upstash Redis**

Also Works With:
- ioredis
- node-redis
- Redis Cloud


## Limitations
- Does not generate fingerprints (you must provide one): Recommended [FingerprintJS](https://github.com/fingerprintjs/fingerprintjs)
- Does not handle logout/session cleanup
- Fingerprint mismatch may occur for VPNs or browser updates

## Author
[Ashin Sabu Mathew](https://github.com/AshinSMathew)