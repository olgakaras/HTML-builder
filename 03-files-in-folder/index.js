const fs = require('fs');
const path = require('path');

const folderWay = path.join(__dirname, 'secret-folder');

fs.readdir(folderWay, { withFileTypes: true }, (err, files) => {
    console.log("\nCurrent directory files:");
    if (err)
      console.log(err);
    else {
        files.forEach(file => {
            if (!file.isDirectory()) {
                let ext = path.extname(file.name);
                let fullWay = path.join(folderWay, file.name);
                let nameFile = path.basename(fullWay, ext);
                fs.stat(fullWay, (err, stats) => {
                    if (err) console.log(err);
                    else {
                        console.log(nameFile + ' - ' + ext.slice(1) + ' - ' + stats.size + ' b');
                    }
                });
            }
        });
    }
});