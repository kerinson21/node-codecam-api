const sequelize = require('./../db/mssql');
const { Sequelize } = require('sequelize');

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
    const query = 'EXEC sp_insertarEstado :nombre';
    const result = await sequelize.query(query, {
      replacements: {nombre: nombre},
      type: Sequelize.QueryTypes.INSERT
    });
    return result;
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
