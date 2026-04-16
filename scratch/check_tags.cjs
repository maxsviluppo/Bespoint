
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx', 'utf-8');
const lines = content.split('\n');
const start = 2850;
const end = 3500;
const slice = lines.slice(start, end).join('\n');

let stack = [];
const tagRegex = /<(\/?)([a-zA-Z0-9\.]+)([^>]*?)(\/?)>/g;
let match;

while ((match = tagRegex.exec(slice)) !== null) {
    const [full, isClosing, tagName, attrs, isSelfClosing] = match;
    
    if (isSelfClosing || ['img', 'input', 'br', 'hr'].includes(tagName.toLowerCase())) {
        continue;
    }
    
    if (isClosing) {
        if (stack.length === 0) {
            console.log(`Unexpected closing tag </${tagName}> at line ${start + slice.substring(0, match.index).split('\n').length}`);
        } else {
            const lastTag = stack.pop();
            if (lastTag.name !== tagName) {
                console.log(`Mismatch: opened <${lastTag.name}> at line ${lastTag.line}, but closed </${tagName}> at line ${start + slice.substring(0, match.index).split('\n').length}`);
            }
        }
    } else {
        stack.push({ name: tagName, line: start + slice.substring(0, match.index).split('\n').length });
    }
}

console.log('Unclosed tags:', stack);
