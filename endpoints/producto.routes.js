const express = require('express');

const ProductoService = require('../services/producto.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createProdcutoSchema, updateProductoSchema} = require('../schemas/producto.schema');

const router = express.Router();
const service = new ProductoService();

router.get('/', async(req,res)=>{
  const productos = await service.find();
  res.json(productos);
});

module.exports = router;
