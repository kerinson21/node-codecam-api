const express = require('express');
const passport = require('../utils');

const EstadoService = require('../services/estado.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createEstadoSquema, updateEstadoSchema} = require('../schemas/estado.schema');

const router = express.Router();
const service = new EstadoService();

router.get('/', async (req,res) => {
  const estados = await service.find();
  res.json(estados);
});

router.post('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createEstadoSquema, 'body'),
  async (req,res, next) => {
    try {
      const {nombre} = req.body;
      const newEstado = await service.create(nombre);
      res.status(201).json(newEstado);
    } catch (error) {
      next(error);
    }

});

router.put('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(updateEstadoSchema,'body'),
  async (req,res, next) =>{
    try {
      const body = req.body;
      const updateEstado = await service.update(body);
      res.json(updateEstado);
    } catch (error) {
      next(error);
    }
});

module.exports = router;
