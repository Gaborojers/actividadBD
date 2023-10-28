const express = require('express');
const router = express.Router();
const publicacionesController = require('../Controllers/publicacionController');

router.post('/publicaciones', publicacionesController.crearPublicacion);
router.get('/publicaciones/email/:email', publicacionesController.buscarPublicacionesPorEmail);
router.delete('/publicaciones/fecha/:fecha', publicacionesController.borrarPublicacionPorFecha);
router.put('/publicaciones/:id', publicacionesController.actualizarPublicacion);

module.exports = router;
