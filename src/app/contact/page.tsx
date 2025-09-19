'use client';

import { useState } from 'react';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      // Simulación de envío de formulario
      await new Promise(res => setTimeout(res, 1500))
      setSuccess(true)
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    } catch {
      setError('No se pudo enviar el mensaje. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Envíanos un mensaje</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Nombre</label>
          <input 
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
            aria-label="Nombre"
            placeholder="Tu nombre" 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input 
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            aria-label="Email"
            placeholder="tu@email.com" 
          />
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2">Asunto</label>
        <input 
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
          value={subject} 
          onChange={e => setSubject(e.target.value)} 
          required 
          aria-label="Asunto"
          placeholder="Asunto de tu mensaje" 
        />
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2">Mensaje</label>
        <textarea 
          className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
          required 
          aria-label="Mensaje"
          placeholder="Escribe tu mensaje aquí..." 
        />
      </div>
      
      <div className="flex items-center">
        <input 
          type="checkbox" 
          id="privacy" 
          className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
          required
        />
        <label htmlFor="privacy" className="text-sm text-gray-600">
          He leído y acepto la <Link href="#" className="text-indigo-600 hover:underline">política de privacidad</Link>
        </label>
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
        disabled={loading} 
        aria-busy={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
          </span>
        ) : 'Enviar mensaje'}
      </button>
      
      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-green-700">¡Mensaje enviado correctamente! Te responderemos lo antes posible.</p>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section con animación */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        {/* Elementos decorativos */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/10"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-purple-500/20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Estamos aquí para <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-100">ayudarte</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-indigo-100">
            Ponte en contacto con nuestro equipo para resolver tus dudas o solicitar información sobre nuestros servicios.
          </p>
        </div>
      </section>
      
      <main className="container mx-auto py-16 px-4 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Formulario de contacto */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          
          {/* Información de contacto */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tarjeta de información */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Información de contacto</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Dirección</h3>
                    <p className="mt-1 text-gray-600">123 Data Drive, Analytics City, AC 54321</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Teléfono</h3>
                    <p className="mt-1 text-gray-600">(555) 123-4567</p>
                    <p className="text-sm text-gray-500">Lun-Vie, 9am-5pm (EST)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <a 
                      href={`mailto:support@${siteConfig.url.replace('https://', '')}`} 
                      className="mt-1 text-indigo-600 hover:underline"
                    >
                      support@{siteConfig.url.replace('https://', '')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tarjeta de horario */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Horario de atención</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Lunes - Viernes</span>
                  <span className="font-medium">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sábado</span>
                  <span className="font-medium text-red-500">Cerrado</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Domingo</span>
                  <span className="font-medium text-red-500">Cerrado</span>
                </div>
              </div>
            </div>
            
            {/* Tarjeta de redes sociales */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Síguenos</h2>
              
              <div className="flex space-x-4">
                {siteConfig.links.twitter && (
                  <a 
                    href={siteConfig.links.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-indigo-100 hover:bg-indigo-200 text-indigo-600 p-3 rounded-full transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                )}
                
                {siteConfig.links.linkedin && (
                  <a 
                    href={siteConfig.links.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-indigo-100 hover:bg-indigo-200 text-indigo-600 p-3 rounded-full transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
                
                {siteConfig.links.github && (
                  <a 
                    href={siteConfig.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-indigo-100 hover:bg-indigo-200 text-indigo-600 p-3 rounded-full transition-colors"
                    aria-label="GitHub"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mapa */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-4 overflow-hidden">
          <div className="aspect-[16/9] w-full bg-gray-200 rounded-lg relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">Mapa de ubicación</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Preguntas frecuentes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">¿Cuánto tiempo tardan en responder?</h3>
              <p className="text-gray-600">Normalmente respondemos a todas las consultas en un plazo de 24-48 horas laborables.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">¿Ofrecen soporte técnico?</h3>
              <p className="text-gray-600">Sí, ofrecemos soporte técnico para todos nuestros miembros premium a través de nuestro sistema de tickets.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">¿Puedo solicitar un tema específico para el blog?</h3>
              <p className="text-gray-600">¡Por supuesto! Valoramos tus sugerencias. Puedes enviarnos tus ideas a través del formulario de contacto.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">¿Cómo puedo cancelar mi membresía?</h3>
              <p className="text-gray-600">Puedes cancelar tu membresía en cualquier momento desde tu perfil en la sección "Configuración de cuenta".</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}