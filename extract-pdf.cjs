const fs = require('fs');
const path = require('path');

function extractTextFromPDF(pdfPath, outputPath) {
  const buffer = fs.readFileSync(pdfPath);
  let text = '';
  let current = '';

  for (let i = 0; i < buffer.length; i++) {
    const byte = buffer[i];
    // Accept printable ASCII, Spanish chars, newlines
    if ((byte >= 32 && byte <= 126) || byte === 10 || byte === 13 || byte === 9 ||
        byte === 0xC3 || byte === 0xC2 || byte === 0xC1 || byte === 0xC9 || byte === 0xCD || byte === 0xD1 || byte === 0xD3 || byte === 0xDA || byte === 0xDC ||
        byte === 0xE1 || byte === 0xE9 || byte === 0xED || byte === 0xF1 || byte === 0xF3 || byte === 0xFA || byte === 0xFC) {
      current += String.fromCharCode(byte);
    } else {
      if (current.length > 3) {
        text += current + ' ';
      }
      current = '';
    }
  }

  // Post-process: clean up common PDF artifacts
  text = text.replace(/\s+/g, ' ');
  text = text.replace(/ stream /g, '\n');
  text = text.replace(/ endstream /g, '\n');
  text = text.replace(/ obj /g, '\n');
  text = text.replace(/ endobj /g, '\n');

  fs.writeFileSync(outputPath, text, 'utf8');
  console.log(`Extracted ${pdfPath} -> ${outputPath} (${text.length} chars)`);
}

const base = 'pruebas/sistemas informaticos';
extractTextFromPDF(path.join(base, 'DA2_0483_EAC1_Pablo_M.pdf'), 'pruebas/si_eac1.txt');
extractTextFromPDF(path.join(base, 'DA2_0483_EAC2_Machado_V.pdf'), 'pruebas/si_eac2.txt');
extractTextFromPDF(path.join(base, 'DA2_0483_EAC3_Machado_V.pdf'), 'pruebas/si_eac3.txt');
