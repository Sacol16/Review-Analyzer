import { NextRequest, NextResponse } from 'next/server';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || '',
});

// Estructura JSON deseada (puedes ajustar los campos)
const jsonTemplate = `
{
  "sentiment": {
    "positive": %,
    "neutral": %,
    "negative": %
  },
  "attributes": {
    "calidad": número del 1 al 5,
    "precio": número del 1 al 5,
    "diseño": número del 1 al 5,
    "durabilidad": número del 1 al 5
  },
  "topics": [
    { "name": string, "value": número },
    ...
  ],
  "suggestions": [
    string,
    ...
  ]
}`;

export async function POST(req: NextRequest) {
  try {
    const { reviews } = await req.json();

    if (!reviews || !Array.isArray(reviews)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // 1️⃣ Primer llamado: análisis general
    const promptAnalysis = `
Analiza estas reseñas de producto y genera un análisis completo con sentimiento, atributos, temas frecuentes y sugerencias de mejora. Entrega la respuesta en texto plano explicativo:

${reviews.map((r, i) => `${i + 1}. ${r}`).join("\n")}
`;

    const analysisResponse = await cohere.generate({
      model: 'command-r-plus',
      prompt: promptAnalysis,
      maxTokens: 1500,
      temperature: 0.7,
    });

    const rawText = analysisResponse.generations[0]?.text?.trim();
    console.log("Respuesta ANALÍTICA de la IA:\n", rawText);

    // 2️⃣ Segundo llamado: pedir conversión a JSON estricto
    const promptFormat = `
Convierte el siguiente análisis en un JSON estrictamente válido con esta estructura:

${jsonTemplate}

Texto a convertir:
${rawText}
`;

    const formatResponse = await cohere.generate({
      model: 'command-r-plus',
      prompt: promptFormat,
      maxTokens: 1000,
      temperature: 0,
    });

    const formattedText = formatResponse.generations[0]?.text?.trim();
    console.log("Respuesta FORMATEADA de la IA:\n", formattedText);

    const jsonMatch = formattedText.match(/{[\s\S]*}/);

    if (!jsonMatch) {
        throw new Error('No se pudo encontrar un bloque JSON válido en la respuesta.');
    }

    const parsed = JSON.parse(jsonMatch[0]);


    return NextResponse.json(parsed);

  } catch (error) {
    console.error('Error en análisis con Cohere:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Error processing reviews with Cohere' }, { status: 500 });
    }

}
