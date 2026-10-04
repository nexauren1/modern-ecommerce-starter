# ModernCommerce Starter

A polished e-commerce starter template built for customization and resale.

## Current foundation

- Next.js 16.3
- React 19
- TypeScript
- Responsive storefront
- Demo product catalog
- Shop page
- Admin dashboard foundation
- Demo Mode without a backend
- Firebase-ready integration
- Environment variable template

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

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

### Product goal

The final Payhip product should be a complete commerce starter, not only a visual theme. A buyer should be able to customize branding, connect a backend, add products and continue development from a documented codebase.
