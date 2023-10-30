const Publicacion = require('../Models/publicacionModel');

const app = express();
app.use(express.json());

// Agregar publicación
app.post('/publicaciones', (req, res) => {
  Publicacion.create({
    titulo: req.body.titulo,
    contenido: req.body.contenido,
    fechaCreacion: new Date(),
  })
    .then(publicacion => {
      res.json(publicacion);
    })
    .catch(error => {
      res.status(400).json({ error: 'Error al crear publicación' });
    });
});

// Modificar contenido de la publicación
app.put('/publicaciones/:publicacionId', (req, res) => {
  const publicacionId = req.params.publicacionId;
  const nuevoContenido = req.body.contenido;

  Publicacion.update({ contenido: nuevoContenido }, { where: { id: publicacionId } })
    .then(() => {
      res.json({ message: 'Publicación actualizada' });
    })
    .catch(error => {
      res.status(400).json({ error: 'Error al actualizar publicación' });
    });
});

// Buscar comentarios por publicación
app.get('/publicaciones/:publicacionId/comentarios', (req, res) => {
  const publicacionId = req.params.publicacionId;

  Comentario.findAll({ where: { publicacionId: publicacionId } })
    .then(comentarios => {
      res.json(comentarios);
    })
    .catch(error => {
      res.status(400).json({ error: 'Error al buscar comentarios' });
    });
});

// Borrar publicación por fecha
app.delete('/publicaciones/:publicacionId', (req, res) => {
    const publicacionId = req.params.publicacionId;
  
    Publicacion.destroy({ where: { id: publicacionId } })
      .then(() => {
        res.json({ message: 'Publicación eliminada' });
      })
      .catch(error => {
        res.status(400).json({ error: 'Error al eliminar publicación' });
      });
  });

module.exports = publicacionController;
