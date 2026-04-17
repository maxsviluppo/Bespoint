const fs = require('fs');
const content = fs.readFileSync('c:/Users/Max/Downloads/A Codici Main/bespoint-main/src/AdminSingleProduct.tsx', 'utf8');

function checkTags(tagName) {
    const open = (content.match(new RegExp('<' + tagName + '(\\s|>)', 'g')) || []).length;
    const close = (content.match(new RegExp('</' + tagName + '>', 'g')) || []).length;
    console.log(tagName + ': Open=' + open + ', Close=' + close);
}

checkTags('div');
checkTags('label');
checkTags('button');
checkTags('span');
checkTags('h3');
checkTags('section');
