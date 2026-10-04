# GitHub Pages — Visual Demo

The full product uses server-side Next.js. GitHub Pages therefore does not host the production Admin/API/Firebase/checkout.

Pages is used for a static visual preview.

## One-time setup

On GitHub:

1. Open the repository.
2. Go to Settings.
3. Open Pages.
4. Under Build and deployment, choose GitHub Actions.
5. Return to Actions and run Deploy demo to GitHub Pages.

The workflow publishes the demo/ directory.

Expected URL:

https://nexauren1.github.io/modern-ecommerce-starter/

If the site does not open, check the workflow run and Settings → Pages.

No application secret is included in the demo.
