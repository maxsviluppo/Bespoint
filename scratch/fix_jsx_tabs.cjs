
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
let content = fs.readFileSync(path, 'utf8');

// Using \s+ to handle any whitespace between </div> tags
const pattern = /(<\/div>\s+){5}\s+\)}\s+\r?\n\s+\{adminActiveTab === \('link_rapidi'/;

if (pattern.test(content)) {
    const newBlock = "</div>\n                      </div>\n                    </div>\n                  )}\n\n                {adminActiveTab === ('link_rapidi'";
    content = content.replace(pattern, newBlock);
    fs.writeFileSync(path, content, 'utf8');
    console.log("Replaced successfully");
} else {
    console.log("Pattern not found");
}
