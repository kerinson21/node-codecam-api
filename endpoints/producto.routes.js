const express = require('express');
const passport = require('../utils');

const ProductoService = require('../services/producto.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createProductoSchema, updateProductoSchema} = require('../schemas/producto.schema');

const router = express.Router();
const service = new ProductoService();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  async(req,res)=>{
  const productos = await service.find();
  res.json(productos);
});
router.post('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createProductoSchema, 'body'),
  async (req,res) => {
    try {
      const {body} = req;
      const nuevoProducto = await service.create(body);
      res.status(201).json(nuevoProducto);
    } catch (error) {
      return res.status(406).json({message: error});
    }

});
router.put('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(updateProductoSchema, 'body'),
  async (req, res) => {
    try {
      const producto = await service.create(req.body);
      res.status(201).json(producto);
    } catch (error) {
      return res.status(406).json({message: error});
    }

  }
)

module.exports = router;
