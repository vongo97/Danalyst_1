@echo off
echo Prueba de conexion a SQL Server
echo ==============================
echo.

echo Instalando dependencias necesarias...
call npm install mssql dotenv

echo.
echo Ejecutando prueba de conexion...
node test-connection-simple.js

echo.
echo Si la prueba fallo, intenta corregir la contrasena:
echo node fix-password.js
echo.

pause