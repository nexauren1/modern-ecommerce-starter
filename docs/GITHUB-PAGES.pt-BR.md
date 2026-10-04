# GitHub Pages — Demo Visual

O projeto completo usa Next.js server-side. Portanto, GitHub Pages não hospeda o Admin/API/Firebase/checkout da versão completa.

O Pages é usado para a prévia visual estática em `demo/`.

## Ativação única

No GitHub:

1. Abra o repositório.
2. Vá para **Settings → Pages**.
3. Em **Build and deployment**, escolha **GitHub Actions** como Source.
4. Abra **Actions**.
5. Execute manualmente **Deploy demo to GitHub Pages**.

A permissão para criar o site é administrativa; o workflow não tenta alterar as configurações do repositório automaticamente.

URL esperada:

https://nexauren1.github.io/modern-ecommerce-starter/

O site publicado é somente uma demonstração visual. O aplicativo completo continua sendo o projeto Next.js com Admin, APIs, banco, webhooks e secrets.

Nenhum secret da aplicação é incluído na demo.
