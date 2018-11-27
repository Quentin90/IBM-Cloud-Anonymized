//Get last file named like extract_user_bilan_xxxx.csv.zip
function getLastTechnicalData(files){

    var x = new Date();                                               // We will compare today's date to the file's date
    var dd = x.getDate();                                             // To see if he is too old
    var mm = x.getMonth()+1;
    var yyyy = x.getFullYear();
    var date = yyyy+'-'+mm+'-'+dd;


    const res1=files.Key.match(/anonymized_bilan/i)                   // Check if current file is an anonymized bilan
    const res2=files.Key.match(/.csv.zip/i)                           // and a csv.zip
    const today=(files.Key.match(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/i));   // Find the file's date

    if(res1!=null && res2!=null){
        if(today!=date){
            console.log("[!] - Warning it's not today's date")
        }
        return files
    }
}

//Get last file named like extract_anonymized_bilan_xxxx.csv.zip
function getLastTechnicalBilan(files){

    var x = new Date();                                              // We will compare today's date to the file's date
    var dd = x.getDate();                                            // To see if he is too old
    var mm = x.getMonth()+1;
    var yyyy = x.getFullYear();
    var date = yyyy+'-'+mm+'-'+dd;

    const res=files.Key.match(/anonymized_user/i)                    // Check if current file is an anonymized user
    const res2=files.Key.match(/.csv.zip/i)                          // and a csv.zip
    const today=(files.Key.match(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/i));  // Find the file's date

    if(res!=null && res2!=null){
        if(today!=date){
            console.log("[!] - Warning it's not today's date")
        }
        return files
    }
}

module.exports = {
    getLastTechnicalData,
    getLastTechnicalBilan,
}