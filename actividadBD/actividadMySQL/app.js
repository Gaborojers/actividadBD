const express = require("express");
const Sequelize = require('sequelize');

const sequelize = new Sequelize('Red_Social', 'root', 'LgSc06042004', {
  host: 'localhost',
  dialect: 'mysql',
});

const Usuario = require('./Models/usuarioModel');
const Comentario = require('./Models/comentariosModel');
const Publicacion = require('./Models/publicacionModel');

//Restricciones on Delete On Update 
Usuario.hasMany(Comentario, { foreignKey: 'usuarioId' });
Comentario.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Comentario.belongsTo(Publicacion, { foreignKey: 'publicacionId' });

sequelize.sync({ force: true }).then(() => {
    console.log('Base de datos y tablas creadas.');
}).catch(err => {
    console.error('Error al crear la base de datos y tablas:', err);
});

const app = express(); 
app.use(express.json());

// Importa las rutas
const publicacionRoutes = require('./Routes/publicacionRoutes');
const comentariosRoutes = require('./Routes/comentariosRoutes');
const usuarioRoutes = require('./Routes/usuarioRoutes');

// Agrega las rutas al servidor
app.use('/usuarios', usuarioRoutes);
app.use('/publicaciones', publicacionRoutes);
app.use('/comentarios', comentariosRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
