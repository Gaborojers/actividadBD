const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/actividadBD');

const Publicacion = require('./publicacionModel');
const Usuario = require('./usuarioModel');

const Comentario = sequelize.define('comentario', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  contenido: {
    type: Sequelize.TEXT,
  },
  fechaCreacion: {
    type: Sequelize.DATE,
  },
  publicacionId: {
    type: Sequelize.INTEGER,
    references: {
      model: Publicacion,
      key: 'id',
    },
  },
  usuarioId: {
    type: Sequelize.INTEGER,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
});

module.exports = Comentario;