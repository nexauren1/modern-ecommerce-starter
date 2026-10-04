# ModernCommerce Starter — Customer Guide

This directory contains customer documentation and is intentionally separate from the application source code.

## 1. What you received

ModernCommerce Starter is an e-commerce starter kit designed for customization and development:

- responsive storefront
- product catalog
- private admin area
- owner authentication
- database integration
- image storage integration
- API-ready checkout and payments
- customer documentation

The application starts in **Demo Mode**. The customer connects their own services when moving to production.

## 2. Project structure

- `app/` — application pages, routes and APIs
- `components/` — UI components
- `lib/` — services and adapters
- `public/` — public assets
- `docs/` — customer documentation
- `demo/` — static GitHub Pages preview

## 3. Requirements

- Node.js 22+
- npm
- Next.js-compatible hosting for the full application
- external services selected by the store owner when production features are enabled

## 4. Install

1. Download or clone the project.
2. Run:

```bash
npm install
npm run dev
```

3. Open `http://localhost:3000`.

## 5. Private Admin

Do not hard-code an administrator password into the source.

Create `.env.local`:

```env
ADMIN_EMAIL=your-email
ADMIN_PASSWORD=your-strong-password
SESSION_SECRET=a-long-random-secret
```

Never commit the real values to GitHub.

Then open:

`/admin/login`

The dashboard uses a signed HTTP-only session cookie.

## 6. Variables and Secrets

The architecture is intentionally provider-neutral.

### Admin

`ADMIN_EMAIL` — private owner email.

`ADMIN_PASSWORD` — private owner password.

`SESSION_SECRET` — secret used to sign sessions.

### Database

`DATA_PROVIDER` identifies the selected data adapter.

Firebase is included as the first adapter. Buyers can create adapters for PostgreSQL, MySQL, Supabase, MongoDB, a custom API, or another service without redesigning the storefront.

### Firebase

`FIREBASE_ADMIN_*` variables are server-only.

`NEXT_PUBLIC_FIREBASE_*` variables are for the web SDK according to Firebase security rules.

Never put a service-account private key in a `NEXT_PUBLIC_*` variable.

### Storage

Use:

`STORAGE_PROVIDER`  
`STORAGE_BUCKET`  
`STORAGE_REGION`  
`STORAGE_ENDPOINT`  
`STORAGE_PUBLIC_BASE_URL`  
`STORAGE_API_KEY`  
`STORAGE_API_SECRET`

This supports S3-compatible storage, cloud storage, or a custom adapter.

### Payments

Use:

`PAYMENT_PROVIDER`  
`PAYMENT_API_BASE_URL`  
`PAYMENT_API_KEY`  
`PAYMENT_API_SECRET`  
`PAYMENT_CHECKOUT_PATH`  
`PAYMENT_WEBHOOK_SECRET`  
`PAYMENT_CURRENCY`

The application exposes:

- `POST /api/payments/create-checkout`
- `POST /api/payments/webhook`

The payment contract is provider-agnostic. A customer can connect an HTTP API-based gateway and implement the required adapter without replacing the storefront.

### Email

Use:

`EMAIL_PROVIDER`  
`EMAIL_API_BASE_URL`  
`EMAIL_API_KEY`  
`EMAIL_FROM`  
`EMAIL_REPLY_TO`

## 7. Choosing providers

You are not locked into a specific vendor.

The architecture is:

```text
Storefront
    ↓
Provider Interface
    ↓
Adapter
    ↓
Your service
```

This makes database, storage, email and payment services replaceable.

## 8. Add a product

Sign in to:

`/admin/login`

Then use:

`Products → Add product`

Enter:

- name
- category
- price
- compare-at price
- image
- badge
- rating
- description

In Demo Mode the store uses sample catalog data.

With Firebase Admin configured, products are written to Firestore and the storefront loads them from the same data source.

## 9. Images

The first version accepts an image URL.

For production, a storage adapter can provide direct image uploads while keeping API secrets server-side.

## 10. Payments

The template does not force every customer to use the same payment gateway.

The flow is:

```text
Cart
 ↓
Create order
 ↓
POST /api/payments/create-checkout
 ↓
Payment Provider
 ↓
Checkout
 ↓
Webhook
 ↓
Update order/payment
```

The webhook should validate the selected provider's secret and persist the payment result to the selected database.

## 11. Security

Never commit:

- `.env.local`
- service-account JSON
- private keys
- payment secrets
- webhook secrets
- passwords

Use your hosting provider's Secrets and Variables system.

## 12. Hosting

The full application uses server-side Next.js because Admin, APIs, databases, webhooks and secrets cannot depend only on static hosting.

GitHub Pages is used here only for the **visual demo** in `demo/`.

## 13. GitHub Pages Demo

The `demo/` directory is a static preview so you can inspect the UI without configuring a backend or secrets.

It is not the full application.

The Pages workflow publishes `demo/`.

Expected URL:

`https://nexauren1.github.io/modern-ecommerce-starter/`

## 14. CI

The `Build` workflow installs dependencies and runs `npm run build`.

Open the GitHub **Actions** tab to review results.

## 15. Production checklist

- [ ] create `.env.local`
- [ ] configure Admin
- [ ] choose a database
- [ ] choose storage
- [ ] configure email
- [ ] configure payments
- [ ] configure webhooks
- [ ] configure domain
- [ ] create database security rules
- [ ] test checkout
- [ ] test logout
- [ ] test image handling
- [ ] run a production build
- [ ] remove demo data before launch
