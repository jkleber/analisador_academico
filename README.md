# Agente IA Análise Trabalhos Acadêmicos

Este projeto é um **agente de análise de trabalhos acadêmicos em PDF**, criado para gerar análises críticas e buscar artigos relacionados em bases como PubMed e SciELO.

---

## 🚀 Tecnologias usadas

- **Backend**: Node.js + Express.js
- **Frontend**: HTML, CSS e JS puro
- **API IA**: Google Gemini (`@google/generative-ai`)
- **PDF Parsing**: `pdf-parse`
- **Buscas acadêmicas**: `axios` para PubMed e SciELO
- **Exportação PDF**: `html2pdf.js` no frontend

---

## 📝 Funcionalidades

✅ Faz upload de um PDF acadêmico  
✅ Extrai o texto e gera análise crítica com a IA  
✅ Busca artigos relacionados (PubMed e SciELO)  
✅ Mostra a análise na tela e oferece download em PDF

---

## ⚙️ Como rodar localmente

1️⃣ Clone o repositório:
```bash
git clone https://github.com/jkleber/analisador_academico.git
cd analisador_academico
```

2️⃣ Instale as dependências:
```bash
npm install
```

3️⃣ Crie o arquivo .env com sua chave do Google Gemini:
```bash
GEMINI_API_KEY=SUA_CHAVE_DO_GOOGLE
```

## 📝 Nota sobre o arquivo de teste
Este projeto exige que exista um arquivo fake de teste `test/data/05-versions-space.pdf` para evitar um erro no módulo `pdf-parse`.

4️⃣ Rode o projeto:
```bash
npm start
```

➡️ Acesse no navegador: http://localhost:4000

📦 Estrutura de diretórios
```bash
/agente
  /controllers
  /services
  /routes
  /utils
  /public
/uploads
server.js
package.json
.env.example
```

⚠️ Observações
O arquivo .env e a pasta uploads/ não são enviados ao repositório (graças ao .gitignore).

A pasta uploads/ é criada automaticamente ao iniciar o servidor.

A chave de API Gemini deve ser criada e ativada no Google Cloud Console.

🤝 Contribuições
Sinta-se livre para abrir issues ou enviar pull requests!