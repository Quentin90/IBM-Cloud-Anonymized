
// Transform the zip hex data stored inside a buffer into a string
// that we save inside a new .csv file for further treatment

async function bufferToCSV(file){
    var AdmZip = require('adm-zip');
    var fs = require('fs');                                         // Require filestream
    var filepath = "data.csv";
    var zip = new AdmZip(file);                                     // Tool used to read the zip's data

    var zipEntries = zip.getEntries();
    console.log(zipEntries.length); 

    zipEntries.forEach((entry) => {                                 // Hex to text
        fs.writeFile(filepath, zip.readAsText(entry), (err) => {
            if (err) throw err;
        });
    });

}

module.exports = {
    bufferToCSV,
}