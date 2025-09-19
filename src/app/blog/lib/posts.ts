// src/app/blog/lib/posts.ts
import { remark } from "remark";
import html from "remark-html";
import { getApiUrl } from "@/lib/utils";

// If BlogPost type does not exist in @prisma/client, define it manually:
export type BlogPost = {
  id: number;
  title: string;
  content: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  thumbnailUrl?: string;
  summary?: string;
  date: Date;
  // Add other fields as needed based on your schema
};

// Función para obtener todos los posts del blog desde la API
export async function getAllBlogPostsFromDB(): Promise<BlogPost[]> {
  try {
    const response = await fetch(getApiUrl("/api/blog"), {
      cache: "no-store", // No cachear para siempre obtener datos frescos
    });

    if (!response.ok) {
      throw new Error("Error al obtener posts del blog");
    }

    return response.json();
  } catch (error) {
    console.error("Error al obtener posts del blog:", error);
    return [];
  }
}

// Función para obtener un post específico por su slug desde la API
export async function getBlogPostBySlugFromDB(
  slug: string
): Promise<BlogPost | null> {
  try {
    const response = await fetch(getApiUrl(`/api/blog/${slug}`), {
      cache: "no-store", // No cachear para siempre obtener datos frescos
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Error al obtener post del blog");
    }

    return response.json();
  } catch (error) {
    console.error(`Error al obtener post con slug ${slug}:`, error);
    return null;
  }
}

// Función para obtener todos los slugs de los posts del blog
export async function getAllBlogSlugsFromDB(): Promise<string[]> {
  try {
    const posts = await getAllBlogPostsFromDB();
    return posts.map((post) => post.slug);
  } catch (error) {
    console.error("Error al obtener slugs de los posts:", error);
    return [];
  }
}