import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    const {
      titulo,
      slug,
      resumen,
      contenido_md,
      autor_id,
      categoria_id,
      url_miniatura,
      url_imagen,
      fecha_publicacion,
    } = data;
    if (!titulo || !slug || !resumen || !contenido_md) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Create new blog post
    const newPost = await prisma.post.create({
      data: {
        title: titulo,
        slug,
        content: contenido_md,
        excerpt: resumen,
        coverImage: url_imagen || url_miniatura,
        authorId: autor_id,
        publishedAt: fecha_publicacion
          ? new Date(fecha_publicacion)
          : new Date(),
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error al crear post del blog:", error);
    return NextResponse.json(
      { error: "Error al crear post del blog" },
      { status: 500 }
    );
  }
}