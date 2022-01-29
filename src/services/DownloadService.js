const http = require('https');
const fs = require('fs');
const path = require('path');
const fileDialog = require('node-file-dialog');

const fileDialogConfig = {type:'directory'};

async function downloadFile(url, callback) {
    fileDialog(fileDialogConfig).then(async dir => {

        const downloadfolder = dir+'/';
        const filename = path.basename(url);

        const req = await http.get(url, function(res) {
            const fileStream = fs.createWriteStream(downloadfolder+filename);
            res.pipe(fileStream);
        
            fileStream.on('error', function(error) {
                console.log('Error writing to the stream.');
                console.log(error);
            });
            
            fileStream.on('close', function() {
                callback(filename);
            });

            fileStream.on('finish', function() {
                fileStream.close();
                console.log('Done!');
            });
        });

        req.on('error', function(error) {
            console.log('Error downloading the file.');
            console.log(error);
        });

    }).catch(error => {
        console.log(error);
    });
}

module.exports = {
    downloadFile
}

//https://www.youtube.com/watch?v=ogF_WMzUqok
