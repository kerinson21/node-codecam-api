const Joi = require('joi');

const idCategoriaProducto = Joi.number().integer();
const usuario_idUsuario = Joi.number().integer();
const nombre = Joi.string().min(3).max(45);
const estado_idEstados = Joi.number().integer();
const fecha_creacion = Joi.string().min(5).max(30);

const createCategoriaSchema = Joi.object({
  usuario_idUsuario: usuario_idUsuario.required(),
  nombre : nombre.required(),
  estado_idEstados: estado_idEstados.required()
});

const updateCategoriaSchema = Joi.object({
  idCategoriaProducto: idCategoriaProducto.required(),
  usuario_idUsuario: usuario_idUsuario.required(),
  nombre: nombre.required(),
  estado_idEstados: estado_idEstados.required(),
  fecha_creacion: fecha_creacion.required()
});

module.exports = {createCategoriaSchema, updateCategoriaSchema}
