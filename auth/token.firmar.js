const jwt = require('jsonwebtoken');
const config = require('../config/config');

const secret = process.env.SECRET;

const jwtConfig = {
  expiresIn: '24h'
};

const payload = {
  sub: 1,
  role: 'administrador'
};

function signToken(payload,secret, jwtConfig){
  return jwt.sign(payload, secret, jwtConfig);
}

const token = signToken(payload, secret, jwtConfig);

console.log(token);




