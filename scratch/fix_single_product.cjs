
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
let content = fs.readFileSync(path, 'utf8');

// Fix for AdminSingleProduct extra div
const pattern1 = /<AdminSingleProduct[^>]*\/>\s+<\/div>\s+\)\}/;
if (pattern1.test(content)) {
    console.log("Found extra div in AdminSingleProduct");
    content = content.replace(/(<AdminSingleProduct[^>]*\/>)\s+<\/div>(\s+\)\})/g, "$1$2");
}

fs.writeFileSync(path, content, 'utf8');
console.log("Done");
