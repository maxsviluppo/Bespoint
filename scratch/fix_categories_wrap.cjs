
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
let content = fs.readFileSync(path, 'utf8');

// Wrap Categories loop children in a fragment
// The block starts at 4868: {pageSettings.categories.filter(...).map((cat) => (
// And it should have a fragment <> after the => ( and a </> before the )) }
content = content.replace(/(\.map\(\(cat\) => \(\r?\n\s+)/, "$1<>");
content = content.replace(/(\r?\n\s+)(\)\)})/, "$1</>$2");

// AND we must ensure exactly 3 closing divs at the very end of Categories.
// Current end: 5010-5013
const catEndPattern = /(<\/div>\s+){3}\r?\n\s+\)\}\r?\n\s+\{adminActiveTab === \('link_rapidi'/;
// Wait, I'll just use my previous logic.

fs.writeFileSync(path, content, 'utf8');
console.log("Done");
