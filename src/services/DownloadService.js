const http = require('https');
const fs = require('fs');
const path = require('path');

function downloadFile(url) {
    const downloadfolder = './src/downloads/';
    const filename = path.basename(url);
    console.log(filename);

    const req = http.get(url, function(res) {
        const fileStream = fs.createWriteStream(downloadfolder+filename);
        res.pipe(fileStream);
    
        fileStream.on('error', function(error) {
            console.log('Error writing to the stream.');
            console.log(error);
        });
    
        fileStream.on('finish', function() {
            fileStream.close();
            console.log('Done!');
        });

        fileStream.on('error', function(error) {
            console.log('Error downloading the file.');
            console.log(error);
        });
    });
    
}

module.exports = {
    downloadFile
}

//https://www.youtube.com/watch?v=ogF_WMzUqok
