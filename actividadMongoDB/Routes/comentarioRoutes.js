const express = require('express');
const router = express.Router();
const comentariosController = require('../Controllers/comentarioController');

router.post('/comentarios', comentariosController.crearComentario);
router.get('/comentarios/publicacion/:id', comentariosController.buscarComentariosPorPublicacion);
router.delete('/comentarios/fecha/:fecha/publicacion/:id', comentariosController.borrarComentarioPorFecha);
router.put('/comentarios/:id', comentariosController.actualizarComentario);

module.exports = router;
