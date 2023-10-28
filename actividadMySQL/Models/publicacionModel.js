const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/actividadBD');

const Usuario = require('../Models/usuarioModel.js')

const Publicacion = sequelize.define('publicacion', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: Sequelize.STRING,
  },
  contenido: {
    type: Sequelize.TEXT,
  },
  fechaCreacion: {
    type: Sequelize.DATE,
  },
  usuarioId: {
    type: Sequelize.INTEGER,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
});

module.exports = Publicacion;
