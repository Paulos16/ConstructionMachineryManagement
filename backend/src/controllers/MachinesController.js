const MachinesService = require('../services/MachinesService');


module.exports.getMachinesTypes = function(req, res, next) {
  const service = new MachinesService();
  res.send(200, service.getMachinesTypes());
  next();
}