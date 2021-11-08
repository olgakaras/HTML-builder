const fs = require('fs');
const path = require('path');

// for create and copy 
const newFolderWay = path.join(__dirname, 'project-dist');
const dasefolderAssetsWay = path.join(__dirname, 'assets');
const newfolderAssetsWay = path.join(__dirname, 'project-dist/assets')

//for Collects styles from the styles folder
const styleFolderWay = path.join(__dirname, "styles");
const newFileWay = path.join(__dirname, "project-dist/style.css");
const fileOutput = fs.createWriteStream(newFileWay);

// create folders
function createFolders (path) {
    fs.mkdir(newfolderAssetsWay, {recursive: true}, err => {
        if(err) throw err; 
        console.log('Folder ' + path + ' created!');
    });
}

// copy assets in project-dist/assets
async function copyFolders(subfolders) {
    let fileway = path.join(dasefolderAssetsWay, subfolders);
    fs.readdir(fileway, { withFileTypes: true}, (err, files) => {
        if(err) throw err;
    
        files.forEach(file => {
            let fileWay = path.join(fileway, file.name);
            let fileWayCopy = path.join(newfolderAssetsWay, file.name);
            
            if (!file.isFile()) {
                createFolders(fileWayCopy);
                copyFolders(path.join(subfolders, file.name));
            }
            fs.copyFile(fileWay, fileWayCopy, () => {
                console.log('Done!');
            });
        });
    });
}

createFolders(newFolderWay);
createFolders(newfolderAssetsWay);
copyFolders('');

// Collects styles from the styles folder into a single file 
// and places them in the project-dist / style.css file.
fs.readdir(styleFolderWay, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
        let fileName = path.join(styleFolderWay, file.name.toString());
        let ext = path.extname(fileName);
        if (!file.isDirectory()) {
            if (ext == ".css") {
                let readon = fs.createReadStream(fileName, "utf-8");
                readon.on("data", (data) => {
                    fileOutput.write(data + '\n');
                    console.log('Done styles!');
                });
            }
        }
    });
});