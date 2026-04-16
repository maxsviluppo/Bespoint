
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx', 'utf8');
const lines = content.split('\n');

let div = 0;
let frag = 0;

for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    div += (l.match(/<div/g)||[]).length - (l.match(/<\/div>/g)||[]).length;
    frag += (l.match(/<>/g)||[]).length - (l.match(/<\/>/g)||[]).length;
    
    if (l.includes('{adminActiveTab ===')) {
        console.log(`Tab Start at line ${i+1}: Div:${div} Frag:${frag} | ${l.trim()}`);
    }
    if (l.trim() === ')}' && i > 3696 && i < 6589) {
        console.log(`Block End at line ${i+1}: Div:${div} Frag:${frag}`);
    }
}
