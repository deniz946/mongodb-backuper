const backup = require('mongodb-backup');
const moment = require('moment');

const today = moment().format('DD/MM/YYYY');
const dbName = process.argv[2];

if (dbName) {
    backup({
        uri: `mongodb://localhost:27017/${dbName}`,
        root: `${__dirname}/${today}`
    });
} else {
    console.warn('Error: You should indicate db name');
    return;
}

