import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "El correo electrónico es requerido" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Por seguridad, no revelamos si el email existe o no
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hora

    // Usar el modelo PasswordReset de Prisma
    await prisma.passwordReset.create({
      data: {
        email,
        token: resetToken,
        expiresAt: resetTokenExpiry,
        used: false
      }
    });

    // En un entorno real, aquí enviarías un email con el enlace de recuperación
    console.log(`Token de recuperación para ${email}: ${resetToken}`);
    console.log(
      `URL de recuperación: ${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/reset-password?token=${resetToken}`
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error en recuperación de contraseña:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}