const sequelize = require('./../db/mssql');


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

}

