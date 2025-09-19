import prisma from './prisma';

/**
 * Script para probar la conexión a la base de datos
 */
async function testDatabaseConnection() {
  console.log('Intentando conectar a la base de datos...');
  
  try {
    // Intentar una consulta simple
    const result = await prisma.$queryRaw`SELECT 1 as testConnection`;
    console.log('Conexión exitosa a la base de datos:', result);
    
    // Verificar tablas existentes
    const users = await prisma.user.count();
    console.log(`Número de usuarios en la base de datos: ${users}`);
    
    // Verificar la tabla de cuentas (importante para OAuth)
    const accounts = await prisma.account.count();
    console.log(`Número de cuentas en la base de datos: ${accounts}`);
    
    return { success: true, message: 'Conexión exitosa a la base de datos' };
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    return { 
      success: false, 
      message: 'Error de conexión a la base de datos', 
      error: error instanceof Error ? error.message : String(error) 
    };
  } finally {
    // Cerrar la conexión
    await prisma.$disconnect();
  }
}

// Ejecutar la prueba si este archivo se ejecuta directamente
if (require.main === module) {
  testDatabaseConnection()
    .then((result) => {
      console.log('Resultado de la prueba:', result);
      if (!result.success) process.exit(1);
    })
    .catch((error) => {
      console.error('Error inesperado:', error);
      process.exit(1);
    });
}

export default testDatabaseConnection;