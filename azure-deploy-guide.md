# Guía de despliegue en Azure

## Pasos para un despliegue exitoso

1. **Crear recursos en Azure**
   - Crear una App Service para la aplicación web
   - Crear una base de datos MySQL en Azure
   - Configurar las variables de entorno en la App Service

2. **Configurar la base de datos**
   - Actualizar `.env.production` con la cadena de conexión correcta de Azure MySQL
   - Formato: `mysql://<usuario>:<contraseña>@<servidor>.mysql.database.azure.com:3306/danalystr?sslmode=require`
   - Asegurarse de que el usuario tenga permisos adecuados

3. **Verificar tiempos de despliegue**
   - El despliegue inicial puede tardar entre 10-20 minutos
   - Los despliegues posteriores suelen ser más rápidos (5-10 minutos)
   - Si tarda más de 30 minutos, puede haber un problema

4. **Solucionar problemas comunes**
   - Error de SCM: Esperar unos minutos y volver a intentar
   - Error de npm: Usar las configuraciones en `.npmrc`
   - Error de base de datos: Verificar la cadena de conexión y los permisos

5. **Monitorear el despliegue**
   - Revisar los logs en Azure Portal
   - Verificar el estado de la aplicación después del despliegue
   - Comprobar que la base de datos está conectada correctamente