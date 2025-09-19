import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { performanceMonitor } from '@/lib/monitoring';
import { memoryCache } from '@/lib/cache';

export async function GET() {
  const startTime = performance.now();
  
  try {
    // Test database connection
    const dbTimer = performanceMonitor.startTimer('health-check-db');
    await prisma.$queryRaw`SELECT 1`;
    const dbTime = dbTimer.end();

    // Get system stats
    const memoryUsage = process.memoryUsage();
    const uptime = process.uptime();
    
    // Get cache stats
    const cacheStats = memoryCache.getStats();
    
    // Get performance stats
    const slowestOps = performanceMonitor.getSlowestOperations(5);
    
    const totalTime = performance.now() - startTime;

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(uptime),
      database: {
        status: 'connected',
        responseTime: Math.round(dbTime)
      },
      memory: {
        used: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
        total: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
        external: Math.round(memoryUsage.external / 1024 / 1024) // MB
      },
      cache: {
        size: cacheStats.size,
        keys: cacheStats.keys.length
      },
      performance: {
        healthCheckTime: Math.round(totalTime),
        slowestOperations: slowestOps.map(op => ({
          name: op.name,
          duration: Math.round(op.duration),
          timestamp: op.timestamp
        }))
      }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 503 });
  }
}