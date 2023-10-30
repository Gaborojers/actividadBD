const express = require('express');
const mongoose = require('mongoose');
const app = express();
 
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ActividadApi', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Conexión a la BD exitosa...');
 });
 
 connection.on('error', (err) => {
    console.log('Error en la conexión a la BD: ', err);
 });

 const comentarioRoutes = require("./Routes/comentarioRoutes");
 const usuarioRoutes = require("./Routes/comentarioRoutes");
 const publicacionRoutes = require("./Routes/publicacionRoutes");

 app.use('/usuarios', usuarioRoutes);
 app.use('/publicaciones', publicacionRoutes);
 app.use('/comentarios', comentarioRoutes);

 const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Servidor en ejecución en el puerto ${PORT}`);
});