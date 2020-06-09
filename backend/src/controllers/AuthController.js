const AuthService = require('../services/AuthService');


module.exports.login = function (req, res, next) {
  
  const authorizationResult = AuthService.authorize(req.body.username, req.body.password);

  if(authorizationResult === null || authorizationResult === undefined) {
    res.send(401, 'Access denied due to invalid credentials.');
  } else {
    res.send(200, authorizationResult)
  }

  next();
}
