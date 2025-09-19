'use client';

import { useState, useEffect } from 'react';
import { CourseList } from '@/components/courses/course-list';
import { Separator } from '@/components/ui/separator';
import { Course } from '@/data/courses';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error('Error al obtener cursos');
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <section className="relative py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Nuestros Cursos de Análisis de Datos
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Explora nuestra amplia gama de cursos diseñados para impulsar tu carrera en el análisis de datos.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <Separator className="my-8" />
          <div className="text-center py-8">
            <p className="text-lg">Cargando cursos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <section className="relative py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Nuestros Cursos de Análisis de Datos
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Explora nuestra amplia gama de cursos diseñados para impulsarte en
              este mercado de nuevas tecnologías.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <Separator className="my-8" />
          <div className="text-center py-8">
            <p className="text-lg text-red-600">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section className="relative py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Nuestros Cursos de Análisis de Datos
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Explora nuestra amplia gama de cursos diseñados para impulsar tu carrera en el análisis de datos.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Separator className="my-8" />

        <div className="bg-gray-50">
          <CourseList courses={courses} />
        </div>
      </div>
    </div>
  );
}
