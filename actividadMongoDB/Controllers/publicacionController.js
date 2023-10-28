const express = require('express');
const Publicacion = require('../Models/publicacionModel');
const Usuario = require('../Models/usuarioModel');

const publicacionController = {
  // Agregar Publicación
  crearPublicacion: async (req, res) => {
    try {
      const publicacion = new Publicacion(req.body);
      const usuario = await Usuario.findById(req.body.usuario);
      publicacion.autor = usuario;
      await publicacion.save();
      res.status(201).json(publicacion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Buscar Publicaciones por usuarios
  buscarPublicacionesPorUsuarios: async (req, res) => {
    try {
      const publicaciones = await Publicacion.find({ autor: req.params.email });
      res.json(publicaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Borrar Publicación por fecha
  borrarPublicacionPorFecha: async (req, res) => {
    try {
      const publicacion = await Publicacion.findByIdAndRemove(req.params.id);
      if (!publicacion) {
        return res.status(404).json({ error: 'Publicación no encontrada' });
      }
      res.json({ message: 'Publicación eliminada con éxito' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Modificar/Actualizar contenido de publicación
  actualizarPublicacion: async (req, res) => {
    try {
      const publicacion = await Publicacion.findById(req.params.id);
      if (!publicacion) {
        return res.status(404).json({ error: 'Publicación no encontrada' });
      }
      publicacion.titulo = req.body.titulo;
      publicacion.contenido = req.body.contenido;
      await publicacion.save();
      res.json(publicacion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = publicacionController;
