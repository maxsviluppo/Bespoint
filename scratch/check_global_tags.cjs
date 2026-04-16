
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

let balance = 0;
let fragBalance = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Count div tags manually to avoid regex issues with comments
    // Actually, simple regex is fine if we are careful.
    const opens = (line.match(/<div/g) || []).length;
    const closes = (line.match(/<\/div>/g) || []).length;
    const fOpens = (line.match(/<>/g) || []).length;
    const fCloses = (line.match(/<\/>/g) || []).length;

    balance += opens - closes;
    fragBalance += fOpens - fCloses;

    if (i >= 3809 && i <= 6160) {
        if (balance < 0 || fragBalance < 0) {
            console.log(`!! Error at line ${i+1}: Balance=${balance} Frag=${fragBalance}`);
        }
    }
}
console.log("Scan complete");
