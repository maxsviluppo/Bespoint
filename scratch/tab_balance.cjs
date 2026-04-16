
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx', 'utf8');

const regex = /\{adminActiveTab === '([^']+)' && \(([\s\S]*?)\n\s*\)\}/g;
let match;
while ((match = regex.exec(content)) !== null) {
    const tabName = match[1];
    const block = match[2];
    const opens = (block.match(/<div(\s|>)/g) || []).length;
    const closes = (block.match(/<\/div>/g) || []).length;
    const diff = opens - closes;
    if (diff !== 0) {
        console.log(`Tab '${tabName}' Imbalance: ${diff} (Needs ${diff} closing divs)`);
    } else {
        console.log(`Tab '${tabName}' OK`);
    }
}
// check 'link_rapidi' which doesn't match the regex perfectly
const lrRegex = /\{adminActiveTab === \('link_rapidi' as any\) && \(([\s\S]*?)\n\s*\)\}/g;
while ((match = lrRegex.exec(content)) !== null) {
    const block = match[1];
    const opens = (block.match(/<div(\s|>)/g) || []).length;
    const closes = (block.match(/<\/div>/g) || []).length;
    const diff = opens - closes;
    console.log(`Tab 'link_rapidi' Imbalance: ${diff}`);
}

// check others
const ordRegex = /\{adminActiveTab === \([^)]+\) && \(([\s\S]*?)\n\s*\)\}/g;
while ((match = ordRegex.exec(content)) !== null) {
    const block = match[1];
    const opens = (block.match(/<div(\s|>)/g) || []).length;
    const closes = (block.match(/<\/div>/g) || []).length;
    console.log(`Tab Other Imbalance: ${opens - closes}`);
}
