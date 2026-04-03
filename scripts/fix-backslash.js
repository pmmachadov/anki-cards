import fs from 'fs';

const file = 'public/data/unidad3-autoeval-cuentas.json';
let content = fs.readFileSync(file, 'utf8');

// Reemplazo quirúrgico
let result = '';
let i = 0;
while (i < content.length) {
  if (content[i] === '\\' && i + 1 < content.length) {
    const next = content[i + 1];
    if (next === 'n') {
      result += '\\n';
      i += 2;
    } else if (next === 'r') {
      result += '\\r';
      i += 2;
    } else if (next === 't') {
      result += '\\t';
      i += 2;
    } else if (next === '\\' || next === '"') {
      result += '\\\\' + next;
      i += 2;
    } else if (next === '%' || /[a-zA-Z]/.test(next)) {
      result += '\\\\' + next;
      i += 2;
    } else {
      result += content[i];
      i++;
    }
  } else {
    result += content[i];
    i++;
  }
}

try {
  JSON.parse(result);
  fs.writeFileSync(file, result);
  console.log('✅ Archivo corregido exitosamente');
} catch (e) {
  console.error('❌ Error:', e.message);
  process.exit(1);
}
