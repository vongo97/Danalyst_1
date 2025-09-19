"use client";

import React from "react";

export const TestPaymentInstructions: React.FC = () => {
  return (
    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
      <h3 className="text-lg font-medium text-blue-800">Instrucciones para pruebas de pago</h3>
      <p className="mt-2 text-sm text-blue-600">
        Para probar el pago, usa los siguientes datos:
      </p>
      <ul className="mt-2 text-sm text-blue-600 list-disc pl-5">
        <li>Tarjeta: 5031 7557 3453 0604 (Mastercard)</li>
        <li>Código de seguridad: 123</li>
        <li>Fecha de vencimiento: 11/25</li>
        <li>Nombre: APRO (para pagos aprobados)</li>
        <li>DNI: 12345678</li>
      </ul>
      <p className="mt-2 text-sm text-blue-600">
        <strong>Importante:</strong> Asegúrate de iniciar sesión con tu cuenta de prueba en Mercado Pago.
      </p>
    </div>
  );
};