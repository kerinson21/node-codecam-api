const express = require('express');
const passport = require('../utils');

const OrdenService = require('../services/orden.service');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new OrdenService();

router.get('/', async (req,res) => {
  const orden = await service.find();
  res.json(orden);
});

router.post('/', async (req, res)=>{
  try {
    const {orden} =  req.body;
    // const [detalles] = req.detalles;
    const result = await service.createOrden(orden);
    res.json(result);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
