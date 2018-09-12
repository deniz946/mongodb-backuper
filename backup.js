const exec = require('child_process').exec;
const moment = require('moment');
const path = require('path');
const today = moment().format('DD/MM/YYYY');
const dbName = process.argv[2];
if (dbName) {
    child = exec(`mongodump --db ${dbName} --out ../${dbName}-${today}`, (error, stdout, stderr) =>{
        console.log(`${dbName} backed up correctly`);
    })
} else {
    console.warn('Error: You should indicate db name');
    return;
}

