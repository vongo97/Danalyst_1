import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Log the event for debugging
    console.log("Received Mercado Pago webhook event:", body);

    if (body.type === "payment") {
      const payment = body.data;

      // TODO: Implement your business logic here, e.g., update payment status in DB
      console.log("Payment event received:", payment);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing Mercado Pago webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing error" },
      { status: 500 }
    );
  }
}
