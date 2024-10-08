const { Sequelize} = require('sequelize');
const sequelize = require('../db/connection');
const boom = require('@hapi/boom');


class OrdenService {
  constructor(){

  }
  async find(){
    const query = 'SELECT * FROM ordenes';
    const [data, metadata] = await sequelize.query(query);
    return {
      data,
      metadata
    }
  }
  async findOrden(id){

      const query = 'SELECT o.direccion, o.telefono, e.nombre as estado, o.idOrden, o.total_orden FROM  ordenes o INNER JOIN estados e ON e.idEstado = o.estado_idEstado where usuario_idUsuario= :usuario_idUsuario';

      try {
        const data =  await sequelize.query(query, {
          replacements: {
            usuario_idUsuario: id
          },
          type: Sequelize.QueryTypes.SELECT
        })
        return data;
      } catch (error) {
      throw boom.notFound('No se encontro el usuario');
    }
  }
  async createOrden(body){
    const queryOrden = 'EXEC sp_insertarOrden :idUsuario, :idEstado, :nombre_completo, :direccion, :telefono,:correo,:fecha_entrega,:total_orden'
    const queryDetalles = 'EXEC sp_insertarOrdenDetalle :idOrden,:idProducto,:cantidad,:precio,:subTotal';
    try {
      const orden = body.orden;
      const [result] = await sequelize.query(queryOrden,{
        replacements: {
          idUsuario: orden.idUsuario,
          idEstado: orden.idEstado,
          nombre_completo: orden.nombre_completo,
          direccion: orden.direccion,
          telefono: orden.telefono,
          correo: orden.correo,
          fecha_entrega: orden.fecha_entrega,
          total_orden: orden.total_orden
        },
        type: Sequelize.QueryTypes.INSERT
      });
      const detalles = body.detalles
      const idOrden = result[0].idOrden;
      for (const index in detalles) {
        await sequelize.query(queryDetalles, {
          replacements: {
            idOrden: idOrden,
            idProducto: detalles[index].idProducto,
            cantidad: detalles[index].cantidad,
            precio: detalles[index].precio,
            subTotal: detalles[index].subTotal
          },
          type: Sequelize.QueryTypes.INSERT
        })
      }
      return 'Se agrego correctamente la orden'
    } catch (error) {
      throw boom.notAcceptable('No se pudo insertar');
    }

  }
}

module.exports = OrdenService;
