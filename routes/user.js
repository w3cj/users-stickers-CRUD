const express = require('express');
const router = express.Router();
const User = require('../db/user');
const Sticker = require('../db/sticker');
const authMiddleware = require('../auth/middleware.js')

router.get('/:id', authMiddleware.allowAccess, (req, res) => {
  if (!isNaN(req.params.id)) {
    User.getOne(req.params.id).then(user => {
      if (user) {
        delete user.password;
        res.json(user);
      } else {
        resError(res, 404, "User Not Found");
      }
    });
  } else {
    resError(res, 500, "Invalid ID");
  }
});

router.get('/:id/sticker', authMiddleware.allowAccess, (req,res)=>{
  if (!isNaN(req.params.id)) {
    Sticker.getByUser(req.params.id).then(stickers => {
      res.json(stickers);
    });
  } else {
    resError(res, 500, "Invalid ID");
  }
})

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
