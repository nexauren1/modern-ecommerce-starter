# ModernCommerce Starter - Client Guide
## Guia do Cliente - English / Português

> This document is the buyer-facing guide. It is intentionally kept separate from the application source.
>
> Este documento é o guia para o comprador. Ele é mantido separado do código-fonte da aplicação.

## 1. What you purchased / O que você comprou

**EN:** ModernCommerce Starter is an e-commerce starter with a responsive storefront, private owner Admin, product management and a backend-neutral integration layer.

**PT:** O ModernCommerce Starter é uma base de e-commerce com storefront responsivo, Admin privado do proprietário, gestão de produtos e uma camada de integração que não obriga o cliente a usar um serviço específico.

## 2. Requirements / Requisitos

**EN:** Node.js 22+, npm, a hosting provider capable of running Next.js server code, and optionally a database/backend service.

**PT:** Node.js 22+, npm, um serviço de hospedagem capaz de executar código server-side do Next.js e, opcionalmente, um serviço de banco/backend.

## 3. Install / Instalação

**EN**
```bash
npm install
npm run dev
```
Then open http://localhost:3000.

**PT**
```bash
npm install
npm run dev
```
Depois abra http://localhost:3000.

## 4. Private Admin / Admin privado

**EN:** The owner enters through `/admin/login`. Set these values in the hosting provider's secret/environment settings. Do not commit them to GitHub.

**PT:** O proprietário entra em `/admin/login`. Configure estes valores na área de variáveis/secrets do serviço de hospedagem. Não coloque os valores reais no GitHub.

```env
ADMIN_EMAIL=owner@example.com
ADMIN_PASSWORD=your-private-password
SESSION_SECRET=your-long-random-secret
```

## 5. Choose your backend / Escolha o backend

The template has three modes.

### Demo / Demonstração
```env
BACKEND_PROVIDER=demo
```
**EN:** No external backend is required. The store uses sample products. Admin is read-only for catalog mutations.

**PT:** Nenhum backend externo é necessário. A loja usa produtos de demonstração. O Admin fica somente para leitura de alterações de catálogo.

### Firebase / Firebase
```env
BACKEND_PROVIDER=firebase
```
Use a Firebase Admin service account on the server. Put private service-account values only in Secrets/Environment Variables.

**PT:** Use uma conta de serviço do Firebase Admin no servidor. Coloque os dados privados da service account apenas em Secrets/Environment Variables.

Required:
```env
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
```

For the browser Firebase SDK, only use the public Web App settings when needed:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Any REST backend / Qualquer backend REST
```env
BACKEND_PROVIDER=rest
BACKEND_API_BASE_URL=https://api.example.com
BACKEND_PRODUCTS_PATH=/products
BACKEND_API_KEY_HEADER=Authorization
BACKEND_API_KEY=
BACKEND_BEARER_TOKEN=
```

**EN:** This allows the buyer to use a custom API, Supabase Edge/API layer, Node/Express API, Laravel API, Django API, serverless API or another HTTP service, as long as it follows the product contract below.

**PT:** Isso permite usar uma API personalizada, Supabase Edge/API, Node/Express, Laravel, Django, serverless ou outro serviço HTTP, desde que siga o contrato abaixo.

### Product API contract / Contrato da API de produtos

**GET** `/products` -> either an array of products or `{ "products": [...] }`

**POST** `/products` -> create and return a product or `{ "product": {...} }`

**PUT** `/products/:id` -> update and return the product

**DELETE** `/products/:id` -> delete and return HTTP 2xx

Each product should contain:
```json
{
  "id": "product-id",
  "name": "Product name",
  "category": "Category",
  "price": 129,
  "compareAtPrice": 159,
  "description": "Description",
  "image": "https://...",
  "badge": "New",
  "rating": 4.9
}
```

## 6. Storage / Armazenamento

**EN:** The current product manager accepts image URLs, so you can use any image/CDN provider. If you want direct file uploads, connect your preferred object storage through your API layer.

**PT:** O gestor atual aceita URLs de imagens, por isso você pode usar qualquer serviço de imagens/CDN. Para uploads diretos, conecte o seu armazenamento preferido por meio da sua API.

Recommended patterns include Firebase Storage, S3-compatible storage, Cloudinary or another image/CDN service.

## 7. Payments / Pagamentos

**EN:** Payment processing is intentionally not hard-coded. Connect your preferred provider (Stripe, PayPal, Mercado Pago, Paddle or another provider available to you) through the checkout/backend layer.

**PT:** O processamento de pagamentos não é fixado no template. Conecte o seu provedor preferido (Stripe, PayPal, Mercado Pago, Paddle ou outro disponível para você) através da camada de checkout/backend.

Never put a private payment secret in a `NEXT_PUBLIC_` variable.

## 8. Email / Email

**EN:** Transactional email can be connected through Resend, Postmark, SendGrid, Amazon SES or another provider. Keep API keys server-side.

**PT:** Emails transacionais podem ser ligados ao Resend, Postmark, SendGrid, Amazon SES ou outro provedor. Mantenha as API keys no servidor.

## 9. Hosting / Hospedagem

**EN:** Deploy the full Next.js application to a provider that supports server-side Next.js routes and environment variables. Vercel, Netlify, Cloudflare-compatible Next.js hosting or another Node-compatible host can be used depending on the adapter you choose.

**PT:** Publique a aplicação Next.js completa em um provedor que suporte rotas server-side e variáveis de ambiente. Vercel, Netlify, hospedagem compatível com Next.js/Cloudflare ou outro host compatível com Node pode ser usado, conforme a arquitetura escolhida.

## 10. Security / Segurança

**EN**
- Never commit `.env.local`.
- Never expose `ADMIN_PASSWORD`, `SESSION_SECRET`, service-account private keys or private payment secrets.
- Keep private values in your host's Secrets/Environment Variables.
- Use HTTPS in production.
- Restrict database/API permissions.
- Use separate development and production credentials.

**PT**
- Nunca envie `.env.local` para o GitHub.
- Nunca exponha `ADMIN_PASSWORD`, `SESSION_SECRET`, chaves privadas da service account ou secrets de pagamento.
- Guarde valores privados nos Secrets/Environment Variables do host.
- Use HTTPS em produção.
- Restrinja permissões da API/banco.
- Use credenciais separadas para desenvolvimento e produção.

## 11. Changing branding / Alterar a marca

**EN:** Replace the ModernCommerce name, logo mark, colors, copy, product images and metadata in the relevant components. The product architecture is intentionally independent of the demo brand.

**PT:** Substitua o nome ModernCommerce, marca, cores, textos, imagens dos produtos e metadata nos componentes correspondentes. A arquitetura não depende da marca de demonstração.

## 12. Troubleshooting / Solução de problemas

**Admin redirects to login / Admin volta para o login**
- Check `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET`.
- Restart after changing environment variables.

**Backend says not configured / Backend diz que não está configurado**
- Check `BACKEND_PROVIDER`.
- For Firebase, verify all three Firebase Admin variables.
- For REST, verify base URL, endpoint path and authentication header.

**Products remain demo / Produtos continuam de demonstração**
- Confirm `BACKEND_PROVIDER` is not `demo`.
- Make sure the REST API returns HTTP 2xx and follows the product contract.

## 13. Final launch checklist / Checklist final

**EN:** Install -> configure secrets -> connect backend -> add products -> connect storage/CDN -> connect payments -> configure domain -> enable HTTPS -> test checkout -> publish.

**PT:** Instale -> configure secrets -> conecte o backend -> adicione produtos -> conecte storage/CDN -> conecte pagamentos -> configure o domínio -> ative HTTPS -> teste o checkout -> publique.

## 14. Support / Suporte

Keep a copy of this guide with your purchase. The repository README is the technical reference; this guide is the buyer-facing setup reference.
