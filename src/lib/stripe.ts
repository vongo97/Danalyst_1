// Archivo de marcador de posición para futuras implementaciones de Stripe
// La integración con Stripe está desactivada temporalmente

const dummyStripe = {
  // Implementación simulada para evitar errores
  checkout: {
    sessions: {
      create: async () => ({ url: '#' })
    }
  }
};

export default dummyStripe;