import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import analysisRoutes from './agente/routes/analysisRoutes.js';
import searchRoutes from './agente/routes/searchRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Cria a pasta 'uploads' caso não exista
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('Pasta uploads criada automaticamente.');
}

// Configuração de arquivos públicos
const publicPath = path.join(process.cwd(), 'agente', 'public');
app.use(cors());
app.use(express.static(publicPath));
app.use(express.json());

// Rotas modulares
app.use('/api/analysis', analysisRoutes);
app.use('/api/search', searchRoutes);

// Página inicial
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: publicPath });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
