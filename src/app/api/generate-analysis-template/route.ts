// src/app/api/generate-analysis-template/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { rateLimiter } from "@/lib/rate-limit";

// Obtener la API key desde variables de entorno
const API_KEY = process.env.GOOGLE_API_KEY || "";

export async function POST(req: NextRequest) {
  // Rate limiting: 5 requests por minuto
  const rateLimit = await rateLimiter.check(req, 5, 60000);
  
  if (!rateLimit.success) {
    return NextResponse.json(
      { 
        error: "Demasiadas solicitudes. Intenta de nuevo en un minuto.",
        resetTime: rateLimit.resetTime 
      },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetTime.toString()
        }
      }
    );
  }

  let purpose: string = "";
  let audience: string = "";

  try {
    // Extrae los datos del cuerpo de la solicitud
    const data = await req.json();
    purpose = data.purpose;
    audience = data.audience;

    // Validar que se recibieron los datos necesarios
    if (!purpose) {
      return NextResponse.json(
        { error: "El propósito de la plantilla es requerido" },
        { status: 400 }
      );
    }

    // Inicializa el cliente de Google Generative AI
    const genAI = new GoogleGenerativeAI(API_KEY);

    // Usar el modelo gemini-2.0-flash que está disponible según el ejemplo de curl
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Construye el prompt para Gemini
    const prompt = `
      Crea una estructura detallada para una plantilla de análisis de datos con el siguiente propósito:
      "${purpose}"
      ${audience ? `La audiencia objetivo es: "${audience}"` : ""}
      
      La estructura debe incluir:
      1. Título sugerido
      2. Secciones principales con subtítulos
      3. Puntos clave a cubrir en cada sección
      4. Sugerencias de visualizaciones o gráficos relevantes
      5. Conclusiones y recomendaciones
      
      Formatea la respuesta de manera clara y profesional, utilizando markdown para la estructura.
    `;

    // Llama a la API de Gemini para generar el contenido
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const templateText = response.text();

    // Devuelve la plantilla generada al frontend
    return NextResponse.json({ template: templateText });
  } catch (error: any) {
    console.error("Error al generar la plantilla:", error);

    // Si hay un error con el modelo, usar una plantilla local como fallback
    if (
      error.message?.includes("404") ||
      error.message?.includes("Not Found")
    ) {
      const templateText = `# Análisis de Datos: ${purpose}

## 1. Introducción
- **Objetivo del análisis**: ${purpose}
- **Audiencia objetivo**: ${audience || "No especificada"}
- **Contexto y antecedentes**
- **Preguntas clave a responder**

## 2. Metodología
- **Fuentes de datos utilizadas**
- **Período de análisis**
- **Herramientas y técnicas empleadas**
- **Limitaciones del análisis**

## 3. Análisis Exploratorio de Datos
- **Estadísticas descriptivas**
- **Distribución de variables clave**
- **Identificación de valores atípicos**
- **Patrones y tendencias iniciales**

## 4. Visualizaciones Recomendadas
- **Gráficos de tendencias temporales**
- **Diagramas de dispersión para relaciones**
- **Gráficos de barras para comparaciones**

## 5. Hallazgos Principales
- **Patrones identificados**
- **Anomalías detectadas**
- **Insights relevantes para el negocio**

## 6. Conclusiones y Recomendaciones
- **Resumen de hallazgos clave**
- **Implicaciones para el negocio**
- **Acciones recomendadas**
- **Próximos pasos sugeridos**`;

      return NextResponse.json({ template: templateText });
    }

    // Manejar específicamente el error de límite de cuota
    if (
      error.message?.includes("429") ||
      error.message?.includes("Too Many Requests")
    ) {
      return NextResponse.json(
        {
          error:
            "Has excedido el límite de solicitudes a la API. Por favor, intenta de nuevo más tarde.",
        },
        { status: 429 }
      );
    }

    // Manejar otros errores
    return NextResponse.json(
      {
        error:
          "Error al generar la plantilla. Por favor, intenta de nuevo más tarde.",
      },
      { status: 500 }
    );
  }
}
