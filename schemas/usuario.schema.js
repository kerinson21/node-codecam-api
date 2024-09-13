const Joi = require('joi');

const idUsuario = Joi.number().integer();
const rol_idRol = Joi.number().integer();
const estado_idEstado = Joi.number().integer();
const correo_electronico = Joi.string();
const nombre_completo = Joi.string().min(5);
const password = Joi.string().min(8);
const telefono = Joi.string();
const fecha_nacimiento= Joi.date();

const createUsuarioSchema = Joi.object({
    rol_idRol: rol_idRol.required(),
    estado_idEstado: estado_idEstado.required(),
    correo_electronico: correo_electronico.required(),
    nombre_completo: nombre_completo.required(),
    password: password.required(),
    telefono: telefono.required(),
    fecha_nacimiento: fecha_nacimiento.required()
});

const updateUsuarioSchema = Joi.object({
    idUsuario: idUsuario.required(),
    rol_idRol: rol_idRol.required(),
    estado_idEstado: estado_idEstado.required(),
    correo_electronico: correo_electronico.required(),
    nombre_completo: nombre_completo.required(),
    password: password.required(),
    telefono: telefono.required(),
    fecha_nacimiento: fecha_nacimiento.required()
})

module.exports = {createUsuarioSchema, updateUsuarioSchema};
