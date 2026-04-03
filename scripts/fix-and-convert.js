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

// Leer archivo como texto y limpiar problemas de formato
const masterJsonPath = path.join(__dirname, '../public/data/sistemas-informaticos.json');
let content = fs.readFileSync(masterJsonPath, 'utf8');

// Limpiar caracteres de control problemáticos
content = content.replace(/(\r\n|\r)/g, '\n');

// Intentar parsear
let masterData;
try {
  masterData = JSON.parse(content);
  console.log('✅ JSON parseado correctamente');
} catch (e) {
  console.error('❌ Error parseando JSON:', e.message);
  
  // Encontrar y mostrar el contexto del error
  const match = e.message.match(/position (\d+)/);
  if (match) {
    const pos = parseInt(match[1]);
    console.log('Contexto alrededor del error:');
    console.log(content.substring(Math.max(0, pos - 100), pos + 100));
  }
  process.exit(1);
}

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

// Actualizar archivos de unidad
const dataDir = path.join(__dirname, '../public/data');
const files = fs.readdirSync(dataDir);

files.forEach(file => {
  if (file.endsWith('.json') && file !== 'sistemas-informaticos.json') {
    const filePath = path.join(dataDir, file);
    let fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Limpiar
    fileContent = fileContent.replace(/(\r\n|\r)/g, '\n');
    
    let data;
    try {
      data = JSON.parse(fileContent);
    } catch (e) {
      console.error(`❌ Error en ${file}:`, e.message);
      return;
    }
    
    if (data.cards && Array.isArray(data.cards)) {
      data.cards = data.cards.map(card => {
        if (typeof card.id === 'number') {
          if (idToUuidMap.has(card.id)) {
            return { ...card, id: idToUuidMap.get(card.id) };
          } else {
            const uuid = generateUUID();
            idToUuidMap.set(card.id, uuid);
            return { ...card, id: uuid };
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
