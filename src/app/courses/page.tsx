'use client';

import { useState, useEffect } from 'react';
import { CourseList } from '@/components/courses/course-list';
import { Separator } from '@/components/ui/separator';
import { Course } from '@/data/courses';

// Declarar el tipo global para MiniCourse
declare global {
  interface Window {
    MiniCourse: any;
  }
}

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

  // Inicializar MiniCourse después de que el componente se monte
  useEffect(() => {
    const initMiniCourse = () => {
      if (typeof window !== 'undefined' && window.MiniCourse) {
        const app = new window.MiniCourse();
        app.init({
          code: "python-e-ia-para-principiantes-fundamentos-datos-y-modelos-e8dba3", 
          share: false
        });
      } else {
        // Reintentar después de 1 segundo si MiniCourse no está disponible
        setTimeout(initMiniCourse, 1000);
      }
    };

    initMiniCourse();
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

        {/* Curso Destacado - Python e IA */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">🔥 Curso Destacado</h2>
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-indigo-500">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-indigo-600">
                  Python e IA para Principiantes
                </h3>
                <p className="text-gray-600 mb-4">
                  Aprende los fundamentos de Python e Inteligencia Artificial desde cero. 
                  Curso completo con datos y modelos prácticos.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">🐍 Python</span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">🤖 IA</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">📊 Datos</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">🎯 Principiantes</span>
                </div>
              </div>
              <div>
                <div 
                  id="mcg-form-python-e-ia-para-principiantes-fundamentos-datos-y-modelos-e8dba3"
                  className="w-full min-h-[400px] bg-gray-50 rounded-lg"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />
        
        <div className="bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-8">Todos los Cursos</h2>
          <CourseList courses={courses} />
        </div>
      </div>
    </div>
  );
}
