
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx', 'utf8');
const lines = content.split('\n');

let bal = 0;
let started = false;
for (let i = 3695; i < lines.length; i++) {
    const l = lines[i];
    if (l.includes('{isAdminOpen && (')) started = true;
    if (!started) continue;
    
    // Count brackets for the condition block
    bal += (l.match(/\(/g)||[]).length - (l.match(/\)/g)||[]).length;
    
    if (bal === 0 && started) {
        console.log("isAdminOpen block ends at line " + (i + 1));
        console.log("Content: " + l.trim());
        break;
    }
}
