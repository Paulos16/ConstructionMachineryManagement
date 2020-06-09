const db = require('../application/Database');

module.exports = function() {

  this.getMachinesTypes = function() {

    const result = db.get('machineTypes')
      .value()

    return result;
  }

  this.addMachine = function(machine) {

    const machines = db.get('machines').value()
    db.set('machinesCount', db.get('machinesCount').value()+1).write();

    const machinesCount = db.get('machinesCount').value()
    machine.IdMaszyna = machinesCount;
    
    machines.push(machine);
    db.write();

    return machine;
  }
  
}