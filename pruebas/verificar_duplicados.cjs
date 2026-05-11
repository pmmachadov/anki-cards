const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BASE_DIR = path.resolve(__dirname);

function isBinaryFile(filepath) {
  try {
    const buf = fs.readFileSync(filepath);
    if (buf.slice(0, 5).toString() === '%PDF-') return true;
    const sample = buf.slice(0, 4096);
    let nonPrintable = 0;
    for (let i = 0; i < sample.length; i++) {
      const b = sample[i];
      if (b === 0 || (b < 32 && b !== 9 && b !== 10 && b !== 13)) {
        nonPrintable++;
      }
    }
    return nonPrintable > sample.length * 0.1;
  } catch (e) {
    return true;
  }
}

function cleanBlock(text) {
  text = text.toLowerCase().trim().replace(/\s+/g, ' ');
  const skipPatterns = [
    /formació professional/,
    /codi:\s*i71/,
    /exercici d'avaluació contínua/,
    /pàgina \d+ de \d+/,
    /versió:\s*\d+/,
    /lliurament:\s*\d{2}\/\d{2}\/\d{4}/,
    /nom i cognoms/,
    /credits:/,
    /generalitat de catalunya/,
    /departament d\/educació/,
    /institut obert de catalunya/,
    /cfgs desenvolupament/,
    /presentació i resultats/,
    /criteris d'avaluació/,
    /forma i data de lliurament/,
    /notes importants/,
    /important!/,
    /nota:/,
    /espai per les respostes/,
    /respuesta:/,
    /resposta:/,
    /codi: i71/,
    /da2_0483_/,
    /activitat \d+\s*\(\d+,?\d* punts?\)/,
    /^\d+\.\s*\d+ punts?/,
    /^[a-e]\)\s*$/,
    /captura (de )?pantalla/,
    /adjunteu/,
    /el nom del document/,
    /un cop finalitzat/,
    /escriviu les vostres/,
    /heu d'utilitzar/,
    /per tant,/,
    /què s'ha d'entregar/,
    /si no/,
    /atenció!/,
    /perquè/,
    /descripció de l'activitat/,
    /objectius/,
    /materials necessaris/,
    /enllaços d'interès/,
    /solució/,
    /pauta de correcció/,
    /resultats d'aprenentatge/,
    /cfgs desenvolupament d'aplicacions/,
    /configurar (ip|dns|red)/,
    /comprobar conectividad/,
    /instalar/,
    /usando los comandos/,
    /escaneo de/,
    /exponer puertos/,
    /tcp syn/,
    /en el escaneo/,
    /cambiar a ip/,
    /verificar/,
    /ha sido creada/,
    /ahora que/,
    /mi ordenador/,
    /entonces usé/,
    /debí haber/,
    /pero no/,
    /después de/,
    /substituïu nom i cognoms/,
    /tingueu en compte que el sistema/,
    /el pes total de l'arxiu/,
    /no convertiu l['\u2019']arxiu a format word/,
    /criteris d'avaluació la puntuació/,
    /la puntuació màxima assignada/,
    /el termini de lliurament/,
    /les paf són exàmens/,
    /els exercicis d'avaluació continuada/,
    /presentació i resultats d'aprenentatge/,
    /aquest exercici d'avaluació/,
    /aquest eac es troba estructurat/,
    /les respostes han de ser/,
    /tant el text com les/,
    /en cas d'indicar-se/,
    /heu d'enviar el document/,
    /<meta name="viewport"/,
    /la proposta de solució de l'eac/,
    /cal que abans de lliurar/,
    /per tant, cal que retalleu/,
    /notes importants sobre el format/,
    /notes importants sobre el lliurament/,
    /no us limiteu a fer/,
    /la imatge resultant conté/,
    /us recomanem revisar/,
    /què s'ha d'entregar/,
    /^1\s+heu d'utilitzar/,
    /^2\s+aquest arxiu està/,
    /^3\s+cal que/,
    /pel que fa a les imatges/,
    /heu de respondre a l'espai/,
    /en cadascun dels apartats/,
    /la suma dels dos/,
  ];
  for (const pattern of skipPatterns) {
    if (pattern.test(text)) return '';
  }
  return text;
}

function segmentIntoBlocks(filepath) {
  try {
    const content = fs.readFileSync(filepath, 'utf-8');
    // Split by sentence boundaries to handle very long single-line PDF extractions
    const rawChunks = content.split(/(?<=[.!?])\s+|\n\s*\n|\n/);
    const blocks = [];
    for (const chunk of rawChunks) {
      const cleaned = cleanBlock(chunk);
      if (cleaned.length >= 60) {
        blocks.push(cleaned);
      }
    }
    return blocks;
  } catch (e) {
    console.error(`Error leyendo ${filepath}:`, e.message);
    return [];
  }
}

function similarityScore(a, b) {
  if (a === b) return 1.0;
  if (a.includes(b) || b.includes(a)) return 0.95;

  const wordsA = new Set(a.split(' '));
  const wordsB = new Set(b.split(' '));
  let common = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) common++;
  }
  const total = Math.max(wordsA.size, wordsB.size);
  return total > 0 ? common / total : 0;
}

function findDuplicates() {
  const filesBySubject = {
    'SI (Sistemes Informatics)': [
      path.join(BASE_DIR, 'si_eac1.txt'),
      path.join(BASE_DIR, 'si_eac2.txt'),
      path.join(BASE_DIR, 'si_eac3.txt'),
      path.join(BASE_DIR, 'si_da2_0483_eac1_pablo_m.txt'),
      path.join(BASE_DIR, 'si_da2_0483_eac2_machado_v.txt'),
      path.join(BASE_DIR, 'si_da2_0483_eac3_machado_v.txt'),
    ],
    'DWEC (Desenvolupament Web Client)': [
      path.join(BASE_DIR, 'desarrollo web en entorno cliente', 'guia-dwec.md'),
      path.join(BASE_DIR, 'eac1_texto.txt'),
      path.join(BASE_DIR, 'ex1', 'ex1.html'),
      path.join(BASE_DIR, 'ex2', 'ex2.html'),
      path.join(BASE_DIR, 'ex3', 'ex3.html'),
      path.join(BASE_DIR, 'ex4', 'ex4.html'),
      path.join(BASE_DIR, 'ex5', 'ex5.html'),
      path.join(BASE_DIR, 'ejercicios', 'server.js'),
    ],
    'ED (Entorns de Desenvolupament)': [
      path.join(BASE_DIR, 'entornos de desarrollo', 'guia-ed.md'),
      path.join(BASE_DIR, 'entornos de desarrollo', 'ejercicio-12', 'HELP.md'),
    ],
    'LISTA_EJERCICIOS': [
      path.join(BASE_DIR, 'ejercicios-practicos', 'lista-ejercicios-practicos.md'),
    ],
  };

  const allFiles = [];
  for (const [subject, files] of Object.entries(filesBySubject)) {
    for (const filepath of files) {
      if (fs.existsSync(filepath)) {
        if (isBinaryFile(filepath)) {
          console.log(`  [SKIP BINARIO] ${path.basename(filepath)}`);
          continue;
        }
        const blocks = segmentIntoBlocks(filepath);
        allFiles.push({ subject, filepath, blocks });
      }
    }
  }

  const reportLines = [];
  reportLines.push('='.repeat(70));
  reportLines.push('INFORME DE VERIFICACION DE CONTENIDO REPETIDO ENTRE MATERIAS');
  reportLines.push('='.repeat(70));

  reportLines.push('\n--- ARCHIVOS PROCESADOS ---');
  for (const f of allFiles) {
    reportLines.push(`  [${f.subject}] ${path.basename(f.filepath)} -> ${f.blocks.length} bloques significativos`);
  }

  const SIMILARITY_THRESHOLD = 0.85;
  let totalCrossMatches = 0;
  let totalIntraMatches = 0;
  const crossMatches = [];
  const intraMatches = [];

  for (let i = 0; i < allFiles.length; i++) {
    for (let j = i + 1; j < allFiles.length; j++) {
      const f1 = allFiles[i];
      const f2 = allFiles[j];

      const seen = new Set();
      const fileMatches = [];

      for (const b1 of f1.blocks) {
        for (const b2 of f2.blocks) {
          const score = similarityScore(b1, b2);
          if (score >= SIMILARITY_THRESHOLD) {
            const key = b1.slice(0, 120);
            if (!seen.has(key)) {
              seen.add(key);
              fileMatches.push({ b1, b2, score });
            }
          }
        }
      }

      if (fileMatches.length > 0) {
        const matchInfo = {
          f1: path.basename(f1.filepath),
          f2: path.basename(f2.filepath),
          s1: f1.subject,
          s2: f2.subject,
          count: fileMatches.length,
          examples: fileMatches.slice(0, 5),
        };

        if (f1.subject === f2.subject) {
          totalIntraMatches += fileMatches.length;
          intraMatches.push(matchInfo);
        } else {
          totalCrossMatches += fileMatches.length;
          crossMatches.push(matchInfo);
        }
      }
    }
  }

  // Cross-subject results
  reportLines.push('\n' + '='.repeat(70));
  reportLines.push('RESULTADO: CONTENIDO REPETIDO ENTRE MATERIAS DIFERENTES');
  reportLines.push('='.repeat(70));

  if (crossMatches.length === 0) {
    reportLines.push('\n✅ NO SE ENCONTRARON PREGUNTAS, EJERCICIOS O CONTENIDO REPETIDO');
    reportLines.push('   ENTRE LAS DIFERENTES MATERIAS (SI, DWEC, ED).');
  } else {
    for (const m of crossMatches) {
      reportLines.push(`\n⚠️  ${m.s1} <-> ${m.s2}`);
      reportLines.push(`   ${m.f1} <-> ${m.f2} (${m.count} coincidencias)`);
      for (let idx = 0; idx < m.examples.length; idx++) {
        const ex = m.examples[idx];
        reportLines.push(`   [${idx + 1}] (sim=${(ex.score * 100).toFixed(0)}%) ${ex.b1.slice(0, 180)}...`);
      }
      if (m.count > 5) {
        reportLines.push(`   ... y ${m.count - 5} más.`);
      }
    }
  }

  // Intra-subject results (for completeness)
  reportLines.push('\n' + '='.repeat(70));
  reportLines.push('RESULTADO: CONTENIDO REPETIDO DENTRO DE LA MISMA MATERIA');
  reportLines.push('='.repeat(70));

  if (intraMatches.length === 0) {
    reportLines.push('\n✅ NO SE ENCONTRARON PREGUNTAS, EJERCICIOS O CONTENIDO REPETIDO');
    reportLines.push('   DENTRO DE LA MISMA MATERIA.');
  } else {
    for (const m of intraMatches) {
      reportLines.push(`\n⚠️  ${m.s1}: ${m.f1} <-> ${m.f2} (${m.count} coincidencias)`);
      for (let idx = 0; idx < m.examples.length; idx++) {
        const ex = m.examples[idx];
        reportLines.push(`   [${idx + 1}] (sim=${(ex.score * 100).toFixed(0)}%) ${ex.b1.slice(0, 180)}...`);
      }
      if (m.count > 5) {
        reportLines.push(`   ... y ${m.count - 5} más.`);
      }
    }
  }

  reportLines.push('\n' + '='.repeat(70));
  reportLines.push(`RESUMEN:`);
  reportLines.push(`  Coincidencias ENTRE materias: ${totalCrossMatches}`);
  reportLines.push(`  Coincidencias DENTRO de materias: ${totalIntraMatches}`);
  reportLines.push('='.repeat(70));

  const reportPath = path.join(BASE_DIR, 'informe_duplicados.txt');
  fs.writeFileSync(reportPath, reportLines.join('\n'), 'utf-8');

  console.log(reportLines.join('\n'));
  console.log(`\nInforme guardado en: ${reportPath}`);
}

findDuplicates();
