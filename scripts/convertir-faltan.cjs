const fs = require('fs');
const dir = 'public/data/examenes';

const fixes = [
  ['situaci', 'situaci'],
  ['situació', 'situación'],
  ['Situació', 'Situación'],
  ['analitzaríeu', 'analizaríais'],
  ['Compareu', 'Comparad'],
  ['compareu', 'comparad'],
  ['usuari', 'usuario'],
  ['usuaris', 'usuarios'],
  ['rendiment', 'rendimiento'],
  ['experiència', 'experiencia'],
  ['renderitzación', 'renderización'],
  ['triar', 'elegir'],
  ['triaries', 'elegirías'],
  ['munta', 'monta'],
  ['muntatge', 'montaje'],
  ['ordinador', 'ordenador'],
  ['volum', 'volumen'],
  ['volums', 'volúmenes'],
  ['contrasenyes', 'contraseñas'],
  ['paquets', 'paquetes'],
  ['bibliotecari', 'bibliotecario'],
  ['biblioteca', 'biblioteca'],
  ['treballador', 'trabajador'],
  ['enunciat', 'enunciado'],
  ['alhora', 'a la hora'],
  ['següent', 'siguiente'],
  ['següents', 'siguientes'],
  ['aquests', 'estos'],
  ['aquest', 'este'],
  ['aquesta', 'esta'],
  [', i ', ' y '],
  [' y i ', ' y '],
  [',i ', ', y '],
  ['fers', 'hacer'],
  ['fent', 'haciendo'],
  ['fer ', 'hacer '],
  ['fet ', 'hecho '],
  ['feta ', 'hecha '],
  ['fets ', 'hechos '],
  ['fetes ', 'hechas '],
  // Also try fixing the problematic 'l prefix
  ["l'objectiu", 'el objetivo'],
  ["l'apartat", 'el apartado'],
  ["l'opció", 'la opción'],
  ["l'estructura", 'la estructura'],
  ["l'objecte", 'el objeto'],
  ["l'accés", 'el acceso'],
  ["l'usuari", 'el usuario'],
  ["l'equip", 'el equipo'],
  ["l'empresa", 'la empresa'],
  ["l'exercici", 'el ejercicio'],
  ["l'enunciat", 'el enunciado'],
  ["l'arrencada", 'el arranque'],
  ["l'eina", 'la herramienta'],
  ["l'esquema", 'el esquema'],
  ["l'enllaç", 'el enlace'],
  ["l'extendida", 'la extendida'],
  ["l'objectiu", 'el objetivo'],
  ["l'apartat", 'el apartado'],
  ["l'opció", 'la opción'],
  ["l'estructura", 'la estructura'],
];

const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
files.forEach(f => {
  let c = fs.readFileSync(dir+'/'+f, 'utf8');
  fixes.forEach(([cat, es]) => {
    c = c.split(cat).join(es);
  });
  fs.writeFileSync(dir+'/'+f, c);
});
console.log('Done');

// Show sample
['si-eac1','si-eac2','si-eac3','dwec-eac1','ed-eac2'].forEach(f => {
  const d = JSON.parse(fs.readFileSync(dir+'/'+f+'.json','utf8'));
  console.log(f+': '+d.cards[0].front.substring(0,130));
});
