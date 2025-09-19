# Prueba de conexión a SQL Server

Este documento explica cómo usar los scripts para probar y corregir la conexión a la base de datos SQL Server.

## Problema detectado

Se ha identificado un error de autenticación:
```
prisma:error Login failed for user 'Danalyst_sql'.
```

Este error indica que las credenciales proporcionadas no son válidas para conectarse a la base de datos.

## Scripts disponibles

### 1. Script simple de prueba de conexión

```bash
# Primero instala las dependencias
npm install mssql dotenv

# Luego ejecuta el script
node test-connection-simple.js
```

Este script intentará conectarse a la base de datos usando la configuración en el archivo `.env` y mostrará información detallada sobre el resultado.

### 2. Script para corregir la contraseña

```bash
node fix-password.js
```

Este script está diseñado específicamente para corregir problemas de codificación en la contraseña. Si la contraseña contiene caracteres especiales como `@` o `%`, este script los decodificará correctamente.

## Posibles soluciones

1. **Verificar las credenciales**: Confirma que el usuario y la contraseña son correctos.

2. **Problemas de codificación**: Si la contraseña contiene caracteres especiales, es posible que necesiten ser decodificados o codificados correctamente en la URL de conexión.

3. **Permisos de usuario**: Verifica que el usuario `Danalyst_sql` tiene permisos para acceder a la base de datos `Danalyst_sql`.

4. **Firewall o reglas de red**: Asegúrate de que tu dirección IP está permitida en las reglas de firewall de Azure SQL.

## Ejemplo de URL de conexión correcta

```
DATABASE_URL="sqlserver://servidor.database.windows.net:1433;database=nombre_db;user=usuario;password=contraseña;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net"
```

## Verificación en Azure Portal

También puedes verificar la configuración de la base de datos en el portal de Azure:

1. Inicia sesión en [Azure Portal](https://portal.azure.com)
2. Navega a tu servidor SQL
3. Verifica las credenciales y los permisos del usuario
4. Comprueba las reglas de firewall para asegurarte de que tu IP está permitida