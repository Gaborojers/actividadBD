const express = require('express');
const Comentario = require('../Models/comentarioModel');
const Usuario = require('../Models/usuarioModel');
const Publicacion = require('../Models/publicacionModel');

const comentariosController = {
  // Agregar Comentario
  crearComentario: async (req, res) => {
    try {
      const comentario = new Comentario(req.body);
      const usuario = await Usuario.findById(req.body.usuario);
      const publicacion = await Publicacion.findById(req.body.publicacion);
      comentario.autor = usuario;
      comentario.publicacion = publicacion;
      await comentario.save();
      res.status(201).json(comentario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Modificar/Actualizar contenido de comentario
  actualizarComentario: async (req, res) => {
    try {
      const comentario = await Comentario.findById(req.params.id);
      if (!comentario) {
        return res.status(404).json({ error: 'Comentario no encontrado' });
      }
      comentario.contenido = req.body.contenido;
      await comentario.save();
      res.json(comentario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Buscar comentarios por publicación
  buscarComentariosPorPublicacion: async (req, res) => {
    try {
      const comentarios = await Comentario.find({ publicacion: req.params.id });
      res.json(comentarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Borrar comentario por fecha y por publicación
  borrarComentarioPorFecha: async (req, res) => {
    try {
      const comentario = await Comentario.findByIdAndRemove(req.params.id);
      if (!comentario) {
        return res.status(404).json({ error: 'Comentario no encontrado' });
      }
      res.json({ message: 'Comentario eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = comentariosController;
