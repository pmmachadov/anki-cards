const fs = require('fs');
const dir = 'public/data/examenes';

const extras = [
  ['Afegiu', 'Añadid'],
  ['discs', 'discos'],
  ['virtuals', 'virtuales'],
  ['nous', 'nuevos'],
  ['cadascun', 'cada uno'],
  ['disc', 'disco'],
  ['següents', 'siguientes'],
  ['següent', 'siguiente'],
  ['respostes', 'respuestas'],
  ['Respostes', 'Respuestas'],
  ['particions primàries', 'particiones primarias'],
  ['primàries', 'primarias'],
  ['primària', 'primaria'],
  ['estesa', 'extendida'],
  ['lògiques', 'lógicas'],
  ['lògica', 'lógica'],
  ['lògic', 'lógico'],
  ['sistemes operatius', 'sistemas operativos'],
  ['Sistemes Operatius', 'Sistemas Operativos'],
  ['sense', 'sin'],
  ['màquina', 'máquina'],
  ['procés', 'proceso'],
  ['numéric', 'numérico'],
  ['contingut', 'contenido'],
  ['altrament', 'de lo contrario'],
  ['puntuácio', 'puntuación'],
  ['qualificació', 'calificación'],
  ['finalitzen', 'finalizan'],
  ['finalitzada', 'finalizada'],
  ['lliurament', 'entrega'],
  ['Lliurament', 'Entrega'],
  ['format', 'formato'],
  ['totalment', 'totalmente'],
  ['estrictament', 'estrictamente'],
  ['visualització', 'visualización'],
  ['visualitzar', 'visualizar'],
  ['mida reduïda', 'tamaño reducido'],
  ['reduïda', 'reducida'],
  ['presentació', 'presentación'],
  ['detall', 'detalle'],
  ['remèi', 'remedio'],
  ['remeis', 'remedios'],
];

const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
let total = 0;
files.forEach(f => {
  let content = fs.readFileSync(dir + '/' + f, 'utf8');
  extras.forEach(([cat, esp]) => {
    content = content.split(cat).join(esp);
  });
  fs.writeFileSync(dir + '/' + f, content);
});
console.log('OK');
const t = JSON.parse(fs.readFileSync(dir + '/si-eac2.json', 'utf8'));
console.log(t.cards[0].front.substring(0, 200));
