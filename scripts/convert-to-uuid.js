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

// Leer archivo JSON maestro
const masterJsonPath = path.join(__dirname, '../public/data/sistemas-informaticos.json');
const masterData = JSON.parse(fs.readFileSync(masterJsonPath, 'utf8'));

// Mapa para almacenar la relación entre ID numérico y UUID
const idToUuidMap = new Map();

// Asignar UUID a cada tarjeta
masterData.cards = masterData.cards.map(card => {
  const uuid = generateUUID();
  idToUuidMap.set(card.id, uuid);
  return {
    ...card,
    id: uuid
  };
});

// Guardar archivo maestro actualizado
fs.writeFileSync(masterJsonPath, JSON.stringify(masterData, null, 4), 'utf8');
console.log(`✅ Archivo maestro actualizado: ${masterData.cards.length} tarjetas con UUID`);

// Listar archivos de unidad para actualizar
const dataDir = path.join(__dirname, '../public/data');
const files = fs.readdirSync(dataDir);

files.forEach(file => {
  if (file.endsWith('.json') && file !== 'sistemas-informaticos.json') {
    const filePath = path.join(dataDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (data.cards && Array.isArray(data.cards)) {
      data.cards = data.cards.map(card => {
        // Si el ID es numérico, convertirlo a UUID
        if (typeof card.id === 'number') {
          // Verificar si ya existe un UUID para este ID
          if (idToUuidMap.has(card.id)) {
            return {
              ...card,
              id: idToUuidMap.get(card.id)
            };
          } else {
            // Generar nuevo UUID si no existe
            const uuid = generateUUID();
            idToUuidMap.set(card.id, uuid);
            return {
              ...card,
              id: uuid
            };
          }
        }
        return card;
      });
      
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`✅ ${file}: ${data.cards.length} tarjetas actualizadas`);
    }
  }
});

console.log('\n✅ Conversión completada. Todos los IDs son ahora UUID v4.');
console.log(`📊 Total de tarjetas procesadas: ${masterData.cards.length}`);
