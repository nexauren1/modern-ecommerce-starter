# APIs do Template

## Catálogo

### GET /api/admin/products

Requer sessão de Admin.

Retorna os produtos do provider configurado.

### POST /api/admin/products

Requer sessão de Admin.

Exemplo:

    {
      "name": "Aurora Headphones",
      "category": "Audio",
      "price": 129,
      "description": "Wireless headphones",
      "image": "https://example.com/image.jpg",
      "rating": 4.9,
      "badge": "Best seller"
    }

### PUT /api/admin/products/:id

Requer sessão de Admin. Atualiza os campos enviados.

### DELETE /api/admin/products/:id

Requer sessão de Admin. Remove o produto.

## Pagamentos

### POST /api/payments/create-checkout

Recebe orderId, amount, currency, customerEmail e metadata. A resposta contém o URL de checkout devolvido pelo provider.

Variáveis usadas: PAYMENT_API_BASE_URL, PAYMENT_API_KEY e PAYMENT_CHECKOUT_PATH.

### POST /api/payments/webhook

Recebe eventos do gateway configurado. O adapter inicial usa o header x-webhook-secret e os campos event, paymentId e status.

Para um gateway real, adapte lib/payment.ts para validar a assinatura oficial do serviço.

## Health

### GET /api/store/health

Retorna estado básico sem expor secrets.

## Adapters

API interna → Adapter → Firebase / REST / outro backend.

Checkout interno → Payment Provider → gateway escolhido.
