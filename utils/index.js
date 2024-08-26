const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');
const boom = require('@hapi/boom');

const UsuarioService = require('../services/usuario.servicie');
const service = new UsuarioService();

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email,password, done)=>{
    try {
      const user = await service.findByEmail(email);
      if(!user){
        done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch){
        done(boom.unauthorized(), false);
      }
      delete user['password'];
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
));

module.exports = passport;

