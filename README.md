# ModernCommerce Starter

A polished e-commerce starter template built for customization and resale.

## Current foundation

- Next.js 16.3
- React 19
- TypeScript
- Responsive storefront
- Demo product catalog
- Shop page
- Private server-protected Admin
- Secure HTTP-only signed admin session cookie
- Demo Mode without a backend
- Firebase-ready integration
- Environment variable template
- GitHub Actions build check

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Private Admin

The owner enters the private Admin at:

`/admin/login`

Configure these **server-only** variables:

```env
ADMIN_EMAIL=owner@example.com
ADMIN_PASSWORD=choose-a-long-private-password
SESSION_SECRET=generate-a-long-random-secret
```

Do not add `NEXT_PUBLIC_` to these three values. They must never be committed to GitHub.

The authentication flow creates an HTTP-only, Secure-in-production, SameSite=Strict signed session cookie. The protected dashboard is under the `/admin` route group and redirects unauthenticated visitors to the login page.

## Firebase

The storefront intentionally works without Firebase first. When a buyer is ready for production data:

1. Create a Firebase project.
2. Register a Web App.
3. Put the Firebase Web App values in `.env.local`.
4. Restart the Next.js server.

Official guide: https://firebase.google.com/docs/web/setup

## Roadmap

### Storefront
- Product search
- Category filtering
- Product detail pages
- Cart
- Checkout
- Customer accounts

### Admin
- Product CRUD
- Image uploads
- Categories
- Orders
- Customers
- Inventory
- Store settings
- Backend setup wizard
- Firebase/Firestore persistence

### Product goal

The final Payhip product should be a complete commerce starter, not only a visual theme. A buyer should be able to customize branding, connect a backend, add products and continue development from a documented codebase.
