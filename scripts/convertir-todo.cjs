const fs = require('fs');
const dir = 'public/data/examenes';
const map = JSON.parse(fs.readFileSync('scripts/cat2es-map.json', 'utf8'));

const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
let totalReplaced = 0;

files.forEach(f => {
  let c = fs.readFileSync(dir+'/'+f, 'utf8');
  let count = 0;
  map.forEach(([cat, es]) => {
    if (c.includes(cat)) {
      const parts = c.split(cat);
      count += parts.length - 1;
      c = parts.join(es);
    }
  });
  fs.writeFileSync(dir+'/'+f, c);
  totalReplaced += count;
  if (count > 0) console.log(f+': '+count+' reemplazos');
});

console.log('\nTotal: '+totalReplaced+' reemplazos en '+files.length+' archivos');

// Verify no Catalan left
const leftover = [];
files.forEach(f => {
  const c = fs.readFileSync(dir+'/'+f, 'utf8');
  const matches = c.match(/[àèò]/g);
  if (matches) {
    // Show examples
    const examples = [];
    let idx = c.search(/[àèò]/);
    for (let i = 0; i < 3 && idx >= 0; i++) {
      const start = Math.max(0, idx - 10);
      const end = Math.min(c.length, idx + 30);
      examples.push('...'+c.substring(start, end)+'...');
      idx = c.indexOf(c[idx], idx + 1) >= 0 ? c.indexOf(c[idx], idx + 1) : -1;
    }
    console.log('\n⚠️ Queda catalán en '+f+':');
    examples.forEach(ex => console.log('  '+ex));
  }
});

if (leftover.length === 0) console.log('\n✅ Todo en español');
