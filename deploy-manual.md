# Instrucciones para despliegue manual en Azure

Si el despliegue automático está tardando demasiado o fallando, sigue estos pasos para un despliegue manual:

## 1. Preparar la aplicación localmente

```bash
# Limpiar la caché de npm
npm cache clean --force

# Instalar dependencias
npm install --force --legacy-peer-deps

# Construir la aplicación
npm run build
```

## 2. Comprimir la aplicación

Crea un archivo ZIP con los siguientes archivos y carpetas:
- `.next/` (carpeta de build)
- `public/` (archivos estáticos)
- `node_modules/` (dependencias)
- `package.json`
- `azure.js` (archivo de servidor)
- `web.config`
- `.env.production`

## 3. Subir manualmente a Azure

1. Ve al Portal de Azure
2. Navega a tu App Service
3. Ve a "Deployment Center"
4. Selecciona "Manual Deployment"
5. Sube el archivo ZIP creado anteriormente

## 4. Configurar variables de entorno

En el Portal de Azure:
1. Ve a tu App Service
2. Navega a "Configuration"
3. Añade las siguientes variables de aplicación:
   - `WEBSITE_NODE_DEFAULT_VERSION`: 22.15.0
   - `SCM_COMMAND_IDLE_TIMEOUT`: 3600
   - `SCM_LOGSTREAM_TIMEOUT`: 3600

## 5. Reiniciar la aplicación

1. Ve a "Overview" en tu App Service
2. Haz clic en "Restart"
3. Espera unos minutos y verifica que la aplicación esté funcionando