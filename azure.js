// Este archivo es específico para Azure Web Apps
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

// Verificar entorno
console.log('Entorno de ejecución:');
console.log(`- NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`- Directorio actual: ${process.cwd()}`);
console.log(`- Variables de entorno disponibles: ${Object.keys(process.env).filter(k => !k.includes('SECRET') && !k.includes('PASSWORD')).join(', ')}`);

// Verificar que el archivo .env.production existe
try {
  const envPath = path.join(process.cwd(), '.env.production');
  if (fs.existsSync(envPath)) {
    console.log(`Archivo .env.production encontrado en ${envPath}`);
  } else {
    console.log(`ADVERTENCIA: No se encontró .env.production en ${envPath}`);
  }
} catch (err) {
  console.error('Error al verificar .env.production:', err);
}

const dev = false; // Siempre en modo producción para Azure
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 8080; // Azure usa el puerto que proporciona

// Verificar e inicializar Prisma antes de iniciar la aplicación
console.log('Importando PrismaClient...');
const { PrismaClient } = require('@prisma/client');
console.log('Creando instancia de PrismaClient...');
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Añadir más logs para depuración
console.log('Iniciando aplicación en Azure...');
console.log(`Usando puerto: ${port}`);
console.log('Esperando para inicializar Prisma...');

// Esperar 15 segundos antes de iniciar para asegurar generación del cliente Prisma
setTimeout(async () => {
  try {
    console.log('Intentando conectar con Prisma...');
    // Verificar conexión a la base de datos
    await prisma.$connect();
    console.log('Prisma client connected successfully');

    console.log('Preparando aplicación Next.js...');
    await app.prepare();
    console.log('Next.js preparado, iniciando servidor HTTP...');
    
    const server = createServer((req, res) => {
      // Log de solicitudes para depuración
      console.log(`Solicitud recibida: ${req.method} ${req.url}`);
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });
    
    server.listen(port, (err) => {
      if (err) {
        console.error('Server startup error:', err);
        process.exit(1);
      }
      console.log(`> Servidor listo y escuchando en puerto ${port}`);
    });
  } catch (error) {
    console.error('Error de inicialización:', error);
    console.error('Detalles del error:', JSON.stringify(error, null, 2));
    process.exit(1);
  }
}, 10000);
