import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function generateAnalysis(text) {
  const prompt = `
Leia o seguinte texto acadêmico e produza UMA ANÁLISE CRÍTICA completa e OBRIGATORIAMENTE dividida em blocos:
✅ Introdução
✅ Metodologia
✅ Resultados
✅ Discussão
✅ Conclusão
✅ Referências Bibliográficas

Texto:
"""${text}"""
  `;
  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }]
  });
  return result.response.candidates[0].content.parts[0].text;
}
