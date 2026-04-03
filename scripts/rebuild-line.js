import fs from 'fs';

const file = 'public/data/unidad3-autoeval-cuentas.json';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

// Reconstruir la línea 160 (índice 159)
const newBackContent = [
  'RESPUESTA:',
  '',
  'logon path',
  '',
  'CONFIGURACION TIPICA:',
  'logon path = \\\\%N\\\\%U\\\\profile',
  '',
  'SIGNIFICADO:',
  '- %N: nombre NetBIOS del servidor',
  '- %U: nombre de usuario',
  '- Perfil movil almacenado en servidor',
  '',
  'OTROS PARAMETROS RELACIONADOS:',
  '- logon drive = H:',
  '- logon home = \\\\%N\\\\%U'
].join('\\n');

lines[159] = `      "back": "${newBackContent}",`;

const newContent = lines.join('\n');

try {
  JSON.parse(newContent);
  fs.writeFileSync(file, newContent);
  console.log('✅ Archivo corregido exitosamente');
} catch (e) {
  console.error('❌ Error:', e.message);
  process.exit(1);
}
