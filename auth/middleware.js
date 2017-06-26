function ensureLoggedIn(req, res, next){
  console.log(req.signedCookies);
  if(req.signedCookies.user_id){
    next();
  }else{
    res.status(401)
    next(new Error('Un-Authorized'))
  }
}

function allowAccess(req, res, next){
  if(req.signedCookies.user_id == req.params.id){
    next();
  }else{
    res.status(401)
    next(new Error('Un-Authorized'))
  }
}

module.exports = {
  ensureLoggedIn,
  allowAccess
}
