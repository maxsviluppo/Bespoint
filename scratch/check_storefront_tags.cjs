
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx', 'utf-8');
const lines = content.split('\n');
const start = 2856; 
const end = 3690;
const slice = lines.slice(start, end).join('\n');

let stack = [];
const tagRegex = /<(\/?)([a-zA-Z0-9\.\-]+)([^>]*?)(\/?)>/g;
let match;

while ((match = tagRegex.exec(slice)) !== null) {
    const [full, isClosing, tagName, attrs, isSelfClosing] = match;
    if (isSelfClosing || ['img', 'input', 'br', 'hr', 'link', 'meta'].includes(tagName.toLowerCase())) continue;
    if (full.endsWith('/>')) continue;
    
    if (isClosing) {
        if (stack.length === 0) continue;
        const lastTag = stack.pop();
    } else {
        stack.push({ name: tagName, line: start + slice.substring(0, match.index).split('\n').length });
    }
}
console.log('Unclosed tags in storefront:', stack.length);
stack.forEach(t => console.log(`Unclosed <${t.name}> at line ${t.line}`));
