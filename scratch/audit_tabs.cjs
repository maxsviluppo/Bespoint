
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

const tabs = [
    { name: 'Dashboard', startLine: 3812 },
    { name: 'Company', startLine: 3944 },
    { name: 'Slides', startLine: 4327 },
    { name: 'Categories', startLine: 4744 },
    { name: 'LinkRapidi', startLine: 5017 },
    { name: 'SEO', startLine: 5234 },
    { name: 'Products', startLine: 5563 },
    { name: 'Orders', startLine: 6161 },
    { name: 'Reviews', startLine: 6174 },
    { name: 'Payments', startLine: 6180 }
];

let currentTabIdx = 0;
let balance = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if we are starting a tab
    if (currentTabIdx < tabs.length && (i + 1) === tabs[currentTabIdx].startLine) {
        balance = 0;
    }
    
    balance += (line.match(/<div/g) || []).length;
    balance -= (line.match(/<\/div>/g) || []).length;
    
    // Check if we found )}
    if (line.includes(')}')) {
        if (currentTabIdx < tabs.length && (i+1) > tabs[currentTabIdx].startLine) {
            console.log(`Tab ${tabs[currentTabIdx].name} (end line ${i+1}): Balance=${balance}`);
            currentTabIdx++;
        }
    }
}
