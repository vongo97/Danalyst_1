#!/bin/bash

# Script para el despliegue en Vercel
echo "Iniciando script de despliegue personalizado para Vercel"

# Generar Prisma Client
echo "Generando Prisma Client..."
npx prisma generate

# Construir la aplicación Next.js
echo "Construyendo la aplicación Next.js..."
next build

echo "Despliegue completado con éxito"