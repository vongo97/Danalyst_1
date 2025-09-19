import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { siteConfig } from '@/config/site';
import { ResponsiveContainer } from '@/components/ui/responsive-container';
import { Loading } from '@/components/ui/loading';

export default function HomePage() {
  // Datos para la sección de estadísticas
  const stats = [
    { number: '35+', label: 'Cursos especializados' },
    { number: '5,000+', label: 'Estudiantes activos' },
    { number: '92%', label: 'Tasa de satisfacción' },
    { number: '24/7', label: 'Soporte técnico' },
  ];

  // Datos para la sección de testimonios
  const testimonials = [
    {
      quote: "Los cursos de Danalyst transformaron mi carrera. Pasé de analista junior a data scientist en menos de un año.",
      author: "María González",
      role: "Data Scientist en TechCorp",
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      quote: "Las herramientas de IA y las plantillas personalizadas me ahorraron semanas de trabajo en mi último proyecto.",
      author: "Carlos Rodríguez",
      role: "Business Intelligence Analyst",
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section con animación y elementos decorativos */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        {/* Elementos decorativos */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-white/10 animate-pulse"></div>
          <div
            className="absolute top-60 -right-20 w-60 h-60 rounded-full bg-purple-500/20 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/2 w-40 h-40 rounded-full bg-indigo-500/20 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <ResponsiveContainer className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
              La plataforma líder en análisis de datos
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight">
              Domina la{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-pink-300">
                TECNOLOGIA
              </span>{" "}
              y lidera tu Futuro
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-indigo-100">
              Aprende conceptos en análisis de datos,python, IA y más con
              nuestros cursos online, herramientas de IA y comunidad. Impulsa tu
              carrera y alcanza tus metas profesionales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-md text-base font-medium transition-all bg-white text-indigo-700 hover:bg-indigo-100 hover:scale-105 h-14 px-8 py-2 shadow-lg"
              >
                Ver Cursos
              </Link>
              <Link
                href="/membership"
                className="inline-flex items-center justify-center rounded-md text-base font-medium transition-all border-2 border-white/70 text-white hover:bg-white/10 hover:scale-105 h-14 px-8 py-2"
              >
                Hazte Miembro
              </Link>
            </div>
          </div>
        </ResponsiveContainer>

        {/* Imagen decorativa flotante */}
        {/* <div className="hidden lg:block absolute bottom-0 right-0 w-1/3 h-full"> */}
        {/* <div className="relative w-full h-full"> */}
        {/* <div className="absolute bottom-0 right-12 w-full max-w-md"> */}
        {/* <div className="relative w-full aspect-[4/3] float-animation"> */}
        {/* <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg transform rotate-3 scale-95"></div> */}
        {/* <div className="absolute inset-0 bg-white rounded-lg shadow-xl p-4"> */}
        {/* <div className="h-4 w-24 bg-indigo-200 rounded mb-4"></div> */}
        {/* <div className="h-3 w-full bg-gray-200 rounded mb-2"></div> */}
        {/* <div className="h-3 w-full bg-gray-200 rounded mb-2"></div> */}
        {/* <div className="h-3 w-2/3 bg-gray-200 rounded mb-4"></div> */}
        {/* <div className="h-24 w-full bg-indigo-100 rounded mb-4 flex items-center justify-center"> */}
        {/* <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"> */}
        {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> */}
        {/* </svg> */}
        {/* </div> */}
        {/* <div className="h-3 w-3/4 bg-gray-200 rounded mb-2"></div> */}
        {/* <div className="h-3 w-1/2 bg-gray-200 rounded"></div> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
      </section>

      {/* Sección de estadísticas */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="transform transition-all hover:scale-105"
              >
                <p className="text-4xl md:text-5xl font-bold text-indigo-600">
                  {stat.number}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section con diseño mejorado */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Todo lo que necesitas para dominar el análisis de datos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestra plataforma ofrece herramientas y recursos completos para
              impulsar tu carrera en el análisis de datos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cursos */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 transform -rotate-3">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Cursos Especializados</h3>
              <p className="text-gray-600 mb-6">
                Explora nuestra amplia variedad de cursos diseñados para todos
                los niveles, desde principiantes hasta expertos.
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Explorar cursos
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Generador de Plantillas */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 transform -rotate-3">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">
                Generador de Plantillas
              </h3>
              <p className="text-gray-600 mb-6">
                Crea plantillas de análisis personalizadas con ayuda de IA.
                Ahorra tiempo y mejora la calidad de tus informes y
                presentaciones.
              </p>
              <Link
                href="/analysis-template-generator"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Probar herramienta
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Membresía */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 transform -rotate-3">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Membresía Premium</h3>
              <p className="text-gray-600 mb-6">
                Accede a contenido exclusivo, mentorías personalizadas,
                networking y herramientas avanzadas para acelerar tu crecimiento
                profesional.
              </p>
              <Link
                href="/membership"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Unirse ahora
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de testimonios */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lo que dicen nuestros estudiantes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre cómo nuestra plataforma ha ayudado a profesionales a
              alcanzar sus metas en el campo del análisis de datos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8 shadow-lg relative"
              >
                <div className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4">
                  <svg
                    className="h-8 w-8 text-indigo-500"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M10 8c-2.2 0-4 1.8-4 4v10h10V12h-6c0-1.1 0.9-2 2-2h2V8h-4zM22 8c-2.2 0-4 1.8-4 4v10h10V12h-6c0-1.1 0.9-2 2-2h2V8h-4z" />
                  </svg>
                </div>
                <div className="flex items-center mb-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ¿Listo para comenzar tu viaje?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-indigo-100">
            Únete a miles de profesionales que están transformando sus carreras
            con nuestros cursos y herramientas de análisis de datos.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center justify-center rounded-md text-lg font-medium transition-all bg-white text-indigo-700 hover:bg-indigo-100 hover:scale-105 h-14 px-10 py-2 shadow-lg"
          >
            Explorar Cursos
          </Link>
        </div>
      </section>
    </div>
  );
}