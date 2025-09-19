// src/app/api/summarize-blog/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GOOGLE_API_KEY;

export async function POST(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ error: 'API Key not configured' }, { status: 500 });
  }

  try {
    const { blogPostContent } = await req.json();

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Por favor, resume el siguiente contenido de blog en un párrafo conciso:\n\n${blogPostContent}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return NextResponse.json({ summary });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    // *** MODIFICAR AQUÍ para especificar el tipo de error ***
    if (process.env.NODE_ENV === 'development') {
         return NextResponse.json({ error: 'Error generating summary', details: (error as Error).message }, { status: 500 }); // <-- Usar (error as Error).message
    }
    return NextResponse.json({ error: 'Error generating summary' }, { status: 500 });
  }
}