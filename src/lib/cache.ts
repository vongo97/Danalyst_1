interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class MemoryCache {
  private cache = new Map<string, CacheItem<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutos

  set<T>(key: string, data: T, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    // Verificar si expiró
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Limpiar items expirados
  cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    this.cache.forEach((item, key) => {
      if (now - item.timestamp > item.ttl) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => this.cache.delete(key));
  }

  // Obtener estadísticas del cache
  getStats() {
    const keys: string[] = [];
    this.cache.forEach((_, key) => keys.push(key));
    
    return {
      size: this.cache.size,
      keys
    };
  }
}

export const memoryCache = new MemoryCache();

// Limpiar cache cada 10 minutos
setInterval(() => memoryCache.cleanup(), 10 * 60 * 1000);

// Helper para cache con función
export async function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  ttl?: number
): Promise<T> {
  // Intentar obtener del cache
  const cached = memoryCache.get<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Ejecutar función y cachear resultado
  const result = await fn();
  memoryCache.set(key, result, ttl);
  return result;
}