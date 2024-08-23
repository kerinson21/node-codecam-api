const express = require('express');


const estadosRouter = require('./estado.routes');
const categoriaRouter = require('./categoria.routes');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/estados', estadosRouter);
  router.use('/categoria', categoriaRouter);
}

module.exports = routerApi;
