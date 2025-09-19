import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withCache } from "@/lib/cache";
import { withMonitoring } from "@/lib/monitoring";

export async function GET() {
  try {
    const posts = await withMonitoring(
      'blog-posts-fetch',
      () => withCache(
        'blog-posts',
        () => prisma.post.findMany({
          where: { published: true },
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            coverImage: true,
            publishedAt: true,
            author: {
              select: {
                name: true,
                image: true
              }
            }
          },
          orderBy: {
            publishedAt: "desc",
          },
        }),
        2 * 60 * 1000 // Cache por 2 minutos
      )
    );

    return NextResponse.json(posts, {
      headers: {
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300'
      }
    });
  } catch (error) {
    console.error("Error al obtener posts del blog:", error);
    return NextResponse.json(
      { error: "Error al obtener posts del blog" },
      { status: 500 }
    );
  }
}