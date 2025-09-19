interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private maxMetrics = 1000; // Mantener solo las últimas 1000 métricas

  startTimer(name: string, metadata?: Record<string, any>) {
    const startTime = performance.now();
    
    return {
      end: () => {
        const duration = performance.now() - startTime;
        this.addMetric({
          name,
          duration,
          timestamp: Date.now(),
          metadata
        });
        return duration;
      }
    };
  }

  private addMetric(metric: PerformanceMetric) {
    this.metrics.push(metric);
    
    // Mantener solo las métricas más recientes
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
    
    // Log métricas lentas en desarrollo
    if (process.env.NODE_ENV === 'development' && metric.duration > 1000) {
      console.warn(`⚠️ Operación lenta detectada: ${metric.name} tomó ${metric.duration.toFixed(2)}ms`);
    }
  }

  getMetrics(name?: string): PerformanceMetric[] {
    if (name) {
      return this.metrics.filter(m => m.name === name);
    }
    return [...this.metrics];
  }

  getAverageTime(name: string): number {
    const nameMetrics = this.getMetrics(name);
    if (nameMetrics.length === 0) return 0;
    
    const total = nameMetrics.reduce((sum, m) => sum + m.duration, 0);
    return total / nameMetrics.length;
  }

  getSlowestOperations(limit = 10): PerformanceMetric[] {
    return [...this.metrics]
      .sort((a, b) => b.duration - a.duration)
      .slice(0, limit);
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Helper para monitorear funciones async
export async function withMonitoring<T>(
  name: string,
  fn: () => Promise<T>,
  metadata?: Record<string, any>
): Promise<T> {
  const timer = performanceMonitor.startTimer(name, metadata);
  try {
    const result = await fn();
    timer.end();
    return result;
  } catch (error) {
    timer.end();
    throw error;
  }
}