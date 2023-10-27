const express = require('express');
const router = express.Router();
const publicacionController = require('../controllers/publicacionController');

// Rutas para Publicaciones
router.post('/publicaciones', publicacionController.create);
router.put('/publicaciones/:publicacionId', publicacionController.update);
router.get('/publicaciones/:publicacionId/comentarios', publicacionController.getComentarios);
router.delete('/publicaciones/:publicacionId', publicacionController.delete);

module.exports = router;