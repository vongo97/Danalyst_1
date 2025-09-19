import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug no proporcionado' },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({
      where: {
        slug: slug
      }
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(`Error al obtener post con slug ${params.slug}:`, error);
    return NextResponse.json(
      { error: 'Error al obtener post del blog' },
      { status: 500 }
    );
  }
}