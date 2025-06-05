import { searchAcademicArticles as searchService } from '../services/searchService.js';

export async function searchAcademicArticles(req, res) {
  try {
    const query = req.query.query;
    if (!query || query.trim() === '') {
      return res.status(400).json({ success: false, error: 'Query de busca não informada.' });
    }

    const results = await searchService(query);
    res.json({ success: true, results });
  } catch (error) {
    console.error('Erro ao buscar artigos acadêmicos:', error.message);
    res.status(500).json({ success: false, error: 'Erro ao buscar artigos acadêmicos.' });
  }
}
