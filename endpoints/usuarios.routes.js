const express = require('express');

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
  validatorHandler(createUsuarioSchema, 'body'),
  async(req, res)=>{
    const newUsuario = await service.create(req.body);
    res.status(201).json(newUsuario);
  }
)

router.put('/',
  validatorHandler(updateUsuarioSchema, 'body'),
  async(req, res, next) => {
    try{
      const updateUsuario = await service.update(req.body);
      res.json(updateUsuario);
    }catch(error){
      next(error);
    }
  }
)

module.exports = router;
