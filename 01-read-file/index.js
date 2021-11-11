const fs = require('fs');
const path = require('path');

const fileWay = path.join(__dirname, 'text.txt');

const readText = fs.createReadStream(fileWay, 'utf-8');
readText.on( 'data', function(chunk) {
    console.log(chunk);
})
