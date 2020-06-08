
module.exports.authorize = function (username, password) {
  
  if(username == 'user' && password == 'password') {
    return true;
  }

  return false;

}
