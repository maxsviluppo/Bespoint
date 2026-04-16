
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
let content = fs.readFileSync(path, 'utf8');

function fixBlock(regex) {
    let match;
    let newContent = content;
    let offset = 0;
    while ((match = regex.exec(content)) !== null) {
        const fullBlock = match[0];
        const innerBlock = match[1];
        const opens = (innerBlock.match(/<div(\s|>)/g) || []).length;
        const closes = (innerBlock.match(/<\/div>/g) || []).length;
        const diff = opens - closes;
        
        if (diff > 0) {
            console.log(`Fixing block: adding ${diff} closing divs.`);
            const replacementDivs = Array(diff).fill('                      </div>').join('\n') + '\n';
            // We append the closing divs right before the ending `)}`
            const replacement = fullBlock.replace(/\)\}\s*$/, `\n${replacementDivs}                    )}`);
            
            newContent = newContent.substring(0, match.index + offset) + 
                         replacement + 
                         newContent.substring(match.index + offset + fullBlock.length);
                         
            offset += (replacement.length - fullBlock.length);
        }
    }
    content = newContent;
}

fixBlock(/\{adminActiveTab === '([^']+)' && \(([\s\S]*?)\n\s*\)\}/g);
fixBlock(/\{adminActiveTab === \('([^']+)' as any\) && \(([\s\S]*?)\n\s*\)\}/g);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully injected balancing divs into all admin tabs!');
