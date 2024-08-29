const express = require('express');


const estadosRouter = require('./estado.routes');
const categoriaRouter = require('./categoria.routes');
const productoRouter = require('./producto.routes');
const usuarioRouter = require('./usuarios.routes');
const ordenRouter = require('./orden.routes');
const authRouter = require('./auth.routes');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/estados', estadosRouter);
  router.use('/categoria', categoriaRouter);
  router.use('/productos', productoRouter);
  router.use('/usuarios', usuarioRouter);
  router.use('/ordenes', ordenRouter);
  router.use('/auth',authRouter);
}

module.exports = routerApi;
