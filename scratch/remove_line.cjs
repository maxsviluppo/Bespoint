
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
const lines = fs.readFileSync(path, 'utf8').split('\n');

// Line 6146 is index 6145
if (lines[6145].includes('</div>')) {
    console.log("Removing line 6146: " + lines[6145]);
    lines.splice(6145, 1);
    fs.writeFileSync(path, lines.join('\n'), 'utf8');
    console.log("Fixed successfully");
} else {
    console.log("Line 6146 does not contain expected div: " + lines[6145]);
}
