const exec = require('child_process').exec;
const moment = require('moment');
const path = require('path');
const today = moment().format('DD-MM-YYYY');
const dbName2 = process.argv[2];
const inquirer = require('inquirer');


const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'test';
MongoClient.connect(url, function (err, client) {
    // Use the admin database for the operation
    const adminDb = client.db(dbName).admin();
    // List all the available databases
    adminDb.listDatabases(function (err, dbs) {
        const avaibleDbs = dbs.databases.map(db => db.name);
        const questions = [
            { type: 'list', name: 'selectedDb', message: 'Choose the db to backup', choices: avaibleDbs },
        ];

        inquirer
            .prompt(questions)
            .then(function (answers) {
                console.log(answers);
                if (answers.selectedDb) {
                    const db = answers.selectedDb;
                    child = exec(`mongodump --db ${db} --out ../${db}-${today}`, (error, stdout, stderr) => {
                        console.log(`${db} backed up correctly`);
                    })
                } else {
                    console.warn('Error: You should indicate db name');
                    return;
                }
                client.close();
            })
    });
});
// MongoClient.connect(url, function(err, db) {
//   // Use the admin database for the operation
//   var adminDb = db.admin();
//   // List all the available databases

//   });
// });






// if (dbName) {
//     child = exec(`mongodump --db ${dbName} --out ../${dbName}-${today}`, (error, stdout, stderr) =>{
//         console.log(`${dbName} backed up correctly`);
//     })
// } else {
//     console.warn('Error: You should indicate db name');
//     return;
// }

