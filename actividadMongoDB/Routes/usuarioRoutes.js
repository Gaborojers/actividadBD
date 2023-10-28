const express = require('express');
const router = express.Router();
const usuariosController = require('../Controllers/usuarioController');

router.post('/usuarios', usuariosController.crearUsuario);
router.get('/usuarios/email/:email', usuariosController.buscarUsuariosPorEmail);
router.delete('/usuarios/:id', usuariosController.borrarUsuario);

module.exports = router;
