# Template APIs

## Catalog

### GET /api/admin/products

Requires an Admin session.

Returns products from the configured provider.

### POST /api/admin/products

Requires an Admin session. Accepts product name, category, price, description, image, rating and badge.

### PUT /api/admin/products/:id

Requires an Admin session. Updates the submitted fields.

### DELETE /api/admin/products/:id

Requires an Admin session. Deletes the product.

## Payments

### POST /api/payments/create-checkout

Accepts orderId, amount, currency, customerEmail and metadata. The response contains the checkout URL returned by the selected provider.

Uses PAYMENT_API_BASE_URL, PAYMENT_API_KEY and PAYMENT_CHECKOUT_PATH.

### POST /api/payments/webhook

Receives events from the configured gateway. The initial adapter uses x-webhook-secret plus event, paymentId and status.

For a real gateway, adapt lib/payment.ts to validate the provider's official webhook signature.

## Health

### GET /api/store/health

Returns basic status without exposing secrets.

## Adapter contracts

Internal API → Adapter → Firebase / REST / another backend.

Internal checkout → Payment Provider → selected gateway.
