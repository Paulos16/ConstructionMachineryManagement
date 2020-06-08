const jwt = require('jsonwebtoken');

const db = require('../interfaces/Database');


const TOKEN_SECRET = 'aYbH4H2yUk92JkOp4K'

module.exports.authorize = function (username, password) {
  
  const user = db.get('users')
                  .find({username: username, password: password})
                  .value();
  
  if(user !== undefined) {
    return true;
  }

  return false;

}

module.exports.isTokenOK = function (token) {
  
  jwt.verify(token, TOKEN_SECRET, function(err) {
    if(err) {
      return false;
    }
  });

  return true;
}
