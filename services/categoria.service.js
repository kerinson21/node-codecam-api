const sequelize = require('./../db/connection');
const boom = require('@hapi/boom')
const {Sequelize} = require('sequelize');

class CategoriaService {
  constructor(){

  }
  async find(){
    const query = 'SELECT c.idCategoriaProducto, u.nombre_completo AS usuario, c.nombre, e.nombre AS estado, c.fecha_creacion FROM categoriaProductos c INNER JOIN usuarios u ON u.idUsuario = c.usuario_idUsuario INNER JOIN estados e ON e.idEstado = c.estado_idEstados';
    const [data, metadata] = await sequelize.query(query);
    return {
      data,
      metadata
    }
  }
  async create(body){
    const query = 'EXEC sp_insertarCategoriaProducto :usuario_idUsuario, :nombre, :estado_idEstados';
    try{
    const [result, metadata] = await sequelize.query(query, {
        replacements: {
          usuario_idUsuario: body.usuario_idUsuario,
          nombre: body.nombre,
          estado_idEstados: body.estado_idEstados
        },
        type: Sequelize.QueryTypes.INSERT
      });
    return [
      'El registro fue agregado',
      result,
      metadata
    ]
  }catch(error){
    throw boom.notAcceptable('Los datos no fueron guardados');
  }
  }
  async update(body){
    const queryId = 'SELECT idCategoriaProducto FROM categoriaProductos WHERE idCategoriaProducto= :idCategoriaProducto';
    const exist = await sequelize.query(queryId, {
      replacements: {
        idCategoriaProducto: body.idCategoriaProducto
      },
      type: Sequelize.QueryTypes.SELECT
    });
    if(exist.length === 0){
      const query = 'EXEC sp_actualizarCategoriaProducto :idCategoriaProducto, :usuario_idUsuario, :nombre, :estado_idEstados, :fecha_creacion';
      await sequelize.query(query, {
        replacements: {
          idCategoriaProducto: body.idCategoriaProducto,
          usuario_idUsuario: body.usuario_idUsuario,
          nombre: body.nombre,
          estado_idEstados: body.estado_idEstados,
          fecha_creacion: body.fecha_creacion
        },
        type: Sequelize.QueryTypes.UPDATE
      });
      return ['El registro fue acctualizado',
        body
      ];
    }else{
      throw boom.notFound('El identificador de la categoria es incorrecto')
    }
  }
}

module.exports = CategoriaService;
