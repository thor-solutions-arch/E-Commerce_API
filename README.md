# dormirco-api

Worker vanilla (TypeScript) para Cloudflare Workers + D1.  
Sin frameworks. Sin dependencias de runtime.

## Estructura

```
src/
  index.ts        ← entry point, router manual
  types.ts        ← tipos del dominio + Env
  response.ts     ← helpers: json(), CORS, errors
  data.ts         ← capa de acceso a datos (mock → D1)
  mock.ts         ← datos de prueba (borrar cuando actives D1)
  meta.ts         ← opciones de filtros (categorías, tallas, etc.)
  routes/
    products.ts   ← handlers GET /products y GET /products/:id
migrations/
  001_init.sql    ← schema + seed para D1
```

---

## Setup inicial

```bash
cd dormirco-api
npm install
```

---

## Desarrollo local

```bash
npm run dev
# Worker disponible en http://localhost:8787
```

Probá que funcione:
```
GET http://localhost:8787/
GET http://localhost:8787/products
GET http://localhost:8787/products/p001
GET http://localhost:8787/products?category=latex&sort=price-asc
GET http://localhost:8787/products?firmness=firm&size=king
GET http://localhost:8787/products?search=resortes&priceRange=150000-250000
```

---

## Deploy a Cloudflare

```bash
# Primera vez: autenticarse
npx wrangler login

# Deployar
npm run deploy
```

Cloudflare te da una URL del estilo `https://dormirco-api.TU-USUARIO.workers.dev`.  
Copiá esa URL y:
1. Pegala en `API_URL` del `index.html` del frontend
2. Agregala al array `ALLOWED_ORIGINS` en `src/response.ts`
3. Re-deployá el Worker

---

## Activar D1 (cuando estés listo)

**1. Crear la base de datos:**
```bash
wrangler d1 create dormirco-db
```
Copiá el `database_id` que devuelve.

**2. Descomentar el binding en `wrangler.toml`:**
```toml
[[d1_databases]]
binding       = "DB"
database_name = "dormirco-db"
database_id   = "EL-ID-QUE-COPIASTE"
```

**3. Correr la migration:**
```bash
# Local (para probar)
wrangler d1 execute dormirco-db --local --file=migrations/001_init.sql

# Producción
wrangler d1 execute dormirco-db --file=migrations/001_init.sql
```

**4. Activar D1 en el código:**

En `src/data.ts`, descomentá las líneas marcadas con `// ── Switch to D1 here`.  
Eliminá `src/mock.ts` cuando confirmes que todo funciona.

---

## CORS

Los orígenes permitidos están en `src/response.ts → ALLOWED_ORIGINS`.  
Agregá tu dominio de Cloudflare Pages antes de deployar:

```ts
"https://dormirco.pages.dev",
```
