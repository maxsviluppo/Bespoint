
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
let content = fs.readFileSync(path, 'utf8');
let lines = content.split(/\r?\n/);

for (let i = 0; i < lines.length; i++) {
    // Fix 1: Slides
    if (i > 4700 && i < 4750 && lines[i].includes(')}')) {
        if (lines[i-1].includes('</div>') && lines[i-2].includes('</div>')) {
            lines[i] = lines[i].replace(')}', '  </div>\n                    )}');
        }
    }
    
    // Fix 2: Categories
    if (i > 5000 && i < 5020 && lines[i].includes(')}')) {
        if (lines[i-1].includes('</div>') && lines[i-2].includes('</div>')) {
            lines[i] = lines[i].replace(')}', '  </div>\n                    )}');
        }
    }

    // Fix 3: Link Rapidi
    if (i > 5210 && i < 5230 && lines[i].includes('))}')) {
        lines[i] = lines[i].replace('))}', '  </div>\n                          </div>\n                        </div>\n                      ))}\n                    </div>\n                  </div>');
    }

    // Fix 4: Admin Panel End
    if (i > 6500 && i < 6600 && lines[i].includes('</AnimatePresence>')) {
        if (lines[i+1] && lines[i+1].includes('</motion.div>')) {
             lines[i] = lines[i].replace('</AnimatePresence>', '</AnimatePresence>\n                </div>\n              </div>');
        }
    }
}

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log('Fixed final 4 JSX issues.');
