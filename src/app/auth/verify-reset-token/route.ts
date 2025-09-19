// src/app/api/auth/verify-reset-token/route.ts
import { NextResponse } from "next/server";

// Compartir el mismo almacenamiento temporal
// Nota: Esto se reiniciará cuando el servidor se reinicie
const tokenStore = new Map<string, { email: string; expires: Date }>();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Token no proporcionado" },
        { status: 400 }
      );
    }

    const resetInfo = tokenStore.get(token);

    if (!resetInfo || resetInfo.expires < new Date()) {
      return NextResponse.json(
        { error: "Token inválido o expirado" },
        { status: 400 }
      );
    }

    return NextResponse.json({ valid: true }, { status: 200 });
  } catch (error) {
    console.error("Error al verificar token:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
