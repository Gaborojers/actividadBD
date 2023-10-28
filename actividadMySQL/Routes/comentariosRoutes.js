const express = require('express');
const router = express.Router();
const comentariosController = require('../Controllers/comentariosController');

// Rutas para Comentarios
router.post('/comentarios/:publicacionId', comentariosController.create);
router.put('/comentarios/:publicacionId/:comentarioId', comentariosController.update);
router.delete('/comentarios/:publicacionId/:comentarioId', comentariosController.delete);

module.exports = router;