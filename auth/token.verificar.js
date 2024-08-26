const jwt = require('jsonwebtoken');
const config = require('../config/config');

const SECRET = process.env.SECRET;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNzI0Njk5NzI2LCJleHAiOjE3MjQ3ODYxMjZ9.DfQ5bAyWYRLn1lVRfF0V9jWA5I-oHy8ZP2rE7XhgVwI';
function verifyToken(token,SECRET){
  return jwt.verify(token, SECRET);
}

const payload =verifyToken(token, SECRET);

console.log(payload);
