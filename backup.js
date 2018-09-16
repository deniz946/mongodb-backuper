const exec = require('child_process').exec;
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const today = moment().format('DD-MM-YYYY');
const inquirer = require('inquirer');
const shelljs = require('shelljs');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'test';


checkNodeModules();
console.log('Connecting to the database...');
MongoClient.connect(url, { useNewUrlParser: true }, onConnectToDB);

function onConnectToDB(err, client) {
    // Use the admin database for the operation
    const adminDb = client.db(dbName).admin();
    // List all the available databases
    adminDb.listDatabases((err, dbs) => {
        const avaibleDbs = dbs.databases.map(db => db.name);
        const question = [
            { type: 'list', name: 'selectedDb', message: 'Choose the db to backup', choices: avaibleDbs },
        ];

        inquirer
            .prompt(question)
            .then(answer => {
                if (answer.selectedDb) {
                    doBackup(answer.selectedDb);
                } else {
                    console.warn('Error: You should indicate db name');
                    return;
                }
                client.close();
            })
    });
}


function doBackup(selectedDb) {
    const dbLocalFilesPath = `../${selectedDb}`;
    if (fs.existsSync(dbLocalFilesPath)) {
        console.log('We\'ve found backups folder for this db... backing up there');
    } else {
        console.log('There are no folder for this db, creating...');
        shelljs.mkdir(dbLocalFilesPath);
    }

    mongoDumpFunction(selectedDb);
}

function mongoDumpFunction(selectedDb) {
    const pathToBackup = `../${selectedDb}/${selectedDb}-${today}`;
    child = exec(`mongodump --db ${selectedDb} --out ${pathToBackup}`, (error, stdout, stderr) => {
        if (error) {
            throw (error);
        }
        console.log(`${selectedDb} backed up correctly in ${pathToBackup}`);
    })
}

function checkNodeModules() {
    if (!shelljs.test('-e', './node_modules')) {
        throw ('Run npm install to install the libs I need to run your backup');
    }
}