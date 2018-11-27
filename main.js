var fs = require('fs');
// file is included here:
const util = require('util');
const dateHelper = require('./dateHelper');
const cosHelper = require('./cosHelper');
const csvHelper = require('./csvHelper');

// IBM Socket
// Main function
//
// Goal of this tool : 
// 
// - Retrieve data (.csv.zip) from an IBM Cloud
// - extract data in a correct way
// - Anonymize data
// - Send it to a database
(async () => {
    console.log("...init")
    const data = await cosHelper.getBuckets();
    const files_list=await cosHelper.getBucketContents("hds-anonymisation")

    // if the file exist, delete it
    if (fs.existsSync('data.csv')) {
        fs.unlink('data.csv', (err) => {
            if (err) throw err;
        });
    }

    const choice=2
    if(choice=="1"){
        const tab=files_list.Contents.find(dateHelper.getLastTechnicalData)
        let zip_data=await cosHelper.getItem('hds-anonymisation',tab.Key)
        let CsvData=zip_data.Body
        csvHelper.bufferToCSV(CsvData)
    }
    else if(choice=="2"){
        const tab2=files_list.Contents.find(dateHelper.getLastTechnicalBilan)
        var zip_data=await cosHelper.getItem('hds-anonymisation',tab2.Key)
        var CsvData=zip_data.Body
        csvHelper.bufferToCSV(CsvData)
    }
    else{
        console.log("use correct input")
    }

})();
