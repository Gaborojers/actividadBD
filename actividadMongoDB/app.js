const express = require('express');
const mongoose = require('mongoose');
const app = express();
 
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Red_Social', {
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