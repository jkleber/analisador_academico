import { search } from './agente/utils/academicSearch.js';

const termoBusca = 'odontologia';

console.log('🔍 Buscando no PubMed e SciELO por:', termoBusca);

try {
  const resultados = await search(termoBusca);
  console.log('🔬 Resultados encontrados:', resultados);
} catch (error) {
  console.error('❌ Erro ao buscar:', error.message);
}
