@echo off
echo Limpiando archivos relacionados con Azure...

echo Eliminando archivos de configuración de Azure...
if exist .azure rmdir /s /q .azure
if exist azure.js del azure.js
if exist azure-deploy-guide.md del azure-deploy-guide.md
if exist azure-deploy-steps.md del azure-deploy-steps.md
if exist migracion_azure_sql.sql del migracion_azure_sql.sql
if exist migracion_azure_sql_completo.sql del migracion_azure_sql_completo.sql
if exist triggers_azure_sql.sql del triggers_azure_sql.sql

echo Eliminando archivos de prueba de conexión a SQL Server...
if exist test-connection-simple.js del test-connection-simple.js
if exist test-sql-connection.js del test-sql-connection.js
if exist test-mssql.js del test-mssql.js
if exist fix-password.js del fix-password.js
if exist check-db-connection.js del check-db-connection.js
if exist fix-database-url.js del fix-database-url.js
if exist test-database.js del test-database.js

echo Limpieza completada.
echo Ahora puedes ejecutar "npx prisma migrate dev --name init" para inicializar la base de datos SQLite.
pause