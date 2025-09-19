#!/bin/bash

# Limpiar caché de npm
npm cache clean --force

# Instalar dependencias con --force y --legacy-peer-deps
npm install --force --legacy-peer-deps

# Construir la aplicación
npm run build

# Desplegar
echo "Despliegue completado"