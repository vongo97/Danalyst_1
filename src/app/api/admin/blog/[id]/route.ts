import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
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

    // Update blog post
    const updatedPost = await prisma.post.update({
      where: { id: id },
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
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error al actualizar post del blog:", error);
    return NextResponse.json(
      { error: "Error al actualizar post del blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    // Delete blog post
    await prisma.post.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Post eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar post del blog:", error);
    return NextResponse.json(
      { error: "Error al eliminar post del blog" },
      { status: 500 }
    );
  }
}