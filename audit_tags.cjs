const fs = require('fs');
const content = fs.readFileSync('src/AdminSingleProduct.tsx', 'utf8');
const lines = content.split('\n');
let stack = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const tags = line.match(/<(div|motion\.div)|<\/(div|motion\.div)>/g);
    if (tags) {
        tags.forEach(tag => {
            if (tag.startsWith('</')) {
                if (stack.length === 0) {
                    console.log(`EXTRA CLOSE at line ${i + 1}: ${tag}`);
                } else {
                    stack.pop();
                }
            } else {
                stack.push({ tag, line: i + 1 });
            }
        });
    }
    if ((i + 1) % 250 === 0) {
        console.log(`Stack at line ${i+1} (count: ${stack.length}):`, stack.map(s => s.line).join(', '));
    }
}
console.log("Final Stack (count: " + stack.length + "):", stack.map(s => s.line).join(', '));
