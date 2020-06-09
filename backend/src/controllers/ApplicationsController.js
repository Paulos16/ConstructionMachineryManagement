const ApplicationsService = require('../services/ApplicationsService');


module.exports.addApplication = function(req, res, next) {

  if(!(req.body !== undefined &&
    req.body.IdRodzajMaszyny !== undefined &&
    req.body.Rejestracja !== undefined &&
    req.body.Tresc !== undefined)) {
    
    res.send(400);
    next();
    return;
  }

  const application = {
    IdWniosek: -1,
    Tresc: req.body.Tresc,
    Rejestracja: req.body.Rejestracja,
    CzyPoprawny: null,
    IdRodzajMaszyny: req.body.IdRodzajMaszyny,
    IdZleceniaDefinicji: null
  }

  const service = new ApplicationsService();
  const result = service.addApplication(application)
  
  res.send(200, result);
  next();
}

module.exports.getApplications = function(req, res, next) {
  const service = new ApplicationsService();
  res.send(200, service.getApplications());
  next();
}

module.exports.setApplicationApproval = function(req, res, next) {

  if(!(req.body !== undefined &&
    req.body.IdWniosek !== undefined &&
    req.body.CzyPoprawny !== undefined)) {
    
    res.send(400);
    next();
    return;
  }

  const service = new ApplicationsService();
  const result = service.setApplicationApproval(req.body.IdWniosek, req.body.CzyPoprawny);

  if( result === null) {
    res.send(406);
    next();
    return;  
  }

  res.send(200, result);
  next();
}