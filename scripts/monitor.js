#!/usr/bin/env node

const http = require('http');

const HEALTH_URL = process.env.HEALTH_URL || 'http://localhost:5001/api/health';
const CHECK_INTERVAL = 30000; // 30 segundos

async function checkHealth() {
  return new Promise((resolve) => {
    const req = http.get(HEALTH_URL, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const health = JSON.parse(data);
          resolve({
            status: res.statusCode === 200 ? 'healthy' : 'unhealthy',
            data: health,
            statusCode: res.statusCode
          });
        } catch (error) {
          resolve({
            status: 'error',
            error: 'Invalid JSON response',
            statusCode: res.statusCode
          });
        }
      });
    });
    
    req.on('error', (error) => {
      resolve({
        status: 'error',
        error: error.message,
        statusCode: 0
      });
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        status: 'timeout',
        error: 'Request timeout',
        statusCode: 0
      });
    });
  });
}

function formatBytes(bytes) {
  return `${bytes}MB`;
}

function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

async function monitor() {
  console.log(`🔍 Iniciando monitoreo de ${HEALTH_URL}`);
  console.log(`⏱️  Verificando cada ${CHECK_INTERVAL / 1000} segundos\n`);
  
  while (true) {
    const timestamp = new Date().toLocaleTimeString();
    const result = await checkHealth();
    
    if (result.status === 'healthy') {
      const { data } = result;
      console.log(`✅ [${timestamp}] Sistema saludable`);
      console.log(`   💾 Memoria: ${formatBytes(data.memory.used)}/${formatBytes(data.memory.total)}`);
      console.log(`   ⏰ Uptime: ${formatUptime(data.uptime)}`);
      console.log(`   🗄️  DB: ${data.database.responseTime}ms`);
      console.log(`   📦 Cache: ${data.cache.size} items`);
      
      if (data.performance.slowestOperations.length > 0) {
        console.log(`   🐌 Operación más lenta: ${data.performance.slowestOperations[0].name} (${data.performance.slowestOperations[0].duration}ms)`);
      }
    } else {
      console.log(`❌ [${timestamp}] Sistema no saludable`);
      console.log(`   Error: ${result.error || 'Unknown error'}`);
      console.log(`   Status: ${result.statusCode}`);
    }
    
    console.log(''); // Línea en blanco
    
    await new Promise(resolve => setTimeout(resolve, CHECK_INTERVAL));
  }
}

// Manejo de señales para salida limpia
process.on('SIGINT', () => {
  console.log('\n👋 Deteniendo monitoreo...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Deteniendo monitoreo...');
  process.exit(0);
});

monitor().catch(console.error);