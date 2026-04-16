
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

let balance = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const opens = (line.match(/<div/g) || []).length;
    const closes = (line.match(/<\/div>/g) || []).length;

    if (i >= 3809 && i <= 6595) {
        if (opens > closes) {
            console.log(`Line ${i+1} (+${opens-closes}): ${line.trim()}`);
        } else if (closes > opens) {
            // console.log(`Line ${i+1} (-${closes-opens}): ${line.trim()}`);
        }
        balance += opens - closes;
    }
}
console.log(`Final Admin Balance: ${balance}`);
