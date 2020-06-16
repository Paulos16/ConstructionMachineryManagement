const MachinesService = require('../services/MachinesService');


module.exports.getMachinesTypes = function(req, res, next) {
  const service = new MachinesService();
  res.send(200, service.getMachinesTypes());
  next();
}

module.exports.addMachine = function(req, res, next) {

  if(!(req.body !== undefined &&
    req.body.IdRodzajMaszyny !== undefined &&
    req.body.Rejestracja !== undefined &&
    req.body.TerminWaznosciPrzegladu !== undefined && 
    req.body.IdWniosek !== undefined)) {
    
    res.send(400);
    next();
    return;
  }

  const machine = {
    IdMaszyna: -1,
    Rejestracja: req.body.Rejestracja,
    CzyZdatna: null,
    TerminWaznosciPrzegladu: req.body.TerminWaznosciPrzegladu,
    IdRodzajMaszyny: req.body.IdRodzajMaszyny,
    IdWniosek: req.body.IdWniosek
  }

  const service = new MachinesService();
  const result = service.addMachine(machine);
  
  res.send(200, result);
  next();
}

module.exports.getMachines = function(req, res, next) {

  if(!(req.query !== undefined)) {
    
    res.send(400);
    next();
    return;
  }

  const service = new MachinesService();
  let result;

  if(req.query.dueDate === 'null') {
    result = service.getAllMachines();
  } else {
    result = service.getMachines(req.query.dueDate);
  }
  
  res.send(200, result);
  next();
}

module.exports.setNextOverviewDate = function(req, res, next) {

  if(!(req.body !== undefined &&
    req.body.IdMaszyna !== undefined &&
    req.body.TerminWaznosciPrzegladu !== undefined)) {
    
    res.send(400);
    next();
    return;
  }

  const service = new MachinesService();
  const result = service.setNextOverviewDate(Number(req.body.IdMaszyna), req.body.TerminWaznosciPrzegladu);
  
  res.send(200, result);
  next();
}

module.exports.setMachineApproval = function(req, res, next) {

  if(!(req.body !== undefined &&
    req.body.IdMaszyna !== undefined &&
    req.body.CzyZdatna !== undefined)) {
    
    res.send(400);
    next();
    return;
  }

  const service = new MachinesService();
  const result = service.setMachineApproval(req.body.IdMaszyna, req.body.CzyZdatna);

  if( result === null) {
    res.send(406);
    next();
    return;  
  }
  
  res.send(200, result);
  next();
}