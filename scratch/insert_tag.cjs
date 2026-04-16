
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

// Find the line with )} that follows AdminSingleProduct's end
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('/>') && lines[i+1] && lines[i+1].trim() === ')}' && i > 6000 && i < 6300) {
        console.log(`Found target at line ${i+1}. Inserting </div>.`);
        lines.splice(i+1, 0, '                      </div>');
        break;
    }
}

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log("Done");
