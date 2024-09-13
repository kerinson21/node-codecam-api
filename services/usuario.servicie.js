const { Sequelize } = require('sequelize');
const sequelize = require('./../db/connection');
const boom = require('@hapi/boom');
const bcript = require('bcrypt');

class UsuarioService {
  constructor(){

  }
  async find(){
    const query = 'SELECT u.idUsuario,u.nombre_completo, u.correo_electronico, r.nombre AS rol, e.nombre AS estado, u.fecha_nacimiento FROM usuarios u INNER JOIN roles r ON r.idRol = u.rol_idRol INNER JOIN estados e ON e.idEstado = u.estado_idEstado';
    const [data,metadata] = await sequelize.query(query);
    return {
      data,
      metadata
    }
  }
  async create(body){
    const hash = await bcript.hash(body.password,10)
    const query = 'EXEC sp_insertarUsuario :rol_idRol, :estado_idEstado, :correo_electronico, :nombre_completo, :password, :telefono, :fecha_nacimiento';
    try{
      await sequelize.query(query, {
        replacements: {
          rol_idRol: body.rol_idRol,
          estado_idEstado: body.estado_idEstado,
          correo_electronico: body.correo_electronico,
          nombre_completo: body.nombre_completo,
          password: hash,
          telefono: body.telefono,
          fecha_nacimiento: body.fecha_nacimiento
        },
        type: Sequelize.QueryTypes.INSERT
      });
      return 'Se guardo correctamente el registro';
    }catch(error){
      throw boom.notAcceptable('Tu información no pudo ser guardada');
    }
  }
  async update(body){
    try {
      const query= 'EXEC sp_actualizarUsuario :idUsuario, :rol_idRol, :estado_idEstado, :correo_electronico, :nombre_completo, :password, :telefono, :fecha_nacimiento';
      await sequelize.query(query, {
        replacements: {
          idUsuario: body.idUsuario,
          rol_idRol: body.rol_idRol,
          estado_idEstado: body.estado_idEstado,
          correo_electronico: body.correo_electronico,
          nombre_completo: body.nombre_completo,
          password: body.password,
          telefono: body.telefono,
          fecha_nacimiento: body.fecha_nacimiento
        },
        type: Sequelize.QueryTypes.UPDATE
      });
      return['El registro fue actualizado', body]
    } catch (error) {
      throw boom.notImplemented('No se pudo actualizar el registro');
    }
  }
  async findByEmail(correo_electronico){
    const query = 'SELECT * FROM usuarios WHERE correo_electronico = :correo_electronico';
      const [data] = await sequelize.query(query, {
        replacements: {
          correo_electronico: correo_electronico
        }
      });
      return data[0];
  }
}

module.exports = UsuarioService;
