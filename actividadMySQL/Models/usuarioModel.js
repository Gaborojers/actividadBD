const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/actividadBD');

const Usuario = sequelize.define('usuario', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
});

module.exports = Usuario;