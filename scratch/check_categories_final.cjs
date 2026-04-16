
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
let content = fs.readFileSync(path, 'utf8');
let lines = content.split('\n');

// Specific fix for Categories block balance
// We want balance to be 0 at line 5013 (before )} )
let bal = 0;
let startLine = 4744;
let endLine = 5013;

for (let i = startLine - 1; i < endLine; i++) {
    const l = lines[i];
    bal += (l.match(/<div/g) || []).length;
    bal -= (l.match(/<\/div>/g) || []).length;
}

console.log("Current Categories balance: " + bal);

if (bal > 0) {
    console.log("Removing " + bal + " extra closing divs at the end of Categories");
    // Wait, if it's POSITIVE, we have unclosed opens.
    // So we need to ADD closing tags!
} else if (bal < 0) {
    console.log("Removing " + (-bal) + " extra closing divs");
}

// Actually, I'll just manually rewrite the end of the Categories block.
// I'll make sure it has exactly the right number of tags.
