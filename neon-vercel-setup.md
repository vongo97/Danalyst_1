# Configuración de Neon PostgreSQL con Vercel

## Pasos para la integración

1. **Conectar Neon con Vercel**:
   - Ve a tu proyecto en Vercel Dashboard
   - Navega a "Storage" → "Connect Database"
   - Selecciona Neon
   - Sigue las instrucciones para conectar tu proyecto de Neon existente o crea uno nuevo

2. **Verificar variables de entorno**:
   - Después de conectar, Vercel configurará automáticamente estas variables:
     - `POSTGRES_PRISMA_URL` (para conexiones con pooling)
     - `POSTGRES_URL_NON_POOLING` (para conexiones directas)

3. **Probar la conexión**:
   - Ejecuta el script de prueba incluido en este proyecto:
   ```
   node test-neon-connection.js
   ```

4. **Configuración de Prisma**:
   - Tu archivo `schema.prisma` ya está configurado correctamente:
   ```prisma
   datasource db {
     provider  = "postgresql"
     url       = env("POSTGRES_PRISMA_URL")
     directUrl = env("POSTGRES_URL_NON_POOLING")
   }
   ```

5. **Despliegue en Vercel**:
   - Asegúrate de que el archivo `vercel.json` esté configurado correctamente
   - El script `prisma-generate.js` se ejecutará durante el despliegue

## Solución de problemas

Si encuentras errores de conexión:

1. Verifica que las variables de entorno estén configuradas correctamente en Vercel
2. Asegúrate de que tu proyecto de Neon esté activo y accesible
3. Comprueba que las credenciales de conexión sean correctas
4. Verifica que la IP de Vercel no esté bloqueada por las reglas de firewall de Neon

## Recursos adicionales

- [Documentación de Neon](https://neon.tech/docs)
- [Guía de integración de Neon con Vercel](https://vercel.com/docs/storage/neon)
- [Documentación de Prisma con Neon](https://www.prisma.io/docs/guides/database/neon)