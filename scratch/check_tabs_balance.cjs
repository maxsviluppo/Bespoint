
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

const tabs = [
    { name: 'Dashboard', start: 3812 },
    { name: 'Company', start: 3944 },
    { name: 'Slides', start: 4327 },
    { name: 'Categories', start: 4744 },
    { name: 'LinkRapidi', start: 5017 },
    { name: 'SEO', start: 5234 },
    { name: 'Products', start: 5563 },
    { name: 'Orders', start: 6161 },
    { name: 'Reviews', start: 6174 },
    { name: 'Payments', start: 6180 }
];

tabs.forEach(tab => {
    let balance = 0;
    let foundEnd = false;
    for (let i = tab.start - 1; i < lines.length; i++) {
        const line = lines[i];
        balance += (line.match(/<div/g) || []).length;
        balance -= (line.match(/<\/div>/g) || []).length;
        
        if (line.includes(')}')) {
            console.log(`Tab ${tab.name}: Final Balance = ${balance}`);
            foundEnd = true;
            break;
        }
    }
});
