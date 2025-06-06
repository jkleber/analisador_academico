import axios from 'axios';

export async function search(query) {
  try {
    const pubmedResults = await searchPubMed(query);
    const scieloResults = await searchSciELO(query);

    return [...pubmedResults, ...scieloResults];
  } catch (error) {
    console.error('Erro na busca acadêmica:', error.message);
    return [];
  }
}

async function searchPubMed(query) {
  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmax=5&term=${encodeURIComponent(query)}&retmode=json`;
  const response = await axios.get(url);
  const ids = response.data.esearchresult.idlist;

  const detailsUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json`;
  const detailsResponse = await axios.get(detailsUrl);
  const docs = detailsResponse.data.result;

  const results = [];
  ids.forEach(id => {
    const doc = docs[id];
    if (doc) {
      results.push({
        title: doc.title,
        url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
        source: 'PubMed'
      });
    }
  });

  return results;
}

async function searchSciELO(query) {
  // Exemplo: URL fictícia de busca (ajuste conforme necessidade real)
  const url = `https://api.scielo.org/?q=${encodeURIComponent(query)}`;
  try {
    const response = await axios.get(url);
    const results = response.data.map(doc => ({
      title: doc.title,
      url: doc.url,
      source: 'SciELO'
    }));
    return results;
  } catch {
    return [];
  }
}


