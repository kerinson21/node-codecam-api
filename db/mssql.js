const { Sequelize } = require('sequelize');
const {config} = require('./../config/config');


const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const NAME = encodeURIComponent(config.dbName);
const HOST = encodeURIComponent(config.dbHost);
const PORT = encodeURIComponent(config.dbPort);

const sequelize= new Sequelize(NAME,USER, PASSWORD, {
  host: HOST,
  dialect: 'mssql',
  port: PORT,
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: false
    }
  }
});


module.exports =sequelize;
