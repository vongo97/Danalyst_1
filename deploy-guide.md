# Guía de Despliegue Optimizado para Azure

## Problema identificado
El error de despliegue ocurre porque el archivo ZIP es demasiado grande (410 MB), lo que causa que la operación se aborte.

## Soluciones implementadas

### 1. Archivos de configuración
- `.deploymentignore`: Excluye directorios pesados del despliegue
- Workflow de GitHub Actions actualizado: Optimiza el proceso de empaquetado

### 2. Opciones para desplegar

#### Opción 1: Usar GitHub Actions (Recomendado)
El workflow actualizado en `.github/workflows/main_danalyst.yml` ya incluye las optimizaciones necesarias:
- Elimina archivos de caché antes de crear el ZIP
- Excluye directorios pesados del ZIP
- Configura `scm-do-build-during-deployment: true` para reconstruir en Azure

#### Opción 2: Despliegue manual desde Windows
1. Ejecuta el script `optimize-deploy.bat`
2. Sube el archivo `release.zip` generado a Azure App Service:
   - Portal de Azure > App Service > Centro de implementación > Implementación manual > Zip Deploy

#### Opción 3: Despliegue manual desde Linux/Mac
1. Ejecuta el script `optimize-deploy.sh` (dale permisos con `chmod +x optimize-deploy.sh`)
2. Sube el archivo `release.zip` generado a Azure App Service

## Notas importantes
- El tamaño máximo recomendado para despliegues ZIP en Azure App Service es de 250 MB
- Si sigues teniendo problemas, considera usar Git Deploy en lugar de Zip Deploy
- Para proyectos grandes, considera usar Azure DevOps Pipelines que maneja mejor los despliegues grandes