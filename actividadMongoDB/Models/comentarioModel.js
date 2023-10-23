const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
   contenido: String,
   fechaCreacion: Date,
   publicacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publicacion"
 },
   usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario"
   }
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;