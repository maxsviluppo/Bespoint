
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
let content = fs.readFileSync(path, 'utf8');

// Wrap AdminSingleProduct in a div
const pattern = /\{adminProductView === 'single' && \(\s+<AdminSingleProduct/;
if (pattern.test(content)) {
    console.log("Found AdminSingleProduct block");
    content = content.replace(/(\{adminProductView === 'single' && \(\s+)(<AdminSingleProduct)/, 
        "$1<div className=\"animate-in fade-in slide-in-from-right-8 duration-500\">$2");
    
    // Now find the closing parenthesis after the component
    // We need to insert a </div> before the closing )}
    // Since there are multiple )}, we target the one after AdminSingleProduct
    content = content.replace(/(<AdminSingleProduct[^>]*\/>)\s+([ \t]*\)\})/, "$1\n                      </div>$2");
    
    fs.writeFileSync(path, content, 'utf8');
    console.log("Successfully wrapped AdminSingleProduct in a div");
} else {
    console.log("AdminSingleProduct block not found");
}
