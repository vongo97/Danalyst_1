# Pasos para el despliegue en Azure

## Problema identificado
El error principal en los logs de despliegue era:
```
You are using Node.js 18.17.1. For Next.js, Node.js version "^18.18.0 || ^19.8.0 || >= 20.0.0" is required.
```

## Solución implementada
Se han creado/actualizado los siguientes archivos para asegurar que Azure App Service use Node.js 22.x:

1. `.deployment` - Configuración para Azure App Service
2. `.azure/config` - Configuración adicional para Azure
3. `.env.production` - Variables de entorno para producción
4. `web.config` - Configuración para IIS en Azure
5. `.node-version` y `.nvmrc` - Archivos estándar para especificar la versión de Node.js
6. `iisnode.yml` - Configuración específica para iisnode

## Pasos para verificar el despliegue
1. Asegúrate de que el workflow de GitHub Actions esté configurado para usar Node.js 22.x
2. Verifica que los archivos de configuración estén incluidos en el despliegue
3. Después del despliegue, revisa los logs para confirmar que se está usando la versión correcta de Node.js

## Notas adicionales
- Si el problema persiste, considera configurar manualmente la versión de Node.js en la configuración de la aplicación en el portal de Azure
- Puedes agregar la configuración `WEBSITE_NODE_DEFAULT_VERSION=22.15.0` en la sección "Configuración" > "Configuración de la aplicación" en el portal de Azure