const express = require('express');
const passport = require('../utils');

const CategoriaService = require('../services/categoria.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createCategoriaSchema, updateCategoriaSchema} = require('../schemas/categoria.schema');

const router = express.Router();
const service = new CategoriaService();

router.get('/', async(req,res)=>{
  const categorias = await service.find();
  res.json(categorias);
});
router.post('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createCategoriaSchema, 'body'),
  async (req, res)=>{
    try {
      const newCategoria = await service.create(req.body);
      res.status(201).json(newCategoria);
    } catch (error) {
      return res.status(406).json({message: error});
    }

});

router.put('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(updateCategoriaSchema, 'body'),
  async(req,res)=>{
    try {
      const updateCategoria = await service.update(req.body);
      res.json(updateCategoria);
    } catch (error) {
      return res.status(406).json({message: error});
    }
  });

module.exports = router;
