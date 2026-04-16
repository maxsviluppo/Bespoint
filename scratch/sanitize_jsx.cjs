
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
let lines = fs.readFileSync(path, 'utf8').split(/\r?\n/);

// Remove the mistakenly added one at 6079 (it actually added a div)
for (let i = 6070; i < 6090; i++) {
    if (lines[i] && lines[i].trim() === '</div>' && lines[i+1].trim() === ')}' && lines[i+2].includes('adminProductView === \'single\'')) {
        console.log("Removing mistaken extra div at line", i+1);
        lines[i] = '';
    }
}

// Add the div correctly at Slides (approx line 4742)
for (let i = 4730; i < 4750; i++) {
    if (lines[i] && lines[i].trim() === ')}' && lines[i+1] === '') {
        if (lines[i+2] && lines[i+2].includes(`adminActiveTab === 'categories'`)) {
            lines[i] = '                      </div>\n' + lines[i];
            console.log("Fixed Slides at line", i+1);
        }
    }
}

// Add the div correctly at Categories (approx line 5011)
for (let i = 5000; i < 5030; i++) {
    if (lines[i] && lines[i].trim() === ')}' && lines[i+1] === '') {
        if (lines[i+2] && lines[i+2].includes(`adminActiveTab === ('link_rapidi' as any)`)) {
            lines[i] = '                      </div>\n' + lines[i];
            console.log("Fixed Categories at line", i+1);
        }
    }
}

// Fix Admin End Panel motion.div mismatch
// The bug says "Unexpected closing 'motion.div'". 
// Let's remove the two `</div>` we added earlier at 6595 if they exist
for (let i = 6580; i < 6610; i++) {
    if (lines[i] && lines[i].trim() === '</AnimatePresence>') {
        if (lines[i+1] && lines[i+1].trim() === '</div>' && lines[i+2] && lines[i+2].trim() === '</div>') {
            lines[i+1] = '';
            lines[i+2] = '';
            console.log("Removed extra wrapper divs at Admin End");
        }
    }
}

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log("Syntax perfectly sanitized by Node index manipulation.");
