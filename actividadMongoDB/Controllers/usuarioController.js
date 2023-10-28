const express = require('express');
const Usuario = require('../Models/usuarioModel');

const usuarioController = {
  // Agregar Usuario
  crearUsuario: async (req, res) => {
    try {
      const usuario = new Usuario(req.body);
      await usuario.save();
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Buscar Usuarios por email
  buscarUsuariosPorEmail: async (req, res) => {
    try {
      const usuarios = await Usuario.find({ email: req.params.email });
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Borrar Usuario
  borrarUsuario: async (req, res) => {
    try {
      const usuario = await Usuario.findByIdAndRemove(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = usuarioController;