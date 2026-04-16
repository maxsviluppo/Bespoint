
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
let content = fs.readFileSync(path, 'utf8');
let lines = content.split('\n');

const tabs = [
    { name: 'Dashboard', startLine: 3812 },
    { name: 'Company', startLine: 3944 },
    { name: 'Slides', startLine: 4327 },
    { name: 'Categories', startLine: 4744 },
    { name: 'LinkRapidi', startLine: 5017 },
    { name: 'SEO', startLine: 5234 },
    { name: 'Products', startLine: 5563 },
    { name: 'Orders', startLine: 6161 },
    { name: 'Reviews', startLine: 6174 },
    { name: 'Payments', startLine: 6180 }
];

let offset = 0;
tabs.forEach(tab => {
    let bal = 0;
    let foundEnd = -1;
    // We start from the absolute original line in the current modified lines
    for (let i = tab.startLine - 1; i < lines.length; i++) {
        const l = lines[i];
        bal += (l.match(/<div/g) || []).length;
        bal -= (l.match(/<\/div>/g) || []).length;
        
        if (l.trim() === ')}' || l.trim() === ')} ' || l.trim() === ');' || l.trim() === ')} )') {
             // Basic heuristic for end of tab block
             foundEnd = i;
             break;
        }
    }
    
    if (foundEnd !== -1 && bal !== 0) {
        console.log(`Fixing tab ${tab.name} at line ${foundEnd+1}. Balance was ${bal}`);
        if (bal > 0) {
            // Add closing tags
            const tags = '  </div>'.repeat(bal);
            lines.splice(foundEnd, 0, tags);
        } else {
            // This is harder (removing tags), but usually it's positive leaks.
        }
    }
});

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log("Global Tab Fix Complete");
