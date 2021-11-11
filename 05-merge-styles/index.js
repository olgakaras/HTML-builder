const path = require("path");
const fs = require("fs");

const styleFolderWay = path.join(__dirname, "styles");
const newFileWay = path.join(__dirname, "project-dist/bundle.css");

const fileOutput = fs.createWriteStream(newFileWay);

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
                    console.log('Done!');
                });
            }
        }
    });
});



