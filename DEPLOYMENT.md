# 🚀 Guía de Deployment - Danalyst

## Ambientes Configurados

### 🔧 Desarrollo Local
```bash
npm run dev                    # Puerto 5001
npm run env:check local        # Verificar configuración
```

### 🧪 Staging/Testing  
```bash
npm run dev:staging           # Puerto 5002
npm run build:staging         # Build para staging
npm run env:check staging     # Verificar configuración
```

### 🌟 Producción
```bash
npm run build:production      # Build para producción
npm run env:check production  # Verificar configuración
```

## Configuración por Ambiente

### Variables Críticas por Ambiente:

| Variable | Desarrollo | Staging | Producción |
|----------|------------|---------|------------|
| `NEXTAUTH_URL` | `localhost:5001` | `staging.vercel.app` | `danalyst-post.vercel.app` |
| `NEXTAUTH_SECRET` | Dev Secret | Staging Secret | Production Secret |
| `MERCADOPAGO_TOKEN` | Sandbox | Sandbox | Production |
| `POSTGRES_URL` | Dev DB | Staging DB | Production DB |

## Deployment Steps

### 1. Desarrollo → Staging
```bash
# 1. Verificar cambios
git status

# 2. Configurar staging
npm run env:check staging

# 3. Deploy a staging branch
git checkout -b staging
git push origin staging
```

### 2. Staging → Producción
```bash
# 1. Verificar staging funciona
npm run build:staging

# 2. Merge a main
git checkout main
git merge staging

# 3. Deploy a producción
git push origin main
```

## Configuración en Vercel

### Variables de Entorno Requeridas:
```bash
NEXTAUTH_SECRET=dbopMg25k+ANn1AkwnCcIuXO79XxqDKzJHE7IKOnSW0=
NEXTAUTH_URL=https://danalyst-post.vercel.app
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
MERCADOPAGO_ACCESS_TOKEN=tu-token-produccion
POSTGRES_PRISMA_URL=tu-postgres-url
```

## Google OAuth Setup

### URIs Autorizadas por Ambiente:

**Desarrollo:**
- Origin: `http://localhost:5001`
- Redirect: `http://localhost:5001/api/auth/callback/google`

**Staging:**
- Origin: `https://danalyst-staging.vercel.app`
- Redirect: `https://danalyst-staging.vercel.app/api/auth/callback/google`

**Producción:**
- Origin: `https://danalyst-post.vercel.app`
- Redirect: `https://danalyst-post.vercel.app/api/auth/callback/google`