import { NextResponse } from "next/server";
import { createPreference } from "@/lib/mercadopago";

export async function POST(request: Request) {
  try {
    const { priceId } = await request.json();

    // Aquí deberías mapear el priceId a los detalles del producto/precio en tu sistema
    // Por simplicidad, se usa un ejemplo estático
    const appUrl = "http://localhost:3000";
    
    // Configuración específica para el entorno de prueba
    const preference = {
      items: [
        {
          id: priceId,
          title: "Suscripción de Prueba",
          quantity: 1,
          currency_id: "COP",
          unit_price: 1000,
        },
      ],
      back_urls: {
        success: `${appUrl}/membership/payment-success`,
        failure: `${appUrl}/membership`,
        pending: `${appUrl}/membership/payment-pending`,
      },
      // Configuración para modo de prueba
      test_mode: true,
    };

    const response = await createPreference(
      preference,
      process.env.MERCADOPAGO_ACCESS_TOKEN || ""
    );

    return NextResponse.json({ init_point: response.init_point });
  } catch (error) {
    console.error("Error creando preferencia de Mercado Pago:", error);
    return NextResponse.json(
      { error: "Error creando preferencia de Mercado Pago" },
      { status: 500 }
    );
  }
}
