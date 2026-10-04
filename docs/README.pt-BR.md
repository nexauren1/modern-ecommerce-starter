# ModernCommerce Starter — Guia do Cliente

Este diretório é a documentação do produto e fica separado do código da aplicação.

## 1. O que você recebeu

O ModernCommerce Starter é um kit de e-commerce para personalizar e desenvolver:

- storefront responsivo
- catálogo de produtos
- área administrativa privada
- autenticação do proprietário
- integração com banco de dados
- armazenamento de imagens
- checkout e pagamentos por API
- documentação de configuração

A aplicação funciona inicialmente em **Demo Mode**. Depois, o cliente conecta os próprios serviços.

## 2. Estrutura

- `app/` — páginas, rotas e APIs da aplicação
- `components/` — componentes de interface
- `lib/` — serviços e adapters
- `public/` — arquivos públicos
- `docs/` — documentação do cliente
- `demo/` — pré-visualização estática para GitHub Pages

## 3. Requisitos

- Node.js 22+
- npm
- uma hospedagem compatível com Next.js para a versão completa
- serviços externos escolhidos pelo proprietário, quando quiser ativar recursos de produção

## 4. Instalação

1. Baixe ou clone o projeto.
2. Execute:

```bash
npm install
npm run dev
```

3. Abra `http://localhost:3000`.

## 5. Configuração secreta do Admin

O Admin é privado e não deve usar senha escrita dentro do código.

Crie `.env.local` e configure:

```env
ADMIN_EMAIL=seu-email
ADMIN_PASSWORD=sua-senha-forte
SESSION_SECRET=um-segredo-aleatorio-longo
```

Nunca publique esses valores no GitHub.

Depois acesse:

`/admin/login`

O painel usa uma sessão assinada em cookie HTTP-only.

## 6. Variáveis e Secrets

A arquitetura foi preparada para não prender o cliente a um único fornecedor.

### Admin

`ADMIN_EMAIL`  
Email privado do proprietário.

`ADMIN_PASSWORD`  
Senha privada do proprietário.

`SESSION_SECRET`  
Segredo usado para assinar a sessão.

### Banco de dados

`DATA_PROVIDER`  
Identifica o adapter de dados escolhido.

O projeto inclui Firebase como adapter inicial. Um comprador pode criar outro adapter para PostgreSQL, MySQL, Supabase, MongoDB, API própria ou outro serviço.

### Firebase

As variáveis `FIREBASE_ADMIN_*` são exclusivas do servidor.

As variáveis `NEXT_PUBLIC_FIREBASE_*` podem ser usadas pelo SDK web conforme as regras do Firebase.

Nunca coloque a chave privada de uma service account em uma variável `NEXT_PUBLIC_*`.

### Storage

Use:

`STORAGE_PROVIDER`  
`STORAGE_BUCKET`  
`STORAGE_REGION`  
`STORAGE_ENDPOINT`  
`STORAGE_PUBLIC_BASE_URL`  
`STORAGE_API_KEY`  
`STORAGE_API_SECRET`

O objetivo é permitir S3-compatible storage, cloud storage ou um adapter próprio.

### Pagamentos

Use:

`PAYMENT_PROVIDER`  
`PAYMENT_API_BASE_URL`  
`PAYMENT_API_KEY`  
`PAYMENT_API_SECRET`  
`PAYMENT_CHECKOUT_PATH`  
`PAYMENT_WEBHOOK_SECRET`  
`PAYMENT_CURRENCY`

A aplicação expõe:

- `POST /api/payments/create-checkout`
- `POST /api/payments/webhook`

O contrato é provider-agnostic. O cliente pode conectar um gateway que exponha API HTTP e implementar um adapter específico sem alterar o storefront.

### Email

Use:

`EMAIL_PROVIDER`  
`EMAIL_API_BASE_URL`  
`EMAIL_API_KEY`  
`EMAIL_FROM`  
`EMAIL_REPLY_TO`

## 7. Como escolher serviços

Você não precisa usar um fornecedor específico.

O princípio é:

```text
Storefront
    ↓
Provider Interface
    ↓
Adapter
    ↓
Seu serviço
```

Isso permite trocar banco, storage, email ou pagamento sem redesenhar toda a interface.

## 8. Como adicionar um produto

Entre no Admin.

`/admin/login`

Depois:

`Products → Add product`

Preencha:

- nome
- categoria
- preço
- preço anterior
- imagem
- badge
- rating
- descrição

No modo Demo o catálogo usa os dados de exemplo.

Com Firebase Admin configurado, o produto é gravado no Firestore e passa a ser carregado pelo storefront.

## 9. Imagens

A primeira versão aceita URL de imagem no produto.

Para produção, o próximo adapter de storage pode gerar upload direto para o serviço escolhido, mantendo a chave secreta fora do navegador.

## 10. Pagamentos

O template não deve assumir que todos os clientes usarão o mesmo gateway.

O fluxo é:

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

O endpoint de webhook deve validar o segredo do serviço selecionado e registrar o resultado no banco.

## 11. Segurança

Nunca faça commit de:

- `.env.local`
- service account JSON
- private keys
- payment secrets
- webhook secrets
- senhas

Use os Secrets/Variables da sua plataforma de hospedagem.

## 12. Hospedagem

A aplicação completa usa Next.js server-side porque Admin, APIs, banco, webhooks e secrets não podem depender somente de hosting estático.

GitHub Pages é usado neste projeto apenas para a **demo visual** em `demo/`.

## 13. GitHub Pages Demo

A pasta `demo/` é uma versão estática para visualizar o design sem configurar banco ou secrets.

Ela não representa a aplicação completa.

O workflow de Pages publica a pasta `demo/`.

URL esperada:

`https://nexauren1.github.io/modern-ecommerce-starter/`

## 14. CI

O workflow `Build` instala as dependências e executa `npm run build`.

Consulte a aba **Actions** do GitHub para ver o resultado.

## 15. Checklist de produção

- [ ] criar `.env.local`
- [ ] configurar Admin
- [ ] escolher banco
- [ ] escolher storage
- [ ] configurar email
- [ ] configurar pagamentos
- [ ] configurar webhooks
- [ ] configurar domínio
- [ ] criar regras de segurança do banco
- [ ] testar checkout
- [ ] testar logout
- [ ] testar upload
- [ ] fazer build de produção
- [ ] remover dados demo antes do lançamento
