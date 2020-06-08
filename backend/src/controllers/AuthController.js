const AuthService = require('../services/AuthService');


module.exports.login = function (req, res, next) {
  
  const isAuthorized = AuthService.authorize(req.body.username, req.body.password);

  if(!isAuthorized) {
    res.send(401, 'Access denied due to invalid credentials.');
  } else {
    res.send(200, 'Hello!')
  }

  next();
}
