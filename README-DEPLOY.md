# Instrucciones para desplegar en Vercel

Este archivo contiene las instrucciones para desplegar correctamente el proyecto en Vercel.

## Dependencias necesarias

El proyecto requiere las siguientes dependencias principales:

```json
"dependencies": {
  "@google/generative-ai": "^0.2.1",
  "@prisma/client": "^5.0.0",
  "@radix-ui/react-slot": "^1.0.2",
  "bcryptjs": "^2.4.3",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "dotenv": "^16.5.0",
  "lucide-react": "^0.344.0",
  "marked": "^12.0.0",
  "mssql": "^11.0.1",
  "next": "^14.0.0",
  "next-auth": "^4.24.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "tailwind-merge": "^2.2.1",
  "tailwindcss": "^3.4.1",
  "tedious": "^16.0.0"
},
"devDependencies": {
  "@tailwindcss/typography": "^0.5.10",
  "@types/bcryptjs": "^2.4.6",
  "@types/mssql": "^9.1.7",
  "@types/node": "^20.0.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0",
  "eslint": "^8.0.0",
  "eslint-config-next": "^14.0.0",
  "prisma": "^5.0.0",
  "typescript": "^5.0.0"
}
```

## Pasos para desplegar

1. Asegúrate de que todas las dependencias estén correctamente instaladas:
   ```bash
   npm install
   ```

2. Genera el cliente de Prisma:
   ```bash
   npx prisma generate
   ```

3. Construye la aplicación:
   ```bash
   npm run build
   ```

4. Sube los cambios a GitHub:
   ```bash
   git add .
   git commit -m "Actualizar dependencias para despliegue en Vercel"
   git push
   ```

5. Configura el proyecto en Vercel:
   - Conecta tu repositorio de GitHub
   - Asegúrate de que las variables de entorno estén configuradas correctamente
   - Usa la configuración de Next.js

## Solución de problemas comunes

- **Error de fuentes**: Se ha reemplazado Geist por Inter y Geist_Mono por JetBrains_Mono
- **Error de módulos no encontrados**: Asegúrate de que todas las dependencias estén instaladas
- **Error de Tailwind**: Verifica que tailwindcss y sus plugins estén correctamente configurados