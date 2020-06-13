const moment = require('moment');

const OverviewsService = require('../services/OverviewsService');


module.exports.getOverviews = function(req, res, next) {

  const service = new OverviewsService();
  
  res.send(200, service.getOverviews());
  next();
}

module.exports.addOverview = function(req, res, next) {
  if(!(req.body !== undefined &&
    req.body.IdMaszyna !== undefined &&
    req.body.Dokument !== undefined)) {
    
    res.send(400);
    next();
    return;
  }

  const overview = {
    IdPrzeglad: -1,
    DokumentPrzegladu: req.body.Dokument,
    CzyZrobiony: false,
    IdMaszyna: req.body.IdMaszyna
  };

  const service = new OverwievsService();
  const result = service.addOverview(overview);
  
  res.send(200, result);
  next();
}

module.exports.addOverviewTask = function(req, res, next) {
  if(!(req.body !== undefined &&
    req.body.IdMaszyna !== undefined &&
    req.body.IdPrzeglad !== undefined)) {
    
    res.send(400);
    next();
    return;
  }

  const overviewTask = {
    IdZleceniaPrzegladu: -1,
    Data: moment().format('YYYY-MM-DD'),
    IdMaszyna: req.body.IdMaszyna,
    IdPrzeglad: req.body.IdPrzeglad
  };

  const service = new OverviewsService();
  const result = service.addOverviewTask(overviewTask);
  
  res.send(200, result);
  next();
}

module.exports.addOverviewToCorrect = function(req, res, next) {
  if(!(req.body !== undefined &&
    req.body.Dokument !== undefined &&
    req.body.IdPrzeglad !== undefined)) {
    
    res.send(400);
    next();
    return;
  }

  const service = new OverviewsService();
  const result = service.addOverviewToCorrect(req.body.IdPrzeglad, req.body.Dokument);
  
  res.send(200, result);
  next();
}

module.exports.addCorrectOverview = function(req, res, next) {
  if(!(req.body !== undefined &&
    req.body.Dokument !== undefined &&
    req.body.IdPrzeglad !== undefined)) {
    
    res.send(400);
    next();
    return;
  }

  const service = new OverviewsService();
  const result = service.addCorrectOverview(req.body.IdPrzeglad, req.body.Dokument);
  
  res.send(200, result);
  next();
}
