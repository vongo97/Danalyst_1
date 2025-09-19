/**
 * Script para validar la URL de conexión a SQL Server
 */

function validateSqlServerUrl(url: string): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];
  
  // Verificar formato básico
  if (!url.startsWith('sqlserver://')) {
    issues.push('La URL debe comenzar con "sqlserver://"');
  }
  
  // Verificar componentes esenciales
  if (!url.includes('database=')) {
    issues.push('Falta el parámetro "database="');
  }
  
  if (!url.includes('user=')) {
    issues.push('Falta el parámetro "user="');
  }
  
  if (!url.includes('password=')) {
    issues.push('Falta el parámetro "password="');
  }
  
  // Verificar caracteres especiales en la contraseña
  const passwordMatch = url.match(/password=([^;]+)/);
  if (passwordMatch && passwordMatch[1]) {
    const password = passwordMatch[1];
    if (password.includes('%') && !password.includes('%25')) {
      issues.push('La contraseña contiene caracteres % que podrían necesitar codificación URL (use %25 en lugar de %)');
    }
    
    // Verificar otros caracteres especiales comunes
    const specialChars = ['@', ':', '/', '?', '#', '[', ']'];
    for (const char of specialChars) {
      if (password.includes(char)) {
        issues.push(`La contraseña contiene el carácter especial "${char}" que podría necesitar codificación URL`);
      }
    }
  }
  
  // Verificar parámetros de seguridad
  if (!url.includes('encrypt=true')) {
    issues.push('Se recomienda usar "encrypt=true" para conexiones seguras');
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
}

// Ejecutar la validación con la URL de la base de datos
const dbUrl = process.env.DATABASE_URL || '';
const validationResult = validateSqlServerUrl(dbUrl);

console.log('Validación de URL de SQL Server:');
if (validationResult.isValid) {
  console.log('✅ La URL de conexión parece válida');
} else {
  console.log('❌ Se encontraron problemas en la URL de conexión:');
  validationResult.issues.forEach(issue => console.log(`  - ${issue}`));
}

export { validateSqlServerUrl };