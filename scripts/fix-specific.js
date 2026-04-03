import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fixFile(filePath, fixes) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  for (const [pattern, replacement] of fixes) {
    content = content.replace(pattern, replacement);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  
  // Verificar
  try {
    JSON.parse(content);
    console.log(`✅ ${path.basename(filePath)}: válido`);
    return true;
  } catch (e) {
    console.error(`❌ ${path.basename(filePath)}: ${e.message}`);
    return false;
  }
}

const dataDir = path.join(__dirname, '../public/data');

// Fix 1: sistemas-informaticos.json - salto de línea después de ">"
fixFile(path.join(dataDir, 'sistemas-informaticos.json'), [
  // Unir línea que termina con "> " seguida de línea con "Herramientas"
  [/(> )\n(            Herramientas)/g, '$1$2'],
  [/(> )\r\n(            Herramientas)/g, '$1$2']
]);

// Fix 2: unidad3-autoeval-cuentas.json - backslashes en rutas Samba
fixFile(path.join(dataDir, 'unidad3-autoeval-cuentas.json'), [
  // Escapar barras invertidas simples que no estén escapadas
  [/\\([^"\\/])/g, '\\\\$1']
]);

// Fix 3: unidad3-autoeval-recursos.json - backslashes en rutas Windows  
fixFile(path.join(dataDir, 'unidad3-autoeval-recursos.json'), [
  // Escapar barras invertidas simples
  [/\\([^"\\/])/g, '\\\\$1']
]);

// Verificar todos los archivos
console.log('\n--- Verificación final ---');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
let valid = 0, invalid = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  try {
    JSON.parse(content);
    valid++;
  } catch (e) {
    console.error(`❌ ${file}: ${e.message}`);
    invalid++;
  }
}

console.log(`\n✅ Válidos: ${valid}, ❌ Inválidos: ${invalid}`);
