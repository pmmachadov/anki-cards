import fs from 'fs';
import path from 'path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const dir = 'pruebas/sistemas informaticos';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.pdf'));

for (const file of files) {
  const pdfPath = path.join(dir, file);
  const outPath = `pruebas/si_${file.replace('.pdf', '').toLowerCase().replace(/ /g, '_')}.txt`;
  
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await getDocument({ data }).promise;
  
  let fullText = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }
  
  fs.writeFileSync(outPath, fullText, 'utf8');
  console.log(`Extracted ${file} -> ${outPath} (${fullText.length} chars)`);
}
