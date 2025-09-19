# 🔒 Guía de Seguridad - Danalyst

## Variables de Entorno

### Desarrollo Local
```bash
# Copiar el archivo de ejemplo
cp .env.example .env.local

# Completar con tus credenciales reales
# NUNCA commitear .env.local
```

### Producción
- Configurar variables en Vercel/Azure
- Usar secrets manager para credenciales sensibles
- Rotar keys regularmente

## Credenciales Críticas

### NextAuth Secret
- Generar nuevo: `openssl rand -base64 32`
- Cambiar en cada ambiente

### Google OAuth
- Configurar URIs autorizadas por ambiente
- Desarrollo: `http://localhost:5001`
- Producción: `https://tu-dominio.com`

### Base de Datos
- Usar connection pooling
- Configurar SSL en producción
- Backup automático habilitado

## ⚠️ NUNCA Commitear
- `.env.local`
- Archivos con credenciales reales
- Tokens de acceso
- Passwords o secrets