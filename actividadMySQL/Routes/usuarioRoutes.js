const express = require('express');
const router = express.Router();
const usuarioController = require('../Controllers/usuarioController');

// Rutas para Usuarios
router.post('/usuarios', usuarioController.create);
router.get('/usuarios/email/:email', usuarioController.getByEmail);
router.get('/usuarios/:usuarioId/publicaciones', usuarioController.getPublicaciones);

module.exports = router;