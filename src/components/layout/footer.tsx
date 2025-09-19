import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1: Logo y descripción */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <img src="/images/Logo.svg" alt={siteConfig.name} className="h-10 w-10 rounded-full mr-2" />
              <span className="text-xl font-bold">{siteConfig.name}</span>
            </Link>
            <p className="text-indigo-200 mb-4">
              Plataforma de aprendizaje especializada en análisis de datos, con cursos, recursos y herramientas para impulsar tu carrera profesional.
            </p>
            <div className="flex space-x-4 mt-4">
              {siteConfig.links.twitter && (
                <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-indigo-200 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              )}
              {siteConfig.links.linkedin && (
                <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-indigo-200 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
              {siteConfig.links.github && (
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-indigo-200 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-indigo-200 hover:text-white transition-colors">Inicio</Link>
              </li>
              <li>
                <Link href="/courses" className="text-indigo-200 hover:text-white transition-colors">Cursos</Link>
              </li>
              <li>
                <Link href="/blog" className="text-indigo-200 hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/membership" className="text-indigo-200 hover:text-white transition-colors">Membresía</Link>
              </li>
              <li>
                <Link href="/analysis-template-generator" className="text-indigo-200 hover:text-white transition-colors">Generador de Plantillas</Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Recursos */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-indigo-200 hover:text-white transition-colors">Tutoriales</Link>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">Documentación</a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">Webinars</a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">Comunidad</a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">Preguntas frecuentes</a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto y newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:support@${siteConfig.url.replace('https://', '')}`} className="text-indigo-200 hover:text-white transition-colors">
                  support@{siteConfig.url.replace('https://', '')}
                </a>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-indigo-200">(555) 123-4567</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-white font-medium mb-2">Suscríbete al newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-900"
                  required
                />
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-r-md transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-indigo-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-indigo-300 text-sm">
              © {currentYear} {siteConfig.name}. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-indigo-300 hover:text-white text-sm transition-colors">
                Términos de servicio
              </Link>
              <Link href="#" className="text-indigo-300 hover:text-white text-sm transition-colors">
                Política de privacidad
              </Link>
              <Link href="#" className="text-indigo-300 hover:text-white text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}