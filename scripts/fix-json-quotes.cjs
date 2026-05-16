/**
 * Script para arreglar comillas dobles sin escapar dentro de valores string en archivos JSON
 * que contienen código Java/Python/etc. con literales de string.
 */
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'public/data/prueba-ed-eac2.json');
let content = fs.readFileSync(filePath, 'utf8');

// Estrategia: recorrer el JSON caracter por caracter como un parser simple
// para encontrar y escapar las comillas que están dentro de strings JSON

function fixJson(content) {
  let result = '';
  let inString = false;
  let escapeNext = false;
  
  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    const prevCh = i > 0 ? content[i-1] : '';
    
    if (escapeNext) {
      result += ch;
      escapeNext = false;
      continue;
    }
    
    if (ch === '\\' && inString) {
      result += ch;
      escapeNext = true;
      continue;
    }
    
    if (ch === '"') {
      if (!inString) {
        inString = true;
        result += ch;
      } else {
        // We're inside a string. Check if this " ends the string or is inside it.
        // Look ahead: if next non-whitespace is , or ] or }, it's a string terminator.
        // Otherwise it's an inner quote that needs escaping.
        let j = i + 1;
        while (j < content.length && (content[j] === ' ' || content[j] === '\t' || content[j] === '\r' || content[j] === '\n')) {
          j++;
        }
        const nextSignificant = content[j];
        if (nextSignificant === ',' || nextSignificant === ']' || nextSignificant === '}' || nextSignificant === ':') {
          // End of string value
          inString = false;
          result += ch;
        } else {
          // Inner quote - escape it
          result += '\\"';
        }
      }
      continue;
    }
    
    result += ch;
  }
  
  return result;
}

const fixed = fixJson(content);

// Validate the fixed JSON
try {
  JSON.parse(fixed);
  console.log('✅ JSON válido después de la corrección');
  fs.writeFileSync(filePath, fixed, 'utf8');
  console.log('✅ Archivo guardado correctamente');
} catch (e) {
  console.error('❌ El JSON sigue siendo inválido:', e.message);
  // Save anyway to inspect
  fs.writeFileSync(filePath + '.fixed', fixed, 'utf8');
  console.log('Archivo de depuración guardado como prueba-ed-eac2.json.fixed');
}
