import React from 'react';
import { CourseCard } from './course-card';
import { Course } from '@/data/courses'; // <-- Importa la interfaz Course

// Componente que muestra la lista de cursos
// Usamos la interfaz Course importada para la anotación de tipo
export function CourseList({ courses }: { courses: Course[] }) {



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {/* Mapeamos sobre la lista de cursos para renderizar cada tarjeta */}
      {courses.map((course, idx) => (
        <CourseCard key={idx} course={course} />
      ))}
    </div>
  );
}