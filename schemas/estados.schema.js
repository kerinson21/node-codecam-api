const Joi = require('joi');

const idEstado = Joi.number().integer();
const nombre = Joi.string().min(3).max(45);

const createEstadoSquema = Joi.object({
  nombre: nombre.required()
});
const updateEstadoSchema = Joi.object({
  idEstado: idEstado.required(),
  nombre: nombre.required()
});


module.exports = {createEstadoSquema, updateEstadoSchema}
