import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../public/data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  console.log(`Procesando ${file}...`);
  
  // Fix 1: Corregir saltos de línea CRLF -> LF
  content = content.replace(/\r\n/g, '\n');
  content = content.replace(/\r/g, '\n');
  
  // Fix 2: Unir líneas quebradas dentro de strings JSON
  // Buscar líneas que empiecen con texto pero no con " o } o ] o ,
  // y las une con la línea anterior
  let lines = content.split('\n');
  let result = [];
  let pending = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Si estamos acumulando y la línea actual no es un cierre de string
    if (pending) {
      // Verificar si la línea actual es continuación de un string
      if (!trimmed.match(/^["\}\],]/)) {
        // Es continuación, unir con espacio
        pending += ' ' + trimmed;
        continue;
      } else {
        // No es continuación, guardar lo pendiente
        result.push(pending);
        pending = '';
      }
    }
    
    // Verificar si esta línea empieza un string que continúa en la siguiente
    if (trimmed.match(/^"[^"]*$/) && !trimmed.endsWith('",') && !trimmed.endsWith('"')) {
      pending = line;
    } else {
      result.push(line);
    }
  }
  
  if (pending) {
    result.push(pending);
  }
  
  content = result.join('\n');
  
  // Intentar parsear
  try {
    const data = JSON.parse(content);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    const cardCount = data.cards ? data.cards.length : 0;
    console.log(`✅ ${file}: JSON válido, ${cardCount} tarjetas`);
  } catch (e) {
    console.error(`❌ ${file}: ${e.message}`);
    // Intentar localizar el problema
    const match = e.message.match(/line (\d+)/);
    if (match) {
      const lineNum = parseInt(match[1]);
      console.log(`   Línea ${lineNum}: ${lines[lineNum - 1]}`);
    }
  }
}
