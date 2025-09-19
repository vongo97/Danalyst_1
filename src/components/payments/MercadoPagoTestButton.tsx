"use client";

import React, { useState } from "react";
import { TestPaymentInstructions } from "./TestPaymentInstructions";

interface MercadoPagoTestButtonProps {
  priceId: string;
}

export const MercadoPagoTestButton: React.FC<MercadoPagoTestButtonProps> = ({ priceId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/payments/create-mercadopago-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (data.init_point) {
        console.log("Redirigiendo a:", data.init_point);
        // Abre en una nueva pestaña para mantener el contexto actual
        window.open(data.init_point, "_blank");
      } else {
        setError("Error al crear la preferencia de pago.");
        console.error("Error en la respuesta:", data);
      }
    } catch (err) {
      console.error("Error completo:", err);
      setError("Error de red al crear la preferencia de pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          {loading ? "Procesando..." : "Pagar con MercadoPago (Prueba)"}
        </button>
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          {showInstructions ? "Ocultar instrucciones" : "Ver instrucciones de prueba"}
        </button>
      </div>
      
      {error && <p className="mt-2 text-red-600">{error}</p>}
      
      {showInstructions && <TestPaymentInstructions />}
    </div>
  );
};