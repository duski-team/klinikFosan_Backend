const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('klinikFosan', 'postgres', 'postgres', {
   
    host: 'localhost',
    port: 5432,
    dialect:'postgres',
    logging: false 
  });
  
  module.exports = sequelize;