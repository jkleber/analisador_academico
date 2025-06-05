import fs from 'fs';
import { extractTextFromPDF } from '../services/pdfService.js';
import { generateAnalysis } from '../services/geminiService.js';
import { searchAcademicArticles } from '../services/searchService.js';

export async function processPDF(req, res) {
  try {
    const textoCompleto = await extractTextFromPDF(req.file.path);
    const analysis = await generateAnalysis(textoCompleto);

    // Extração simples de palavras-chave
    const wordCounts = {};
    textoCompleto.split(/\s+/).forEach(word => {
      const clean = word.toLowerCase().replace(/[^\w\s]/gi, '');
      if (clean && clean.length > 3) wordCounts[clean] = (wordCounts[clean] || 0) + 1;
    });
    const keywords = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]).slice(0, 5);

    const academicResults = await searchAcademicArticles(keywords.join(' '));

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
