const moment = require('moment');

const db = require('../application/Database');


module.exports = function() {

  this.getMachinesTypes = function() {

    const result = db.get('machineTypes')
      .value()

    return result;
  }

  this.addMachine = function(machine) {

    const machines = db.get('machines').value()
    db.set('machinesCount', db.get('machinesCount').value()+1)
      .write();

    const machinesCount = db.get('machinesCount').value()
    machine.IdMaszyna = machinesCount;
    
    machines.push(machine);
    db.write();

    return machine;
  }

  this.getMachines = function(date) {

    const machines = db.get('machines')
      .filter((m) => moment(m.TerminWaznosciPrzegladu).isSameOrBefore(date))
      .value();

    return machines;
  }

  this.getAllMachines = function(date) {

    const machines = db.get('machines')
      .value();

    return machines;
  }

  this.setNextOverviewDate = function(machineId, nextDate) {

    const machine = db.get('machines')
      .filter((m) => m.IdMaszyna === machineId)
      .value();
    
    machine.TerminWaznosciPrzegladu = nextDate;

    db.write();

    return machine;
  }

  this.setMachineApproval = function(machineId, approval) {

    const machine = db.get('machines')
      .filter((m) => m.IdMaszyna === machineId)
      .value();
    
    if(machine === undefined) {
      return null;
    }
    
    machine.CzyZdatna = approval;

    db.write();

    return machine;
  }
  
}
