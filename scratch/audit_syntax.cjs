
const fs = require('fs');
const content = fs.readFileSync(process.argv[2] || 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx', 'utf8');
const lines = content.split('\n');

let divStats = 0;
let fragStats = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const opens = (line.match(/<div/g) || []).length;
    const closes = (line.match(/<\/div>/g) || []).length;
    const fOpens = (line.match(/<>/g) || []).length;
    const fCloses = (line.match(/<\/>/g) || []).length;

    divStats += opens - closes;
    fragStats += fOpens - fCloses;

    if (divStats < 0) {
        console.log(`NEGATIVE DIV BALANCE at line ${i + 1}: ${divStats} | Content: ${line.trim()}`);
        divStats = 0; // Reset to continue scanning
    }
    if (fragStats < 0) {
        console.log(`NEGATIVE FRAG BALANCE at line ${i + 1}: ${fragStats} | Content: ${line.trim()}`);
        fragStats = 0; // Reset
    }
}
console.log(`Final Balances: Div:${divStats} Frag:${fragStats}`);
