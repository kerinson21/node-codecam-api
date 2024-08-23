const express = require('express');

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
  validatorHandler(createCategoriaSchema, 'body'),
  async (req, res)=>{
    const newCategoria = await service.create(req.body);
    res.status(201).json(newCategoria);
});

router.put('/',
  validatorHandler(updateCategoriaSchema, 'body'),
  async(req,res, next)=>{
    try {
      const updateCategoria = await service.update(req.body);
      res.json(updateCategoria);
    } catch (error) {
      next(error)
    }
  });

module.exports = router;
