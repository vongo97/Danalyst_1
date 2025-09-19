# Solución para despliegue en Vercel

## Dependencias necesarias

Para que el proyecto se despliegue correctamente en Vercel, asegúrate de tener todas estas dependencias en tu package.json:

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
  "remark": "^15.0.1",
  "remark-html": "^16.0.1",
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
  "autoprefixer": "^10.4.16",
  "eslint": "^8.0.0",
  "eslint-config-next": "^14.0.0",
  "postcss": "^8.4.31",
  "prisma": "^5.0.0",
  "typescript": "^5.0.0"
}
```

## Configuración de Vercel

Asegúrate de que tu archivo `vercel.json` tenga la siguiente configuración:

```json
{
  "buildCommand": "npm install && npx prisma generate && npm run build",
  "installCommand": "npm install --force",
  "framework": "nextjs"
}
```

## Pasos para desplegar

1. Haz commit de los cambios:
   ```bash
   git add .
   git commit -m "Añadir todas las dependencias necesarias para Vercel"
   git push
   ```

2. Vercel debería iniciar automáticamente un nuevo despliegue.

3. Si sigues teniendo problemas, puedes intentar:
   - Borrar la caché de construcción en Vercel
   - Forzar un nuevo despliegue desde la interfaz de Vercel
   - Verificar que todas las variables de entorno estén configuradas correctamente