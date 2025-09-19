#!/usr/bin/env node

const https = require('https');

const BASE_URL = process.env.VERCEL_URL || 'https://danalyst-post.vercel.app';

const endpoints = [
  '/',
  '/api/health',
  '/login',
  '/courses',
  '/analysis-template-generator'
];

async function checkEndpoint(path) {
  return new Promise((resolve) => {
    const url = `${BASE_URL}${path}`;
    
    https.get(url, (res) => {
      resolve({
        path,
        status: res.statusCode,
        success: res.statusCode < 400
      });
    }).on('error', (error) => {
      resolve({
        path,
        status: 0,
        success: false,
        error: error.message
      });
    });
  });
}

async function verifyDeployment() {
  console.log(`🔍 Verificando deployment en: ${BASE_URL}\n`);
  
  const results = [];
  
  for (const endpoint of endpoints) {
    const result = await checkEndpoint(endpoint);
    results.push(result);
    
    const status = result.success ? '✅' : '❌';
    const statusCode = result.status || 'ERROR';
    console.log(`${status} ${endpoint} - ${statusCode}`);
    
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  }
  
  const successful = results.filter(r => r.success).length;
  const total = results.length;
  
  console.log(`\n📊 Resultado: ${successful}/${total} endpoints funcionando`);
  
  if (successful === total) {
    console.log('🎉 ¡Deployment exitoso!');
    process.exit(0);
  } else {
    console.log('⚠️  Algunos endpoints tienen problemas');
    process.exit(1);
  }
}

verifyDeployment().catch(console.error);