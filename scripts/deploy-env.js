#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const environment = process.argv[2];

if (!environment) {
  console.error('❌ Especifica el ambiente: node scripts/deploy-env.js [local|staging|production]');
  process.exit(1);
}

const envFiles = {
  local: '.env.local',
  staging: '.env.staging', 
  production: '.env.production.template'
};

const envFile = envFiles[environment];

if (!envFile) {
  console.error('❌ Ambiente inválido. Usa: local, staging, o production');
  process.exit(1);
}

if (!fs.existsSync(envFile)) {
  console.error(`❌ Archivo ${envFile} no encontrado`);
  process.exit(1);
}

console.log(`🚀 Configurando ambiente: ${environment.toUpperCase()}`);
console.log(`📁 Usando archivo: ${envFile}`);

// Leer y mostrar variables (sin valores sensibles)
const envContent = fs.readFileSync(envFile, 'utf8');
const lines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));

console.log('\n📋 Variables configuradas:');
lines.forEach(line => {
  const [key] = line.split('=');
  if (key) {
    console.log(`   ✅ ${key}`);
  }
});

console.log(`\n✨ Ambiente ${environment} listo para deployment`);