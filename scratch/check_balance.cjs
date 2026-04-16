
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

let divBalance = 0;
let fragBalance = 0;
let parenBalance = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const opensDiv = (line.match(/<div/g) || []).length;
    const closesDiv = (line.match(/<\/div>/g) || []).length;
    const opensFrag = (line.match(/<>/g) || []).length;
    const closesFrag = (line.match(/<\/>/g) || []).length;
    const opensParen = (line.match(/\(/g) || []).length;
    const closesParen = (line.match(/\)/g) || []).length;

    divBalance += opensDiv - closesDiv;
    fragBalance += opensFrag - closesFrag;
    parenBalance += opensParen - closesParen;

    if (i >= 6140 && i <= 6160) {
        console.log(`Line ${i+1}: Div:${divBalance} Frag:${fragBalance} Paren:${parenBalance} | ${line.trim()}`);
    }
}
