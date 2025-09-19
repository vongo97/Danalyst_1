/**
 * Script para corregir problemas comunes en la URL de conexión a SQL Server
 */

function fixSqlServerUrl(url: string): string {
  if (!url) return url;
  
  let fixedUrl = url;
  
  // Corregir caracteres especiales en la contraseña
  const passwordMatch = url.match(/password=([^;]+)/);
  if (passwordMatch && passwordMatch[1]) {
    const password = passwordMatch[1];
    let fixedPassword = password;
    
    // Reemplazar caracteres especiales con su versión codificada
    if (password.includes('@')) {
      fixedPassword = fixedPassword.replace(/@/g, '%40');
    }
    
    if (password.includes('%') && !password.includes('%25')) {
      fixedPassword = fixedPassword.replace(/%(?!25)/g, '%25');
    }
    
    // Reemplazar otros caracteres especiales comunes
    fixedPassword = fixedPassword
      .replace(/:/g, '%3A')
      .replace(/\//g, '%2F')
      .replace(/\?/g, '%3F')
      .replace(/#/g, '%23')
      .replace(/\[/g, '%5B')
      .replace(/\]/g, '%5D');
    
    // Reemplazar la contraseña original con la versión corregida
    if (fixedPassword !== password) {
      fixedUrl = fixedUrl.replace(`password=${password}`, `password=${fixedPassword}`);
    }
  }
  
  // Asegurar que encrypt=true está presente
  if (!fixedUrl.includes('encrypt=')) {
    fixedUrl += ';encrypt=true';
  }
  
  // Asegurar que trustServerCertificate está configurado correctamente
  if (!fixedUrl.includes('trustServerCertificate=')) {
    fixedUrl += ';trustServerCertificate=false';
  }
  
  return fixedUrl;
}

// Ejemplo de uso (comentado para evitar modificar el .env real)
/*
const originalUrl = process.env.DATABASE_URL || '';
const fixedUrl = fixSqlServerUrl(originalUrl);

if (originalUrl !== fixedUrl) {
  console.log('URL original:', originalUrl);
  console.log('URL corregida:', fixedUrl);
  console.log('Actualiza tu archivo .env con la URL corregida');
} else {
  console.log('La URL no necesita correcciones');
}
*/

export { fixSqlServerUrl };