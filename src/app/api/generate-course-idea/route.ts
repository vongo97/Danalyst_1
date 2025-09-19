import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { topic, difficulty, targetAudience } = await req.json()
  await new Promise(res => setTimeout(res, 1000))
  return NextResponse.json({
    courseTitle: `Curso de ${topic} (${difficulty})`,
    courseDescription: `Un curso sobre ${topic} para ${targetAudience}. Nivel: ${difficulty}.`,
    suggestedModules: [
      'Introducción',
      'Fundamentos',
      'Aplicaciones prácticas',
      'Proyecto final'
    ]
  })
} 