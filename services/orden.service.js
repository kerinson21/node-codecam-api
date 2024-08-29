const { Sequelize, or } = require('sequelize');
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
  async createOrden(orden){
    const queryOrden = 'EXEC sp_insertarOrden :idUsuario, :idEstado, :nombre_completo, :direccion, :telefono,:correo,:fecha_entrega,:total_orden; SELECT TOP 1 idOrden FROM ordenes ORDER BY idOrden DESC;'
    try {
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

      return result[0];
    } catch (error) {
      boom.notAcceptable('No se pudo insertar');
    }
  }
}

module.exports = OrdenService;
