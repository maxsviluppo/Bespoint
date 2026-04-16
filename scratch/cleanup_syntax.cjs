
const fs = require('fs');
const path = 'c:\\Users\\Max\\Downloads\\A Codici Main\\bespoint-main\\src\\App.tsx';
let lines = fs.readFileSync(path, 'utf8').split('\n');

// 1. Fix line 148 (index 147)
if (lines[147].includes('</>')) {
    lines[147] = lines[147].replace('</>', '');
}

// 2. Fix Categories Map (Add closing fragment)
// The map starts at 4871. We need to find the matching ))}.
// Looking at previous view, it was around 5012.
for (let i = 4871; i < 5050; i++) {
    if (lines[i].includes('))}')) {
        if (!lines[i].includes('</>')) {
            lines[i] = lines[i].replace('))}', '</>))}');
        }
        break;
    }
}

// 3. Remove the specified "extra" closing divs that caused negative balance
// We will replace them with empty lines to avoid shifting line numbers for now, 
// then we'll filter out empty lines at the end.
const linesToRemove = [4739, 4740, 4741, 4808, 4810, 4811, 5221, 5227, 5228, 5229, 5231, 5232, 6598, 6599];
// Note: Line numbers provided by audit were 1-indexed. Indices are -1.

linesToRemove.forEach(lineNum => {
    // Only remove if it contains </div> or my tag comments
    if (lines[lineNum].includes('</div>') || lines[lineNum].includes('admin-content-wrap')) {
        lines[lineNum] = "__DELETE__";
    }
});

let newContent = lines.filter(l => l !== "__DELETE__").join('\n');
fs.writeFileSync(path, newContent, 'utf8');
console.log("Cleanup complete.");
