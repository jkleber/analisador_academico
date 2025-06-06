import fs from 'fs';
import { extractTextFromPDF } from '../services/pdfService.js';
import { generateAnalysis } from '../services/geminiService.js';
import { searchAcademicArticles } from '../services/searchService.js';

export async function processPDF(req, res) {
  try {
    const { text, query } = await extractTextFromPDF(req.file.path);

    // 🟩 Garante que o texto é uma string
    const textoCompleto = typeof text === 'string' ? text : '';

    // 🟩 Função melhorada para extrair palavras-chave relevantes
    function extractKeywordsFromText(texto) {
      const cleanText = texto
        .toLowerCase()
        .replace(/[^a-zA-ZÀ-ÿ\s]/g, '') // remove tudo que não for letra (acentos ok)
        .replace(/\s+/g, ' '); // normaliza espaços

      const words = cleanText.split(' ');
      const stopwords = [
        'de', 'da', 'do', 'a', 'o', 'e', 'que', 'em', 'um', 'para', 'com',
        'não', 'por', 'é', 'os', 'as', 'no', 'na'
      ];

      const filtered = words.filter(word =>
        word.length > 3 &&
        word.length < 15 &&
        !stopwords.includes(word)
      );

      const freqMap = {};
      filtered.forEach(word => {
        if (!freqMap[word]) freqMap[word] = 0;
        freqMap[word]++;
      });

      const keywords = Object.entries(freqMap)
        .filter(([word, count]) => count > 1) // só palavras que aparecem mais de 1 vez
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(entry => entry[0]);

      return keywords;
    }

    // 🟩 Extraindo as palavras-chave reais (com texto garantido como string)
    const keywords = extractKeywordsFromText(textoCompleto);
    const finalQuery = keywords.join(' ');

    // 🟩 Busca acadêmica usando as palavras-chave
    const academicResults = await searchAcademicArticles(finalQuery);

    // 🟩 Gera análise do texto completo com Gemini
    const analysis = await generateAnalysis(textoCompleto);

    // 🟩 Resposta final
    res.json({ success: true, analysis, academicResults });
  } catch (error) {
    console.error('Erro:', error.message);
    res.json({ success: false, error: 'Erro ao processar o arquivo.' });
  } finally {
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Erro ao remover o arquivo:', err.message);
    });
  }
}
