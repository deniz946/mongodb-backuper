const exec = require('child_process').exec;
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const today = moment().format('DD-MM-YYYY');
const inquirer = require('inquirer');
const shelljs = require('shelljs');

const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'test';
console.log('Connecting to the database...');
MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
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
                console.log(answers)
                if (answers.selectedDb) {
                    makeBackup(answers.selectedDb);
                } else {
                    console.warn('Error: You should indicate db name');
                    return;
                }
                client.close();
            })
    });
});


function makeBackup(selectedDb) {
    const dbLocalFilesPath = `../${selectedDb}`;

    if (fs.existsSync(dbLocalFilesPath)) {
        console.log('There are no folder for this db, creating...');
        mongoDumpFunction(selectedDb);
    } else {
        console.log('We\'ve found backups folder for this db... backing up there');
        shelljs.mkdir(dbLocalFilesPath);
        mongoDumpFunction(selectedDb);
    }
}

function mongoDumpFunction(selectedDb) {
    const pathToBackup = `../${selectedDb}/${selectedDb}-${today}`;
    child = exec(`mongodump --db ${selectedDb} --out ${pathToBackup}`, (error, stdout, stderr) => {
        console.log(`${selectedDb} backed up correctly in ${pathToBackup}`);
    })
}