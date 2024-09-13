const express = require('express');
const passport = require('../utils');


const UsuarioService = require('../services/usuario.servicie');
const validatorHandler = require('../middlewares/validator.handler');
const {createUsuarioSchema, updateUsuarioSchema} = require('../schemas/usuario.schema');

const router = express.Router();
const service = new UsuarioService();

router.get('/', async(req,res)=>{
  const usuarios = await service.find();
  res.json(usuarios);
});
router.post('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createUsuarioSchema, 'body'),
  async(req, res)=>{
    try {
      const newUsuario = await service.create(req.body);
      res.status(201).json(newUsuario);
    } catch (error) {
      return res.status(406).json({message: error});
    }

  }
);
router.put('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(updateUsuarioSchema, 'body'),
  async(req, res) => {
    try{
      const updateUsuario = await service.update(req.body);
      res.json(updateUsuario);
    }catch(error){
      return res.status(406).json({message: error});
    }
  }
)

module.exports = router;
