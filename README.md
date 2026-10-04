# ModernCommerce Starter

A polished e-commerce starter template built for customization and resale.

## Product

- Responsive storefront
- Private server-protected Admin
- Product CRUD
- Demo Mode
- Firebase/Firestore adapter
- Generic REST data adapter
- Provider-neutral payment API
- Storage and email provider variables
- GitHub Actions CI
- Static visual demo for GitHub Pages
- Customer guides in English and Portuguese

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Customer documentation

- [Customer Guide — English](docs/README.en-US.md)
- [Guia do Cliente — Português](docs/README.pt-BR.md)
- [API Reference — English](docs/API.en-US.md)
- [Referência de API — Português](docs/API.pt-BR.md)
- [Environment & Secrets](docs/ENVIRONMENT.md)
- [GitHub Pages Demo — English](docs/GITHUB-PAGES.en-US.md)
- [GitHub Pages Demo — Português](docs/GITHUB-PAGES.pt-BR.md)

## Private Admin

The owner signs in at `/admin/login`.

Server-only variables:

```env
ADMIN_EMAIL=
ADMIN_PASSWORD=
SESSION_SECRET=
```

Real secrets must be supplied through the deployment platform's environment/secrets manager and must never be committed.

## Provider-neutral architecture

Built-in data modes:

- `demo`
- `firebase`
- `rest`

The REST mode expects a products API at `DATA_API_BASE_URL` + `DATA_PRODUCTS_PATH` and uses `DATA_API_KEY` server-side.

Payment endpoints:

- `POST /api/payments/create-checkout`
- `POST /api/payments/webhook`

Payment, storage and email credentials are server-side environment variables.

## Demo

The static design preview lives in `demo/`.

After one-time GitHub Pages activation, the expected preview URL is:

https://nexauren1.github.io/modern-ecommerce-starter/

The Pages demo is a visual preview only. The complete application requires server-side Next.js hosting for Admin, APIs, data and payment webhooks.

## Build verification

GitHub Actions runs:

```bash
npm install
npm run build
```

The latest successful build has been verified by GitHub Actions before this documentation update.
