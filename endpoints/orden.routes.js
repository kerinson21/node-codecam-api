const express = require('express');
const passport = require('../utils');
const boom = require('@hapi/boom');

const OrdenService = require('../services/orden.service');

const router = express.Router();
const service = new OrdenService();

router.get('/', async (req,res) => {
  const orden = await service.find();
  res.json(orden);
});

router.get('/myordenes/:id',
  passport.authenticate('jwt', {session: false}),
  async (req,res) => {
    try {
      const {id} = req.params
      const orden = await service.findOrden(id);
      res.json(orden);
    } catch (error) {
      res.json(error);
    }
});

router.post('/',
  passport.authenticate('jwt', {session: false}),
  async (req, res)=>{
  try {
    const result = await service.createOrden(req.body);
    res.json(result);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
});

module.exports = router;
