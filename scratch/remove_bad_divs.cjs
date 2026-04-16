
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
let content = fs.readFileSync(path, 'utf8');
let lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('</div>  </div>')) {
        console.log(`Found bad injection at line ${i+1}: ${lines[i]}`);
        lines[i] = '';
    }
}

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log('Removed bad injected closing divs.');
