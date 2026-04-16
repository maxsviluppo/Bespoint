
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
let content = fs.readFileSync(path, 'utf8');

// The AdminPanel root fragment starts around 3810.
// And it should close around 6594 (in original numbering).

// We want to find the </>\s+</div>\s+</motion.div>\s+</motion.div>\s+)\}\s+</AnimatePresence> pattern
// actually just search for the one near 6590.

const lines = content.split('\n');
for (let i = lines.length - 1; i > 0; i--) {
    if (lines[i].includes('</>') && i > 6000 && i < 7000) {
        console.log("Found fragment end at line " + (i+1));
        lines[i] = lines[i].replace('</>', '</div> <!-- admin-content-wrap v2 -->');
        break;
    }
}

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log("Done");
