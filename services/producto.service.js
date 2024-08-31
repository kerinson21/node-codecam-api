const { Sequelize } = require('sequelize');
const sequelize = require('../db/connection');
const boom = require('@hapi/boom');


class PruductoService{
  constructor(){

  }
  async find(){
    const query = 'SELECT * FROM vw_productos';
    const [data, metadata] = await sequelize.query(query);
    return {
      data,
      metadata
    }
  }
  async create(body){
    const query = 'exec sp_insertarProducto :categoriaProducto_idCategoriaProducto,:usuario_idUsuario,:nombre,:marca,:codigo,:stock,:estado_idEstado,:precio,:foto';
    try {
      await sequelize.query(query, {
        replacements: {
          categoriaProducto_idCategoriaProducto: body.categoriaProducto_idCategoriaProducto,
          usuario_idUsuario: body.usuario_idUsuario,
          nombre: body.nombre,
          marca: body.marca,
          codigo: body.codigo,
          stock: body.stock,
          estado_idEstado: body.estado_idEstado,
          precio: body.precio,
          foto: body.foto
        },
        type: Sequelize.QueryTypes.INSERT
      });
      return ['Los datos fueron guardados', body];
    } catch (error) {
      throw boom.notAcceptable('No se guardaron los datos');
    }
  }
  async update(body){
    const query = 'exec sp_actualizarProducto :idProducto, :categoriaProducto_idCategoriaProducto,:usuario_idUsuario,:nombre,:marca,:codigo,:stock,:estado_idEstado,:precio,:foto';
    try {
      await sequelize.query(query, {
        replacements: {
          idProducto: body.idProducto,
          categoriaProducto_idCategoriaProducto: body.categoriaProducto_idCategoriaProducto,
          usuario_idUsuario: body.usuario_idUsuario,
          nombre: body.nombre,
          marca: body.marca,
          codigo: body.codigo,
          stock: body.stock,
          estado_idEstado: body.estado_idEstado,
          precio: body.precio,
          foto: body.foto
        },
        type: Sequelize.QueryTypes.INSERT
      });
      return ['Los datos fueron guardados', body];
    } catch (error) {
      throw boom.notAcceptable('No se guardaron los datos');
    }
  }
}

module.exports = PruductoService;
