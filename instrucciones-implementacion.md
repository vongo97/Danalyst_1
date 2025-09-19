# Instrucciones de Implementación

Debido a limitaciones en la creación de directorios anidados, he generado los archivos en la raíz del proyecto. A continuación, se detallan las instrucciones para mover estos archivos a sus ubicaciones correctas:

## 1. Estructura de Prisma

```
mkdir -p j:\Danalyst-azure\prisma
move j:\Danalyst-azure\schema.prisma j:\Danalyst-azure\prisma\schema.prisma
```

## 2. Rutas de API

```
mkdir -p j:\Danalyst-azure\src\app\api\register
mkdir -p j:\Danalyst-azure\src\app\api\blog
mkdir -p j:\Danalyst-azure\src\app\api\blog\[slug]
mkdir -p j:\Danalyst-azure\src\app\api\courses

move j:\Danalyst-azure\api-register-route.ts j:\Danalyst-azure\src\app\api\register\route.ts
move j:\Danalyst-azure\api-blog-route.ts j:\Danalyst-azure\src\app\api\blog\route.ts
move j:\Danalyst-azure\api-blog-slug-route.ts j:\Danalyst-azure\src\app\api\blog\[slug]\route.ts
move j:\Danalyst-azure\api-courses-route.ts j:\Danalyst-azure\src\app\api\courses\route.ts
```

## 3. Archivos del Blog

```
move j:\Danalyst-azure\blog-lib-posts.ts j:\Danalyst-azure\src\app\blog\lib\posts.ts
move j:\Danalyst-azure\blog-page.tsx j:\Danalyst-azure\src\app\blog\page.tsx
move j:\Danalyst-azure\blog-slug-page.tsx j:\Danalyst-azure\src\app\blog\[slug]\page.tsx
```

## 4. Archivo de Cursos

```
move j:\Danalyst-azure\data-courses.ts j:\Danalyst-azure\src\data\courses.ts
move j:\Danalyst-azure\courses-page.tsx j:\Danalyst-azure\src\app\courses\page.tsx
```

## 5. Configuración de Prisma

Después de mover los archivos, ejecuta los siguientes comandos para configurar Prisma:

```
npm install
npx prisma generate
```

Si necesitas crear las tablas en la base de datos:

```
npx prisma migrate dev --name init
```

## 6. Variables de Entorno

Asegúrate de que tu archivo `.env.local` contenga las siguientes variables:

```
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXTAUTH_SECRET="TU_SECRETO_SEGURO_PARA_NEXTAUTH"
NEXTAUTH_URL="http://localhost:3000"
```

Reemplaza `USER`, `PASSWORD`, `HOST`, `PORT`, `DATABASE` con tus credenciales de MySQL.

## 7. Consideraciones de Seguridad

- Asegura que tu `NEXTAUTH_SECRET` sea una cadena larga y aleatoria. Puedes generarla con `openssl rand -base64 32` o una herramienta similar.
- Implementa validaciones de complejidad de contraseña en el frontend y backend.
- Considera usar HTTPS en producción.

## 8. Optimizaciones de Imágenes

- Comprime las imágenes utilizando herramientas como TinyPNG o Squoosh.
- Considera convertir imágenes a formatos modernos como WebP o AVIF.

## 9. Pruebas

Después de implementar todos los cambios, prueba el flujo completo:

1. Registro de usuario
2. Inicio de sesión
3. Acceso al dashboard
4. Visualización de posts del blog
5. Visualización de cursos

## 10. link de referencia para trabajar

src/app/forgot-password/page.tsx

PayU Colombia
quiero usar mejor esta opcion
