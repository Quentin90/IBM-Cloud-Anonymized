// Get of all the tables inside the IBM Cloud
const AWS = require('ibm-cos-sdk');
const configVar = require('./config');
const cos = new AWS.S3(configVar.config);

async function getBuckets() {
    console.log('...Retrieving list of buckets 10%');
    return cos.listBuckets()
    .promise()
    .then((data) => {
        if (data.Buckets != null) {
            return data;
        }
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}

// Print the files content, We save it later inside a buffer
async function getItem(bucketName, itemName) {
    console.log(`...Retrieving item from bucket: ${bucketName}, key: ${itemName} 80%`);
    return cos.getObject({
        Bucket: bucketName,
        Key: itemName
    }).promise()
    .then((data) => {
        if (data != null) {
            return data
        }
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}

// List all the items within a bucket (table)
function getBucketContents(bucketName) {
    console.log(`...Retrieving bucket contents from: ${bucketName} 40%`);
    return cos.listObjects(
        {Bucket: bucketName},
    ).promise()
    .then((data) => {
        if (data != null && data.Contents != null) {
            return data
        }
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}

module.exports = {
    getBuckets,
    getItem,
    getBucketContents,
}