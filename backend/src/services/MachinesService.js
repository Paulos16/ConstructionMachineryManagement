const db = require('../interfaces/Database');

module.exports = function() {

  this.getMachinesTypes = function() {

    const result = db.get('machineTypes')
      .value()

    return result;
  }
  
}