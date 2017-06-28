const jwt = require('jsonwebtoken');
require('dotenv').config();

function checkTokenSetUser(req, res, wat) {
  const tokenHeader = req.get('Authorization');
  if(tokenHeader) {
    const token = tokenHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if(err) {
        wat();
      } else {
        console.log(decoded);
        req.user = decoded;
        wat();
      }
    });
  } else {
    wat();
  }
}

function ensureLoggedIn(req, res, next){
  console.log(req.user);
  if(req.user){
    next();
  }else{
    res.status(401)
    next(new Error('Un-Authorized'))
  }
}

function allowAccess(req, res, next){
  if(req.user.id == req.params.id){
    next();
  }else{
    res.status(401)
    next(new Error('Un-Authorized'))
  }
}

module.exports = {
  ensureLoggedIn,
  allowAccess,
  checkTokenSetUser
}
