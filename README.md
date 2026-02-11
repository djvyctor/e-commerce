# E-commerce — Painel Administrativo

Painel administrativo para gestão de catálogo e visão geral de uma loja. Consome a **Platzi Fake Store API** para produtos e categorias.

## O que é o projeto

- **Login** com e-mail e senha; sessão persistida no navegador.
- **Dashboard** com KPIs (produtos, categorias, ticket médio, valor do inventário), gráficos por categoria (barras e donut), distribuição por faixa de preço (gráfico em onda), top 5 produtos por valor (barras horizontais e verticais) e tabela de produtos recentes.
- **Produtos**: listagem com paginação, filtros por título, preço (mín/máx) e categoria; criar, editar e excluir produtos.

## Tecnologias

- **Vue 3** (Composition API, `<script setup>`)
- **Vite 7**
- **Vue Router 5**
- **Pinia** (estado global)
- **Tailwind CSS 4**
- **Chart.js** e **vue-chartjs** (gráficos)

## Variáveis de ambiente

O frontend usa variáveis com prefixo `VITE_` (expostas pelo Vite em build e dev). Nunca commite o arquivo `.env`.

1. Copie o exemplo para criar seu `.env` local:
   ```bash
   cd frontend
   cp .env.example .env
   ```
2. Ajuste os valores em `.env` se precisar (por exemplo outra API).
3. Em produção, configure `VITE_API_BASE_URL` no ambiente de build (CI/CD ou host).

Sem `.env`, o app usa a URL padrão da Platzi Fake Store API.

## Como rodar

Requisito: **Node.js 18+** (recomendado 20+).

```bash
cd frontend
npm install
npm run dev
```

Acesse: **http://localhost:5173**

Credenciais de teste na API (ex.: `john@mail.com` / `changeme` — conferir documentação da Platzi Fake Store API).

### Build para produção

```bash
cd frontend
npm run build
npm run preview
```

## Estrutura do frontend

```
frontend/src/
  api/           # Chamadas à API (auth, products, categories)
  components/    # common/ (gráficos, etc.) e layout/ (AppLayout, AuthLayout)
  composables/    # useDebounceFn, etc.
  router/        # Rotas e guard de autenticação
  services/      # HttpClient e ApiClient (base URL e métodos HTTP)
  stores/        # Pinia (auth)
  views/         # auth, dashboard, products
  config/       # env.js (leitura de VITE_* e validação)
```

A URL da API é definida por `VITE_API_BASE_URL` (ver `.env.example`). O arquivo `.env` não é versionado.

## Decisões técnicas

- **Estado:** Pinia apenas para autenticação (token, login, logout). Listas, filtros e formulários ficam em estado local nas views/componentes para não poluir o store e facilitar manutenção.
- **HTTP:** Cliente único em `infra/HttpClient.js` e `ApiClient.js`; módulos em `api/` (auth, products, categories) usam o ApiClient. Token enviado no header `Authorization` em rotas que exigem autenticação.
- **Rotas:** Guard global no router verifica token e redireciona para login nas rotas protegidas; layout único (AppLayout) para dashboard e produtos.
- **Paginação:** Servidor (offset + limit) na listagem de produtos; filtros com debounce para evitar requisições excessivas.
- **Gráficos:** Chart.js + vue-chartjs; componentes por tipo (Bar, Donut, Line, HorizontalBar, Wave) reutilizáveis com os mesmos dados em visualizações diferentes quando faz sentido.

## Segurança (frontend)

- **Variáveis de ambiente:** só use prefixo `VITE_` para o que pode ser público; nunca coloque senhas ou chaves secretas em variáveis expostas no bundle.
- **Token:** o token de autenticação fica em `localStorage` e é enviado no header `Authorization`. Em produção, use sempre **HTTPS**.
- **Senha:** enviada apenas no corpo do POST de login (não em URL) e é limpa da memória após a tentativa de login.
- **Renderização:** o app não usa `v-html` com dados do usuário; o Vue escapa o conteúdo por padrão, reduzindo risco de XSS.
- **Headers em produção:** no servidor que servir o build (Nginx, Vercel, etc.), configure se possível:
  - `X-Frame-Options: DENY` ou `SAMEORIGIN` (evita clickjacking)
  - `X-Content-Type-Options: nosniff`
  - `Content-Security-Policy` conforme a necessidade do seu domínio (ex.: `default-src 'self'; connect-src 'self' https://api.escuelajs.co`)
