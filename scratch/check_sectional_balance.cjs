
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx', 'utf8');
const lines = content.split('\n');

let div = 0;
let frag = 0;

for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    div += (l.match(/<div/g)||[]).length - (l.match(/<\/div>/g)||[]).length;
    frag += (l.match(/<>/g)||[]).length - (l.match(/<\/>/g)||[]).length;
    
    // Check points
    if (i === 3809) console.log("Pre-Admin:", div, frag);
    if (i === 6604) console.log("Post-Admin Content:", div, frag);
}
console.log("Final:", div, frag);
