const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../db/user')

require('dotenv').config();

router.get('/', (req, res) => {
  res.json({
    message: '😀'
  })
})

function validUser(user) {
  const validEmail = typeof user.email == 'string' &&
    user.email.trim() != '';
  const validPassword = typeof user.password == 'string' &&
    user.password.trim() != '' &&
    user.password.trim().length >= 6;
  return validEmail && validPassword;
}

router.post('/signup', (req, res, next) => {
  if (validUser(req.body)) {
    User
      .getOneByEmail(req.body.email)
      .then(user => {
        console.log('user', user);

        if (!user) {

          bcrypt.hash(req.body.password, 5)
            .then((hash) => {
              const user = {
                email: req.body.email,
                password: hash,
                created_at: new Date()
              }
              User
                .create(user)
                .then(id => {
                  jwt.sign({
                    id
                  }, process.env.TOKEN_SECRET, { expiresIn: '1h' }, (err, token) => {
                    console.log('err', err);
                    console.log('token', token);
                    res.json({
                      id,
                      token,
                      message: 'ok'
                    })
                  });
                  // setUserIdCookie(req, res, id);
                  // res.json({
                  //   id,
                  //   message: 'ok'
                  // })
                })
            })
        } else {
          next(new Error('Email in use'))
        }
      })
  } else {
    next(new Error('Invalid user'))
  }
});

function setUserIdCookie(req, res, id){
  const isSecure = req.app.get('env') != 'development';
  res.cookie('user_id', id, {
    httpOnly: true,
    secure: isSecure,
    signed: true
  })
}

router.post('/login', (req, res, next) => {
  if (validUser(req.body)) {
    User
      .getOneByEmail(req.body.email)
      .then(user => {
        if (user) {
          bcrypt.compare(req.body.password, user.password)
            .then((result) => {
              if (result) {
                jwt.sign({
                  id: user.id
                }, process.env.TOKEN_SECRET, { expiresIn: '1h' }, (err, token) => {
                  console.log('err', err);
                  console.log('token', token);
                  res.json({
                    id: user.id,
                    token,
                    message: 'ok'
                  })
                });
                // setUserIdCookie(req, res, user.id)
                // res.json({
                //   id: user.id,
                //   message: 'Logged in!'
                // });
              } else {
                next(new Error('Invalid login'))
              }
            });
        } else {
          next(new Error('Invalid login'))
        }
      })
  } else {
    next(new Error('Invalid login'))
  }
})

router.get('/logout', (req, res)=>{
  res.clearCookie('user_id');
  res.json({
    message: "logged out"
  })
})


module.exports = router
