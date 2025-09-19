import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Datos de ejemplo para cursos mientras se resuelve el problema de Prisma
    const courses = [
      {
        curso_id: 1,
        titulo: "Introducción al Análisis de Datos",
        descripcion:
          "Aprende los fundamentos del análisis de datos con Python y pandas.",
        nivel: "Principiante",
        duracion: "8 semanas",
        url_imagen: "/images/pandas-intro.png",
        enlace: "/courses/intro-analisis-datos",
      },
      {
        curso_id: 2,
        titulo: "Visualización de Datos con Python",
        descripcion:
          "Domina matplotlib, seaborn y plotly para crear visualizaciones impactantes.",
        nivel: "Intermedio",
        duracion: "6 semanas",
        url_imagen: "/images/thumb-matplotlib.jpg",
        enlace: "/courses/visualizacion-datos",
      },
      {
        curso_id: 3,
        titulo: "Machine Learning para Analistas",
        descripcion:
          "Implementa algoritmos de machine learning para análisis predictivo.",
        nivel: "Avanzado",
        duracion: "12 semanas",
        url_imagen: "/images/Algoritmos-machine-learning.jpg",
        enlace: "/courses/machine-learning",
      },
      {
        curso_id: 4,
        titulo: "SQL para Análisis de Datos",
        descripcion:
          "Domina SQL para extraer insights de bases de datos relacionales.",
        nivel: "Principiante",
        duracion: "4 semanas",
        url_imagen: "/images/thumb-sql.jpg",
        enlace: "/courses/sql-analisis",
      },
    ];

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error al obtener cursos:", error);
    return NextResponse.json(
      { error: "Error al obtener cursos" },
      { status: 500 }
    );
  }
}
