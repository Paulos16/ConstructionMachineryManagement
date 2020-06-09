const ApplicationsService = require('../services/ApplicationsService');


module.exports.addApplication = function(req, res, next) {

  if(req.body.IdRodzajMaszyny === undefined ||
    req.body.Rejestracja === undefined ||
    req.body.Tresc === undefined) {
    
    res.send(400);
    next();
    return;
  }

  const application = {
    IdWniosek: -1,
    Tresc: req.body.Tresc,
    Rejestracja: req.body.Rejestracja,
    CzyPoprawny: false,
    IdRodzajMaszyny: req.body.IdRodzajMaszyny,
    IdZleceniaDefinicji: null
  }

  const service = new ApplicationsService();
  const result = service.addApplication(application)
  res.send(200, result);
  next();
}