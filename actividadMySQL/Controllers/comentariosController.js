const Usuario = require('../Models/usuarioModel');
const Comentario = require('../Models/comentarioModel');
const Comentario = require('../Models/comentarioModel');

const app = express();
app.use(express.json());

// Agregar comentario
app.post('/comentarios', (req, res) => {
  Comentario.create({
    contenido: req.body.contenido,
    fechaCreacion: new Date(),
    usuarioId: req.body.usuarioId,
    publicacionId: req.body.publicacionId,
  })
    .then(comentario => {
      res.json(comentario);
    })
    .catch(error => {
      res.status(400).json({ error: 'Error al crear comentario' });
    });
});

// Modificar contenido del comentario
app.put('/comentarios/:comentarioId', (req, res) => {
    const comentarioId = req.params.comentarioId;
    const nuevoContenido = req.body.contenido;
  
    Comentario.update(
      { contenido: nuevoContenido },
      { where: { id: comentarioId } }
    )
      .then(() => {
        res.json({ message: 'Comentario actualizado' });
      })
      .catch(error => {
        res.status(400).json({ error: 'Error al actualizar comentario' });
      });
  });

// Borrar comentario por fecha y por publicación
app.delete('/comentarios/:comentarioId', (req, res) => {
    const comentarioId = req.params.comentarioId;
  
    Comentario.destroy({ where: { id: comentarioId } })
      .then(() => {
        res.json({ message: 'Comentario eliminado' });
      })
      .catch(error => {
        res.status(400).json({ error: 'Error al eliminar comentario' });
      });
  });

module.exports = comentarioController;