import prisma from './prisma';

/**
 * Script para probar específicamente las tablas relacionadas con la autenticación
 */
async function testAuthTables() {
  console.log('Verificando tablas de autenticación...');
  
  try {
    // Verificar la estructura de la tabla de usuarios
    const userTableInfo = await prisma.$queryRaw`
      SELECT COLUMN_NAME, DATA_TYPE 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'User'
    `;
    console.log('Estructura de la tabla User:', userTableInfo);
    
    // Verificar la estructura de la tabla de cuentas (OAuth)
    const accountTableInfo = await prisma.$queryRaw`
      SELECT COLUMN_NAME, DATA_TYPE 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'Account'
    `;
    console.log('Estructura de la tabla Account:', accountTableInfo);
    
    // Verificar la estructura de la tabla de sesiones
    const sessionTableInfo = await prisma.$queryRaw`
      SELECT COLUMN_NAME, DATA_TYPE 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'Session'
    `;
    console.log('Estructura de la tabla Session:', sessionTableInfo);
    
    // Verificar si hay cuentas OAuth existentes
    const googleAccounts = await prisma.account.count({
      where: { provider: 'google' }
    });
    console.log(`Cuentas de Google existentes: ${googleAccounts}`);
    
    const microsoftAccounts = await prisma.account.count({
      where: { provider: 'azure-ad' }
    });
    console.log(`Cuentas de Microsoft existentes: ${microsoftAccounts}`);
    
    return { 
      success: true, 
      message: 'Verificación de tablas de autenticación completada',
      googleAccounts,
      microsoftAccounts
    };
  } catch (error) {
    console.error('Error al verificar tablas de autenticación:', error);
    return { 
      success: false, 
      message: 'Error al verificar tablas de autenticación', 
      error: error instanceof Error ? error.message : String(error) 
    };
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar la prueba si este archivo se ejecuta directamente
if (require.main === module) {
  testAuthTables()
    .then((result) => {
      console.log('Resultado de la prueba de tablas de autenticación:', result);
      if (!result.success) process.exit(1);
    })
    .catch((error) => {
      console.error('Error inesperado:', error);
      process.exit(1);
    });
}

export default testAuthTables;