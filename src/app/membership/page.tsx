"use client";

import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { MercadoPagoTestButton } from '@/components/payments/MercadoPagoTestButton';



const plans = [
  {
    name: "Plan Básico",
    price: "19.999",
    period: "mes",
    popular: false,
    features: [
      "Acceso a 5 cursos premium",
      "Certificados digitales",
      "Foro de la comunidad",
      "Actualizaciones mensuales",
    ],
    cta: "Comenzar Ahora",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    priceId: "price_1BasicExample" // Reemplazar con el ID real de Stripe
  },
  {
    name: "Plan Profesional",
    price: "30.999",
    period: "mes",
    popular: true,
    features: [
      "Acceso a TODOS los cursos premium",
      "Certificados digitales verificados",
      "Comunidad privada con expertos",
      "Mentoría grupal mensual",
      "Recursos y datasets exclusivos",
      "Prioridad en soporte técnico",
    ],
    cta: "Elegir Plan Recomendado",
    color: "from-indigo-600 to-purple-700",
    bgColor: "bg-gradient-to-br from-indigo-100 to-purple-100",
    priceId: "price_1ProExample" // Reemplazar con el ID real de Stripe
  },
  {
    name: "Plan Empresarial",
    price: "99.999",
    period: "mes",
    popular: false,
    features: [
      "Todo lo del Plan Profesional",
      "Mentoría personalizada semanal",
      "Proyectos guiados por expertos",
      "Acceso anticipado a nuevos cursos",
      "Licencias para equipos (hasta 5)",
      "Soporte prioritario 24/7",
    ],
    cta: "Contactar Ventas",
    color: "from-purple-600 to-pink-600",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    priceId: null // No es un plan de pago directo
  }
];

const testimonials = [
  {
    name: "Ana Martínez",
    role: "Analista de Datos Senior",
    company: "TechCorp",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    quote: "La membresía de Danalyst transformó mi carrera. Los cursos avanzados y la mentoría personalizada me ayudaron a conseguir un ascenso en solo 3 meses."
  },
  {
    name: "Carlos Rodríguez",
    role: "Científico de Datos",
    company: "DataVision",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "La comunidad de profesionales y los recursos exclusivos valen cada centavo. He aprendido más en 6 meses que en años de estudio autodidacta."
  },
  {
    name: "Laura Sánchez",
    role: "BI Specialist",
    company: "GlobalInsights",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    quote: "Las mentorías personalizadas me ayudaron a implementar soluciones avanzadas en mi empresa que generaron un ROI del 300% en el primer trimestre."
  }
];

const features = [
  {
    icon: "🚀",
    title: "Impulsa tu Carrera",
    description: "Accede a contenido exclusivo diseñado para acelerar tu crecimiento profesional en el campo del análisis de datos."
  },
  {
    icon: "👨‍🏫",
    title: "Mentorías Personalizadas",
    description: "Sesiones one-on-one con expertos de la industria que te guiarán en tu desarrollo profesional."
  },
  {
    icon: "🔍",
    title: "Proyectos del Mundo Real",
    description: "Trabaja en casos de estudio reales que podrás añadir a tu portafolio para destacar en el mercado laboral."
  },
  {
    icon: "🌐",
    title: "Comunidad Exclusiva",
    description: "Conecta con profesionales y expertos en análisis de datos para networking y oportunidades laborales."
  }
];

export default function MembershipPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section con animación */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        {/* Elementos decorativos animados */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-white/10 animate-pulse"></div>
          <div className="absolute top-60 -right-20 w-60 h-60 rounded-full bg-purple-500/20 animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute bottom-20 left-1/2 w-40 h-40 rounded-full bg-indigo-500/20 animate-pulse" style={{ animationDelay: "1.5s" }}></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
            Membresía Premium
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight">
            Desbloquea Todo Tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400">Potencial</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-indigo-100">
            Únete a la élite de analistas de datos con acceso exclusivo a recursos premium, mentorías personalizadas y una comunidad de expertos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-md text-base font-medium transition-all bg-white text-indigo-700 hover:bg-indigo-100 hover:scale-105 h-14 px-8 py-2 shadow-lg"
            >
              Ver Planes
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-md text-base font-medium transition-all border-2 border-white/70 text-white hover:bg-white/10 hover:scale-105 h-14 px-8 py-2"
            >
              Descubre Los Beneficios
            </a>
          </div>
        </div>
      </section>

      {/* Estadísticas impactantes */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-indigo-600">+500%</p>
              <p className="text-gray-600">ROI promedio</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-indigo-600">+35</p>
              <p className="text-gray-600">Cursos premium</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-indigo-600">+5,000</p>
              <p className="text-gray-600">Miembros activos</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-indigo-600">92%</p>
              <p className="text-gray-600">Tasa de promoción</p>
            </div>
          </div>
        </div>
      </section>

      {/* Características principales */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">¿Por qué elegir nuestra membresía?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Diseñada por expertos en la industria para transformar tu carrera en tiempo récord
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 transform transition-all hover:scale-105">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planes de precios */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Planes diseñados para tu éxito</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige el plan que mejor se adapte a tus objetivos profesionales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl shadow-xl overflow-hidden transform transition-all ${plan.popular ? 'md:-translate-y-4 scale-105 z-10' : 'hover:scale-105'
                  } ${plan.bgColor}`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-2 font-medium">
                    Más Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-end mb-6">
                    <span className="text-5xl font-extrabold">${plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.priceId ? <MercadoPagoTestButton priceId={plan.priceId} /> : (
                    <button
                      className={`w-full py-3 px-6 rounded-lg font-medium text-white bg-gradient-to-r ${plan.color} hover:opacity-90 transition-all`}
                      onClick={() => alert('Por favor, contacta con ventas para este plan.')}
                    >
                      {plan.cta}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600">¿Necesitas un plan personalizado para tu empresa?</p>
            <Link href="/contact" className="text-indigo-600 font-medium hover:underline">
              Contáctanos para una solución a medida →
            </Link>
          </div>
        </div>
      </section >

      {/* Testimonios */}
      < section className="py-20 bg-white" >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Lo que dicen nuestros miembros</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Historias reales de profesionales que transformaron su carrera con nuestra membresía
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* FAQ */}
      < section className="py-20 bg-gray-50" >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Preguntas frecuentes</h2>
            <p className="text-xl text-gray-600">
              Todo lo que necesitas saber sobre nuestra membresía premium
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">¿Cómo funciona la membresía?</h3>
              <p className="text-gray-600">Al suscribirte, obtendrás acceso inmediato a todos los beneficios según el plan elegido. Podrás acceder a los cursos, recursos y la comunidad a través de tu cuenta personal en nuestra plataforma.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">¿Puedo cancelar en cualquier momento?</h3>
              <p className="text-gray-600">Sí, puedes cancelar tu suscripción en cualquier momento. Mantendrás el acceso hasta el final del período facturado.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">¿Cómo funcionan las mentorías?</h3>
              <p className="text-gray-600">Las mentorías se programan a través de nuestra plataforma. Dependiendo de tu plan, tendrás acceso a sesiones grupales o individuales con expertos en análisis de datos.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">¿Los certificados tienen validez oficial?</h3>
              <p className="text-gray-600">Nuestros certificados están respaldados por profesionales de la industria y son reconocidos por muchas empresas del sector. No son títulos académicos oficiales, pero demuestran tus habilidades y conocimientos.</p>
            </div>
          </div>
        </div>
      </section >

      {/* CTA Final */}
      < section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white" >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">¿Listo para transformar tu carrera?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Únete hoy a nuestra comunidad de élite y desbloquea todo tu potencial como analista de datos.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-md text-lg font-medium transition-all bg-white text-indigo-700 hover:bg-indigo-100 hover:scale-105 h-14 px-10 py-2 shadow-lg"
          >
            Comenzar Ahora
          </a>
          <p className="mt-6 text-indigo-200">
            Garantía de devolución de 30 días. Sin riesgos.
          </p>
        </div>
      </section >
    </div >
  );
}
