const fs = require('fs');
const path = require('path');
const readline = require('readline');

const fileWay = path.join(__dirname, 'text2.txt');

const writeText = fs.createWriteStream(fileWay);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let array = [];
console.log("What do you want write here?");
rl.on('line', (line) => {
    if (line === 'exit') {
        rl.close();
    }
    else {
        writeText.write(line + '\n');
        console.log('You can write more... or click on "Cntl + C" or write "exit" ti exit')
    }
});

rl.on('close', () => {
    console.log("Bye!");
});

