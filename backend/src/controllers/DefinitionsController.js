const moment = require('moment');

const DefinitionsService = require('../services/DefinitionsService');


module.exports.getDefinitions = function(req, res, next) {

  const service = new DefinitionsService();
  const result = service.getDefinitions();
  
  res.send(200, result);
  next();
}

module.exports.addDefinitionTask = function(req, res, next) {
  if(!(req.body !== undefined &&
    req.body.IdRodzajMaszyny !== undefined)) {
    
    res.send(400);
    next();
    return;
  }

  const definitionTask = {
    IdZlecenieDefinicji: -1,
    Data: moment().format('YYYY-MM-DD'),
    IdRodzajMaszyny: req.body.IdRodzajMaszyny
  }

  const service = new DefinitionsService();
  const result = service.addDefinitionTask(definitionTask);
  
  res.send(200, result);
  next();
}

module.exports.getDefinitionTask = function(req, res, next) {

  const service = new DefinitionsService();
  const result = service.getDefinitionTask();
  
  res.send(200, result);
  next();
}

module.exports.addDefinition = function(req, res, next) {
  if(!(req.body !== undefined &&
    req.body.IdRodzajMaszyny !== undefined &&
    req.body.Dokument !== undefined)) {
    
    res.send(400);
    next();
    return;
  }

  const definition = {
    IdDefinicja: -1,
    DokumentDefinicji: req.body.Dokument,
    IdRodzajMaszyny: req.body.IdRodzajMaszyny
  }

  const service = new DefinitionsService();
  const result = service.addDefinition(definition);
  
  res.send(200, result);
  next();
}

module.exports.addDefinitionDocument = function(req, res, next) {
  if(!(req.body !== undefined &&
    req.body.IdRodzajMaszyny !== undefined &&
    req.body.Dokument !== undefined)) {
    
    res.send(400);
    next();
    return;
  }

  const service = new DefinitionsService();
  const result = service.addDefinitionDocument(Number(req.body.IdRodzajMaszyny), req.body.Dokument);

  if( result === null) {
    res.send(406);
    next();
    return;  
  }
  
  res.send(200, result);
  next();
}
