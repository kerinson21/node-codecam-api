const express = require('express');
const passport = require('../utils');
const jwt = require('jsonwebtoken');

const {config} = require('../config/config');


const router = express.Router();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.idUser,
        role: user.rol_idRol,
      }
      const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '24h'});
      res.json({
        user,
        token
      })
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
