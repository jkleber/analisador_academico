import express from 'express';
import { searchAcademicArticles } from '../controllers/searchController.js';

const router = express.Router();

// Rota para buscar artigos acadêmicos (ex.: GET /api/search?query=...)
router.get('/', searchAcademicArticles);

export default router;

