# GitHub Pages — Visual Demo

The full product uses server-side Next.js. GitHub Pages therefore does not host the production Admin/API/Firebase/checkout.

Pages is used for the static visual preview in `demo/`.

## One-time setup

On GitHub:

1. Open the repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as Source.
4. Open **Actions**.
5. Manually run **Deploy demo to GitHub Pages**.

Creating the Pages site requires repository-level configuration, so the workflow does not try to change those settings automatically.

Expected URL:

https://nexauren1.github.io/modern-ecommerce-starter/

The published site is a visual demo only. The complete application remains the Next.js project with Admin, APIs, database, webhooks and secrets.

No application secret is included in the demo.
