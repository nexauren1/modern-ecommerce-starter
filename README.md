# Luma Table — Restaurant Website Template

A premium responsive restaurant website template built with Next.js and TypeScript.

## Included
- Home, Menu, About, Gallery and Contact pages
- Reservation form with Processing and Success states
- FAQ accordion
- Mobile navigation
- Scroll animations with reduced-motion support
- Cookie notice and Cookie Policy
- Privacy Policy and Terms pages
- Custom 404 page
- Responsive layouts and accessible form labels
- SEO metadata
- Static export for simple hosting
- GitHub Actions build verification

## Customize
Replace the demo brand, images, menu, prices, contacts, opening hours and legal copy. The reservation/contact flows are intentionally front-end demos; connect them to your preferred booking provider, email service, CRM or backend.

## Run
```bash
npm install
npm run dev
npm run build
```

The production export is generated in `out/`.

## Structure
- `app/` routes
- `components/` reusable UI and interactions
- `lib/content.ts` editable demo content
- `app/globals.css` visual system
- `.github/workflows/build.yml` build check