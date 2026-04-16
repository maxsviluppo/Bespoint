
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

let balance = 0;
let fragBalance = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const opens = (line.match(/<div/g) || []).length;
    const closes = (line.match(/<\/div>/g) || []).length;
    const fOpens = (line.match(/<>/g) || []).length;
    const fCloses = (line.match(/<\/>/g) || []).length;

    balance += opens - closes;
    fragBalance += fOpens - fCloses;

    if (i >= 6590 && i <= 6605) {
        console.log(`Line ${i+1}: Bal:${balance} Frag:${fragBalance} | ${line.trim()}`);
    }
}
