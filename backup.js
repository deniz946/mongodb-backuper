const exec = require('child_process').exec;
const moment = require('moment');
const path = require('path');
const today = moment().format('DD-MM-YYYY');
const dbName = process.argv[2];
const inquirer = require('inquirer');
const mongoose = require('mongoose');
// Connection url

mongoose.connect('mongodb://localhost/test');

mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
    //trying to get collection names
    mongoose.connection.db.listCollections().toArray((error, collections) => { 
        console.log(collections) 
        mongoose.connection.close()
    })

})
// var url = 'mongodb://localhost:27017/test';
// MongoClient.connect(url, function(err, db) {
//   // Use the admin database for the operation
//   var adminDb = db.admin();
//   // List all the available databases
//   adminDb.listDatabases(function(err, result) {
//     const avaibleDbs = result.databases.map(db => db.name);
//     const questions = [
//         { type: 'list', name: 'selectedDb', message: 'Choose the db to backup', choices: avaibleDbs },
//     ];
    
//     inquirer
//         .prompt(questions)
//         .then(function (answers) {
//             console.log(answers);
//         })
//     db.close();
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

