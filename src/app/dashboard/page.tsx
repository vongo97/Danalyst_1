'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [recentCourses, setRecentCourses] = useState([]);
  const [stats, setStats] = useState({
    coursesCompleted: 3,
    totalCourses: 4,
    nextMentoring: '15 de Junio, 16:00',
    savedTemplates: 12,
    savedDatasets: 5,
    unreadMessages: 3,
    upcomingEvents: 1
  });

  // Simulación de carga de datos
  useEffect(() => {
    // Aquí podrías cargar datos reales desde una API
    // setRecentCourses(await fetchRecentCourses());
    // setStats(await fetchUserStats(session?.user?.id));
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tu dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Cabecera con información del usuario */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-20 h-20 rounded-full border-4 border-white mr-6 bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl">
                  {session?.user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Bienvenido, {session?.user?.name || 'Usuario'}</h1>
                  <p className="text-indigo-100">Email: {session?.user?.email}</p>
                  <p className="text-indigo-100">Plan: Básico</p>
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md text-white transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>

          {/* Estadísticas y accesos rápidos */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Progreso de cursos</h3>
                <div className="h-2 bg-gray-200 rounded-full mb-4">
                  <div
                    className="h-2 bg-indigo-600 rounded-full"
                    style={{ width: `${(stats.coursesCompleted / stats.totalCourses) * 100}%` }}
                  ></div>
                </div>
                <p className="text-gray-600">{stats.coursesCompleted} de {stats.totalCourses} cursos completados</p>
                <Link href="/courses" className="text-indigo-600 font-medium mt-4 inline-block hover:underline">
                  Ver mis cursos →
                </Link>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Próxima mentoría</h3>
                <p className="text-gray-600">{stats.nextMentoring}</p>
                <div className="mt-4 flex space-x-2">
                  <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 text-sm">
                    Reprogramar
                  </button>
                  <button className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">
                    Unirse
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Recursos guardados</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Plantillas</span>
                  <span className="font-medium">{stats.savedTemplates}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Datasets</span>
                  <span className="font-medium">{stats.savedDatasets}</span>
                </div>
                <Link href="/resources" className="text-blue-600 font-medium inline-block hover:underline">
                  Ver recursos →
                </Link>
              </div>

              <div className="bg-pink-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Comunidad</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Mensajes sin leer</span>
                  <span className="font-medium">{stats.unreadMessages}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Eventos próximos</span>
                  <span className="font-medium">{stats.upcomingEvents}</span>
                </div>
                <Link href="/community" className="text-pink-600 font-medium inline-block hover:underline">
                  Ir a la comunidad →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de actividad reciente */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Actividad reciente</h2>
            <div className="space-y-4">
              <div className="flex items-start p-4 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-lg">
                <div className="mr-4 bg-indigo-100 p-2 rounded-full text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.328.996.002 1.069c0 .527-.422.957-.95.957-.532 0-.952-.432-.952-.957l-.002-1.066-1.88.804a1 1 0 01-1.366-.366 1 1 0 01.311-1.366L10.394 2.08z" />
                    <path d="M14.032 3.66l.944.406a1 1 0 01.516 1.315 1 1 0 01-1.315.517l-.944-.406a1 1 0 01-.516-1.316 1 1 0 011.315-.517zM3.428 7.752l-.944-.406a1 1 0 00-1.315.517 1 1 0 00.516 1.316l.944.406a1 1 0 001.316-.517 1 1 0 00-.517-1.316zM6.75 5.125L5.08 4.41a1 1 0 00-1.316.516 1 1 0 00.517 1.316l1.67.714a1 1 0 001.315-.517 1 1 0 00-.516-1.315z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Completaste el curso "Introducción al Análisis de Datos"</h3>
                  <p className="text-sm text-gray-500">Hace 2 días</p>
                </div>
              </div>

              <div className="flex items-start p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                <div className="mr-4 bg-green-100 p-2 rounded-full text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Mentoría programada con Ana López</h3>
                  <p className="text-sm text-gray-500">Para el 15 de Junio, 16:00</p>
                </div>
              </div>

              <div className="flex items-start p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                <div className="mr-4 bg-blue-100 p-2 rounded-full text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Nuevo artículo disponible</h3>
                  <p className="text-sm text-gray-500">Visualización de Datos con Matplotlib</p>
                </div>
              </div>
              <div className="flex items-start p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                <div className="mr-4 bg-red-100 p-2 rounded-full text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1.293 11.293a1 1 0 01-1.414 0L8.586 12l-.707.707a1 1 0 01-1.414-1.414l.707-.707-.707-.707a1 1 0 011.414-1.414l.707.707.707-.707a1 1 0 011.414 1.414l-.707.707z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Nuevo mensaje en la comunidad</h3>
                  <p className="text-sm text-gray-500">Revisa tus mensajes sin leer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 