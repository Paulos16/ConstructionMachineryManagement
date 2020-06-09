const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../application/Database');


const TOKEN_SECRET = 'aYbH4H2yUk92JkOp4K'

const generateToken = function(user) { 
  const ACCESS_TOKEN = jwt.sign({ 
          sub: user.id, 
          rol: user.role, 
          type: 'ACCESS_TOKEN' 
      }, 
      TOKEN_SECRET, { 
          expiresIn: 86400
      }); 
  const REFRESH_TOKEN = jwt.sign({ 
          sub: user.id, 
          rol: user.role, 
          type: 'REFRESH_TOKEN' 
      }, 
      TOKEN_SECRET, { 
          expiresIn: 172800
      }); 
  return {
      role: user.role,
      token: ACCESS_TOKEN
  } 
}

module.exports.authorize = function (username, password) {
  
  const user = db.get('users')
                  .find({username: username})
                  .value();
  
  if(user === undefined) {
    return null;
  }

  if(bcrypt.compareSync(password, user.password)) {
    return generateToken(user)
  }

  return null;

}

module.exports.verifyToken = function (token) {
  
  let isTokenValid = true;

  jwt.verify(token, TOKEN_SECRET, function(err) { 
    if (err) { 
      isTokenValid = false;
    } 
  }); 

  return isTokenValid;
}
