import { Metadata } from 'next';
import { AnalysisTemplateGeneratorForm } from '@/components/analysis-templates/analysis-templates/analysis-template-generator-form';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
    title: `Generador de Plantillas | ${siteConfig.name}`,
    description: 'Genera estructuras de plantillas para tus proyectos de análisis de datos con nuestra herramienta de IA.',
};

export default function AnalysisTemplateGeneratorPage() {
    // Ejemplos de plantillas que se pueden generar
    const templateExamples = [
        "Análisis exploratorio de datos",
        "Informe de resultados para ejecutivos",
        "Plan de proyecto de ciencia de datos",
        "Dashboard de KPIs de negocio",
        "Reporte de análisis de tendencias"
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Hero Section con animación */}
            <section className="relative py-24 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
                {/* Elementos decorativos */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/10 animate-pulse"></div>
                    <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-purple-500/20 animate-pulse" style={{animationDelay: "1s"}}></div>
                </div>
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
                        Potenciado por IA
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Generador de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-pink-300">Plantillas de Análisis</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-indigo-100">
                        Crea estructuras profesionales para tus proyectos de análisis de datos en segundos con nuestra herramienta impulsada por IA.
                    </p>
                </div>
            </section>

            <main className="container mx-auto py-16 px-4 flex-grow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Columna izquierda: Información y ejemplos */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Tarjeta de información */}
                        <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-indigo-500">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">¿Cómo funciona?</h2>
                            <p className="text-gray-600 mb-4">
                                Nuestra herramienta utiliza inteligencia artificial avanzada para generar estructuras de plantillas personalizadas para tus proyectos de análisis de datos.
                            </p>
                            <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                                <li>Describe el propósito de tu plantilla</li>
                                <li>Especifica la audiencia objetivo (opcional)</li>
                                <li>Haz clic en "Generar Plantilla"</li>
                                <li>Obtén una estructura profesional en segundos</li>
                            </ol>
                        </div>

                        {/* Tarjeta de ejemplos */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Ejemplos de plantillas</h2>
                            <ul className="space-y-3">
                                {templateExamples.map((example, index) => (
                                    <li key={index} className="flex items-center">
                                        <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 font-medium">
                                            {index + 1}
                                        </span>
                                        <span className="text-gray-700">{example}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tarjeta de membresía */}
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
                            <h2 className="text-2xl font-bold mb-4">Acceso Premium</h2>
                            <p className="mb-6">
                                Los miembros premium obtienen acceso a plantillas avanzadas, guardado ilimitado y personalización adicional.
                            </p>
                            <Link 
                                href="/membership" 
                                className="inline-block px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
                            >
                                Explorar Membresía
                            </Link>
                        </div>
                    </div>

                    {/* Columna derecha: Formulario */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Generador de Plantillas</h2>
                                    <p className="text-gray-600">Completa el formulario para crear tu plantilla personalizada</p>
                                </div>
                            </div>
                            
                            <AnalysisTemplateGeneratorForm />
                            
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <p className="text-sm text-gray-500 italic">
                                    Nota: Esta herramienta genera estructuras de plantillas, no contenido específico. Los resultados pueden variar según la descripción proporcionada.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Sección de testimonios */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-center mb-10">Lo que dicen nuestros usuarios</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="text-indigo-500">
                                    <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-gray-600 italic mb-4">"Esta herramienta me ahorró horas de trabajo. Generé una estructura de análisis completa en minutos que normalmente me habría tomado toda una tarde."</p>
                            <p className="font-medium">Carlos M. - Analista de Datos</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="text-indigo-500">
                                    <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-gray-600 italic mb-4">"La calidad de las plantillas generadas es impresionante. Mis informes ahora tienen una estructura profesional que impresiona a mis clientes."</p>
                            <p className="font-medium">Laura G. - Consultora BI</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="text-indigo-500">
                                    <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-gray-600 italic mb-4">"Perfecto para estudiantes. Uso esta herramienta para estructurar mis proyectos académicos y ha mejorado significativamente mis calificaciones."</p>
                            <p className="font-medium">Miguel A. - Estudiante de Maestría</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}