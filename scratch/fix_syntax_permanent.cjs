
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
let lines = fs.readFileSync(path, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
    // 1. Fix Slides close
    if (i > 4700 && i < 4800 && lines[i].includes(')}')) {
        // If the preceding line is `))} `, we found our spot.
        if (lines[i-1].includes('))}')) {
            lines[i] = lines[i].replace(')}', '  </div>\n                    </div>\n                  )}');
        }
    }
    
    // 2. Fix the fragment start
    if (i > 4800 && i < 4900 && lines[i].includes('<><div key={cat}')) {
        lines[i] = lines[i].replace('<><div key={cat}', '<div key={cat}');
    }
    
    // 3. Fix the fragment end
    if (i > 4900 && i < 5100 && lines[i].includes('</>))}')) {
        lines[i] = lines[i].replace('</>))}', '))}');
    }
}

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log('Fixed syntax bugs permanently.');
