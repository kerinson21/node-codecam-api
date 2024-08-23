const { Sequelize } = require('sequelize');
const sequelize = require('./../db/mssql');
const boom = require('@hapi/boom');


class PruductoService{
  constructor(){

  }
  async find(){
    const query = 'SELECT * FROM productos';
    const [data, metadata] = await sequelize.query(query);
    return {
      data,
      metadata
    }
  }
  async create(body){
    const query = 'EXEC sp_insertarProducto :categoriaProducto_idCategoriaProducto, '+
                  + ':usuario_idUsuario, :nombre, :marca, :codigo, :stock, :estado_idEstado, :precio, :foto';
    try{
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
        type: Sequelize.QueryType.INSERT
      });
      return ['El registro fue creado correctamente', body];
    }catch(error){
       throw boom.preconditionFailed('fallo el guardado de los datos');
    }
  }
}

