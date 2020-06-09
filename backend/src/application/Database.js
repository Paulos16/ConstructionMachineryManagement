const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const utils = require('../utils/databaseUtils');


const adapter = new FileSync('./db.json')
const db = low(adapter)

db.defaults(utils.getMockedDatabaseData()).write();

module.exports = db;