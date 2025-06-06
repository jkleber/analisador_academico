import { search } from '../utils/academicSearch.js';

export async function searchAcademicArticles(query) {
  // 🟢 Faz a busca e retorna o resultado diretamente
  const results = await search(query);

  // 🟢 Garante que é um array de objetos (mesmo se não encontrar nada)
  const academicResults = Array.isArray(results) ? results : [];

  // 🟢 Retorna para o controller usar
  return academicResults;
}
