const fs = require('fs');
const path = require('path');

const newFolderWay = path.join(__dirname, 'files-copy');
const daseFolderWay = path.join(__dirname, 'files');

fs.mkdir(newFolderWay, {recursive: true}, err => {
    if(err) throw err; 
    console.log('Folder create!');
});

fs.readdir(daseFolderWay, (err, files) => {
    if(err) throw err;

    files.forEach(file => {
        let fileWay = path.join(daseFolderWay, file);
        let fileWayCopy = path.join(newFolderWay, file);

        fs.copyFile(fileWay, fileWayCopy, err => {
            if(err) throw err;
            console.log('Done!');
        });
    });
 });