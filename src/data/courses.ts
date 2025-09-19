export type Course = {
  curso_id: number;
  titulo: string;
  descripcion: string;
  url_imagen?: string;
  categoria_id?: number;
  nivel?: string;
  duracion?: string;
  enlace?: string;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date;
};

// Función para obtener todos los cursos usando fetch (para evitar problemas de Prisma)
export async function WorkspaceCoursesFromDB(): Promise<Course[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
    const response = await fetch(`${baseUrl}/api/courses`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Error al obtener cursos");
    }

    return response.json();
  } catch (error) {
    console.error("Error al obtener cursos:", error);
    return [];
  }
}
