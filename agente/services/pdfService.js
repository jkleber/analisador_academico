import fs from 'fs';
import pdfParse from 'pdf-parse';

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

export async function extractTextFromPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(dataBuffer);

  // 🟩 Garante que tenha texto
  const text = pdfData.text || '';

  // 🟩 Extrai palavras-chave relevantes
  const keywords = extractKeywordsFromText(text);
  const query = keywords.join(' ');

  return { text, query };
}
