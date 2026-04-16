
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
let content = fs.readFileSync(path, 'utf8');

function fixWithMatchAll(regexStr) {
    const r = new RegExp(regexStr, 'g');
    const matches = [...content.matchAll(r)];
    
    // Process backwards to not ruin indices!
    for (let i = matches.length - 1; i >= 0; i--) {
        const match = matches[i];
        const fullBlock = match[0];
        const innerBlock = match[1];
        
        const opens = (innerBlock.match(/<div(\s|>)/g) || []).length;
        const closes = (innerBlock.match(/<\/div>/g) || []).length;
        const diff = opens - closes;
        
        if (diff > 0) {
            console.log(`Fixing block: adding ${diff} closing divs.`);
            const replacementDivs = Array(diff).fill('                      </div>').join('\n') + '\n';
            const replacement = fullBlock.replace(/\)\}\s*$/, `\n${replacementDivs}                    )}`);
            
            content = content.substring(0, match.index) + 
                      replacement + 
                      content.substring(match.index + fullBlock.length);
        }
    }
}

fixWithMatchAll("\\{adminActiveTab === '([^']+)' && \\(([\\s\\S]*?)\\n\\s*\\)\\}");
fixWithMatchAll("\\{adminActiveTab === \\('([^']+)' as any\\) && \\(([\\s\\S]*?)\\n\\s*\\)\\}");
fixWithMatchAll("\\{adminActiveTab === \\([^)]+\\) && \\(([\\s\\S]*?)\\n\\s*\\)\\}"); // for others like <AdminFeatures /> inside fragments etc if matched

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully injected balancing divs into all admin tabs via matchAll backwards!');
