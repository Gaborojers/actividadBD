const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tu_basedatos', { useNewUrlParser: true, useUnifiedTopology: true });

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    publicaciones: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Publicacion'
        }
    ],
    comentarios: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comentario'
        }
    ]
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

const publicacionSchema = new mongoose.Schema({
    titulo: String,
    contenido: String,
    fechaCreacion: Date,
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    comentarios: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comentario'
        }
    ]
});

const Publicacion = mongoose.model('Publicacion', publicacionSchema);

const comentarioSchema = new mongoose.Schema({
    contenido: String,
    fechaCreacion: Date,
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    publicacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publicacion'
    }
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

// Exporta los modelos
module.exports = { Usuario, Publicacion, Comentario }; 