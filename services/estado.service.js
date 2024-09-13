const sequelize = require('./../db/connection');
const { Sequelize } = require('sequelize');
const boom = require('@hapi/boom');

class EstadoService {
  constructor(){
  }
  async find(){
    const query = 'SELECT * FROM estados';
    const [data, metadata]= await sequelize.query(query);
    return {
      data,
      metadata
    }
  }
  async create(nombre){
    try {
      const query = 'EXEC sp_insertarEstado :nombre; SELECT TOP 1 * from estados ORDER BY idEstado DESC;';
      const [result] = await sequelize.query(query, {
      replacements: {nombre: nombre},
      type: Sequelize.QueryTypes.INSERT
    });
    return ["Se guardo correctamente el registro", result[0]];
    } catch (error) {
      throw boom.notAcceptable();
    }

  }
  async update(body){
    const query = "EXEC sp_actualizarEstado :idEstado, :nombre"
    const result = await sequelize.query(query, {
      replacements: {
        idEstado: body.idEstado,
        nombre: body.nombre},
      type: Sequelize.QueryTypes.UPDATE
    });
    return [
      body,
      'Los datos fueron actualizados'
    ]
  }
}

module.exports = EstadoService;
