const exec = require('child_process').exec;
const moment = require('moment');
const path = require('path');
const today = moment().format('DD-MM-YYYY');
const dbName = process.argv[2];
const inquirer = require('inquirer');
const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017/test';

// Database Name

// // Use connect method to connect to the server
// MongoClient.connect(url, function (err, client) {
//     console.log("Connected successfully to server");
//     const db = client.db('ngClients');
//     console.log(db);
//     client.close();
// });



mongoose.connection.on('error', function(error){
  throw new Error(error);
});
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

