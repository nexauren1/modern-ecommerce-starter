# Environment and Secrets Reference

This file is a provider-neutral reference for deploying the template.

## Server-only secrets

These must never be exposed to browser JavaScript:

- ADMIN_EMAIL
- ADMIN_PASSWORD
- SESSION_SECRET
- FIREBASE_ADMIN_PROJECT_ID
- FIREBASE_ADMIN_CLIENT_EMAIL
- FIREBASE_ADMIN_PRIVATE_KEY
- STORAGE_API_KEY
- STORAGE_API_SECRET
- PAYMENT_API_KEY
- PAYMENT_API_SECRET
- PAYMENT_WEBHOOK_SECRET
- EMAIL_API_KEY

## Browser-visible configuration

Only values explicitly prefixed with `NEXT_PUBLIC_` are exposed to the client bundle.

Examples:

- NEXT_PUBLIC_STORE_NAME
- NEXT_PUBLIC_STORE_URL
- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID

Browser visibility does not automatically make a service secure. Database and storage rules must still be configured correctly.

## Deployment platforms

Use the platform's secret manager/environment settings rather than committing secrets.

Examples of configuration concepts supported by most platforms:

```text
Variables → regular configuration
Secrets   → credentials, private keys and tokens
```

## Provider selection

The application uses provider variables rather than hard-coding one vendor:

```env
DATA_PROVIDER=firebase
STORAGE_PROVIDER=custom
PAYMENT_PROVIDER=custom
EMAIL_PROVIDER=custom
```

Replace adapters when another service is selected.

## Rotation

Rotate secrets after:

- accidental exposure
- team member access changes
- suspicious activity
- provider credential changes
- production handover

Never put real secrets in issue descriptions, README files or screenshots.
