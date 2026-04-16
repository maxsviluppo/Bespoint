
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace fragment with div in AdminPanel
content = content.replace('                <>', '                <div className="admin-content-wrap">');
content = content.replace('                </>', '                </div> <!-- admin-content-wrap -->');

fs.writeFileSync(path, content, 'utf8');
console.log("Replaced fragment with wrap div");
