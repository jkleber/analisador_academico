const backendUrl = 'http://localhost:4000';
const form = document.getElementById('uploadForm');
const resultDiv = document.getElementById('result');
const downloadBtn = document.getElementById('downloadBtn');

let currentFileName = '';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById('file');
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  currentFileName = fileInput.files[0].name;

  resultDiv.innerHTML = '<p>⏳ Processando... Aguarde...</p>';
  downloadBtn.style.display = 'none';

  try {
    const response = await fetch(`${backendUrl}/api/analysis/upload`, {
      method: 'POST',
      body: formData,
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error(`Erro no servidor: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    if (data.success) {
      let cleanAnalysis = data.analysis
        .replace(/[#*✅]/g, '') // Remove #, *, ✅
        .replace(/\n([A-Z][a-zA-Zçãéóê\s]+):/g, '<h3>$1</h3>') // Converte títulos em <h3>
        .replace(/\n/g, '<br>'); // Converte outras quebras de linha para <br>

      let analysisHtml = `
        <h2>Arquivo analisado: ${currentFileName}</h2>
        <div class="analysis-section-container">
          <div class="analysis-section">${cleanAnalysis}</div>
        </div>
      `;

      let academicResultsHtml = '';
      if (data.academicResults && data.academicResults.length > 0) {
        academicResultsHtml = `
          <h2>Resultados Acadêmicos</h2>
          <ul>
            ${data.academicResults
              .map(result => `
                <li style="margin-bottom: 15px; page-break-inside: avoid;">
                  <strong>${result.source}:</strong> 
                  ${
                    result.url
                      ? `<a href="${result.url}" target="_blank" rel="noopener noreferrer">${result.title}</a>`
                      : `${result.title}`
                  }
                </li>
              `).join('')}
          </ul>
        `;
      }

      resultDiv.innerHTML = `
        ${analysisHtml}
        ${academicResultsHtml}
      `;

      downloadBtn.style.display = 'inline-block';
      downloadBtn.onclick = () => {
        const element = document.getElementById('result');

        const opt = {
          margin: [0.5, 0.5, 0.5, 0.5],
          filename: `analise_${currentFileName}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, scrollY: 0, useCORS: true },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: 'css' } // Deixa o CSS controlar as quebras
        };

        html2pdf().set(opt).from(element).save();
      };
    } else {
      resultDiv.innerHTML = `<p>Erro: ${data.error}</p>`;
    }
  } catch (error) {
    resultDiv.innerHTML = `<p>Erro ao conectar ao servidor: ${error.message}</p>`;
  }
});
