const Joi = require('joi');

const idProducto = Joi.number().integer();
const categoriaProducto_idCategoriaProducto = Joi.number().integer();
const usuario_idUsuario = Joi.number().integer();
const nombre = Joi.string().min(5);
const marca = Joi.string().min(3);
const codigo = Joi.string().min(5);
const stock = Joi.number().integer();
const precio = Joi.number().precision(2);
const foto = Joi.binary();

const createProductoSchema = Joi.object({
  categoriaProducto_idCategoriaProducto: categoriaProducto_idCategoriaProducto.required(),
  usuario_idUsuario: usuario_idUsuario.required(),
  nombre: nombre.required(),
  marca: marca.required(),
  codigo: codigo.required(),
  stock: stock.required(),
  precio: precio.required(),
  foto: foto.required()
});

const uptadteProductoSchema = Joi.object({
  idProducto: idProducto.required(),
  categoriaProducto_idCategoriaProducto: categoriaProducto_idCategoriaProducto.required(),
  usuario_idUsuario: usuario_idUsuario.required(),
  nombre: nombre.required(),
  marca: marca.required(),
  codigo: codigo.required(),
  stock: stock.required(),
  precio: precio.required(),
  foto: foto.required()
})
