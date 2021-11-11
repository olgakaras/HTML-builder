const fs = require('fs');
const path = require('path');

const newFolderWay = path.join(__dirname, 'files-copy');
const daseFolderWay = path.join(__dirname, 'files');

fs.mkdir(newFolderWay, {recursive: true}, err => {
    if(err) throw err; 
    fs.readdir(newFolderWay, (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
            const fileCopy = path.join(newFolderWay, file);
            fs.unlink(fileCopy, (err) => {
                if (err) throw err;
            });
        });
    });
    fs.readdir(daseFolderWay, (err, files) => {
        if(err) throw err;
        files.forEach(file => {
            const fileWay = path.join(daseFolderWay, file);
            const fileWayCopy = path.join(newFolderWay, file);
            fs.copyFile(fileWay, fileWayCopy, err => {
                if(err) throw err;
                console.log('Done!');
            });
        });
    });
});
