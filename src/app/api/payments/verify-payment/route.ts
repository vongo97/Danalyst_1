import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { MERCADOPAGO_API_URL } from "@/lib/mercadopago";

export async function POST(request: Request) {
  try {
    const { transactionId, accessToken } = await request.json();

    // Llamada a la API de MercadoPago para obtener el estado del pago
    const response = await fetch(
      `${MERCADOPAGO_API_URL}/v1/payments/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error consultando el pago en MercadoPago");
    }

    const paymentData = await response.json();

    if (paymentData.status === "approved") {
      // Actualizar estado en la base de datos
      await prisma.payment.updateMany({
        where: { paymentId: transactionId },
        data: { status: "completed", updatedAt: new Date() },
      });

      return NextResponse.json({
        success: true,
        message: "Pago verificado correctamente con MercadoPago.",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: `Pago no aprobado. Estado actual: ${paymentData.status}`,
      });
    }
  } catch (error) {
    console.error("Error verificando el pago:", error);
    return NextResponse.json(
      { error: "Error verificando el pago" },
      { status: 500 }
    );
  }
}