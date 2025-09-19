import { NextRequest } from 'next/server';

interface RateLimitConfig {
  interval: number; // en milisegundos
  uniqueTokenPerInterval: number; // número máximo de requests
}

class RateLimiter {
  private cache = new Map<string, { count: number; resetTime: number }>();

  async check(
    request: NextRequest,
    limit: number,
    interval: number = 60000 // 1 minuto por defecto
  ): Promise<{ success: boolean; remaining: number; resetTime: number }> {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'anonymous';
    const key = `rate_limit:${ip}`;
    const now = Date.now();
    
    const current = this.cache.get(key);
    
    if (!current || now > current.resetTime) {
      // Nuevo período o expirado
      const resetTime = now + interval;
      this.cache.set(key, { count: 1, resetTime });
      return { success: true, remaining: limit - 1, resetTime };
    }
    
    if (current.count >= limit) {
      // Límite excedido
      return { success: false, remaining: 0, resetTime: current.resetTime };
    }
    
    // Incrementar contador
    current.count++;
    this.cache.set(key, current);
    
    return { success: true, remaining: limit - current.count, resetTime: current.resetTime };
  }

  // Limpiar cache periódicamente
  cleanup() {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    this.cache.forEach((value, key) => {
      if (now > value.resetTime) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => this.cache.delete(key));
  }
}

export const rateLimiter = new RateLimiter();

// Limpiar cache cada 5 minutos
setInterval(() => rateLimiter.cleanup(), 5 * 60 * 1000);