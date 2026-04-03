import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generar UUID v4
function generateUUID() {
  return crypto.randomUUID();
}

const dataDir = path.join(__dirname, '../public/data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

// Primero, procesar todos los archivos y crear el mapa de IDs
const idToUuidMap = new Map();
const fileData = [];

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  
  if (data.cards && Array.isArray(data.cards)) {
    // Generar UUIDs para todas las tarjetas con ID numérico
    for (const card of data.cards) {
      if (typeof card.id === 'number' && !idToUuidMap.has(card.id)) {
        idToUuidMap.set(card.id, generateUUID());
      }
    }
    fileData.push({ file, path: filePath, data });
  }
}

console.log(`Generados ${idToUuidMap.size} UUIDs únicos`);

// Ahora actualizar todos los archivos
for (const { file, path: filePath, data } of fileData) {
  // Actualizar tarjetas con UUIDs
  if (data.cards) {
    data.cards = data.cards.map(card => {
      if (typeof card.id === 'number' && idToUuidMap.has(card.id)) {
        return { ...card, id: idToUuidMap.get(card.id) };
      }
      return card;
    });
  }
  
  // Guardar con formato consistente
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  const cardCount = data.cards ? data.cards.length : 0;
  console.log(`✅ ${file}: ${cardCount} tarjetas actualizadas`);
}

console.log('\n✅ Conversión completada exitosamente.');
console.log(`📊 Total de UUIDs generados: ${idToUuidMap.size}`);
