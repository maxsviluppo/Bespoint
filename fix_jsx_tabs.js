
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
let content = fs.readFileSync(path, 'utf8');

// Find the Categories block end. 
// It has 5 divs followed by )}
// We only want 3 divs.

// Regex to find 5 divs followed by )} and Link Rapidi
// Using \s+ to be flexible with spaces and newlines.
const pattern = /(<\/div>\s+){5}\s+\)}\s+\r?\n\s+\{adminActiveTab === \('link_rapidi'/;

if (pattern.test(content)) {
    const newBlock = "</div>\n                      </div>\n                    </div>\n                  )}\n\n                {adminActiveTab === ('link_rapidi'";
    content = content.replace(pattern, newBlock);
    fs.writeFileSync(path, content, 'utf8');
    console.log("Replaced successfully");
} else {
    console.log("Pattern not found");
}
