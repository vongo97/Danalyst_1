import { PrismaClient } from '@prisma/client';

// Evitar múltiples instancias de Prisma Client en desarrollo
// https://www.prisma.io/docs/guides/performance-and-optimization/connection-management

let prisma: PrismaClient;

const prismaConfig = {
  datasources: {
    db: {
      url: process.env.POSTGRES_PRISMA_URL,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] as const : ['error'],
};

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(prismaConfig);
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient(prismaConfig);
  }
  // @ts-ignore
  prisma = global.prisma;
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;