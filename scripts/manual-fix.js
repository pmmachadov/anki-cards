import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../public/data');

// Fix 1: sistemas-informaticos.json
// Buscar la línea específica y unirla
const file1 = path.join(dataDir, 'sistemas-informaticos.json');
let content1 = fs.readFileSync(file1, 'utf8');

// Buscar el patrón específico y reemplazar
// La línea tiene: "Panel de control > Sistema y seguridad > \n            Herramientas"
content1 = content1.replace(
  /Panel de control > Sistema y seguridad > \r?\n            Herramientas/,
  'Panel de control > Sistema y seguridad > Herramientas'
);

try {
  JSON.parse(content1);
  fs.writeFileSync(file1, content1, 'utf8');
  console.log('✅ sistemas-informaticos.json corregido');
} catch (e) {
  console.error('❌ sistemas-informaticos.json:', e.message);
}

// Fix 2: unidad3-autoeval-cuentas.json
// Problema: \%N\%U\profile -> las barras invertidas deben escaparse
const file2 = path.join(dataDir, 'unidad3-autoeval-cuentas.json');
let content2 = fs.readFileSync(file2, 'utf8');

// Reemplazar las barras invertidas en rutas Samba
// \%N -> \\%N, \%U -> \\%U, \profile -> \\profile
content2 = content2.replace(/\\%N/g, '\\\\%N');
content2 = content2.replace(/\\%U/g, '\\\\%U');
content2 = content2.replace(/\\profile/g, '\\\\profile');

try {
  JSON.parse(content2);
  fs.writeFileSync(file2, content2, 'utf8');
  console.log('✅ unidad3-autoeval-cuentas.json corregido');
} catch (e) {
  console.error('❌ unidad3-autoeval-cuentas.json:', e.message);
}

// Verificar todos los archivos
console.log('\n--- Verificación ---');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
let valid = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  try {
    JSON.parse(content);
    valid++;
  } catch (e) {
    console.error(`❌ ${file}: ${e.message.substring(0, 100)}`);
  }
}

console.log(`✅ ${valid}/${files.length} archivos válidos`);
