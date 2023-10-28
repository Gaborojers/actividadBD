const mongoose = require('mongoose');

const publicacionSchema = new mongoose.Schema({
   titulo: String,
   contenido: String,
   fechaCreacion: Date,
   usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario"
   }
});

const Publicacion = mongoose.model('Publicacion', publicacionSchema);

module.exports = Publicacion;
