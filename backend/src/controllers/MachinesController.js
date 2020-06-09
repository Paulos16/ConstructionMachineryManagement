const MachinesService = require('../services/MachinesService');


module.exports.getMachinesTypes = function(req, res, next) {
  const service = new MachinesService();
  res.send(200, service.getMachinesTypes());
  next();
}

module.exports.addMachine = function(req, res, next) {

  if(!(req.body !== undefined &&
    req.body.IdRodzajMaszyny !== undefined &&
    req.body.Rejestracja !== undefined)) {
    
    res.send(400);
    next();
    return;
  }

  const machine = {
    IdMaszyna: -1,
    Rejestracja: req.body.Rejestracja,
    CzyZdatna: null,
    IdRodzajMaszyny: req.body.IdRodzajMaszyny
  }

  const service = new MachinesService();
  const result = service.addMachine(machine);
  
  res.send(200, result);
  next();
}