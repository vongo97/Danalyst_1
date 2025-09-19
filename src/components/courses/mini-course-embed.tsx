'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface MiniCourseEmbedProps {
  courseCode: string;
  className?: string;
}

export function MiniCourseEmbed({ courseCode, className = '' }: MiniCourseEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeCourse = () => {
    try {
      if (typeof window !== 'undefined' && (window as any).MiniCourse) {
        const app = new (window as any).MiniCourse();
        app.init({
          code: courseCode,
          share: false
        });
        setIsLoaded(true);
        setError(null);
      } else {
        setError('MiniCourse no está disponible');
      }
    } catch (err) {
      setError('Error al cargar el curso');
      console.error('Error initializing MiniCourse:', err);
    }
  };

  return (
    <>
      <Script
        src="https://share.minicoursegenerator.com/viewer.js"
        onLoad={initializeCourse}
        onError={() => setError('Error al cargar el script')}
      />
      
      <div className={`w-full min-h-[400px] ${className}`}>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={initializeCourse}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reintentar
            </button>
          </div>
        )}
        
        {!isLoaded && !error && (
          <div className="bg-gray-50 rounded-lg flex items-center justify-center h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
              <p className="text-gray-500">Cargando curso...</p>
            </div>
          </div>
        )}
        
        <div 
          id={`mcg-form-${courseCode}`}
          className="w-full"
        />
      </div>
    </>
  );
}