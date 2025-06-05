import { search } from '../utils/academicSearch.js';

export async function searchAcademicArticles(query) {
  return await search(query);
}

