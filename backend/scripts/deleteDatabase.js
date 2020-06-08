const fs = require('fs');

const path = '../db.json';

fs.unlink(path, (err) => {});