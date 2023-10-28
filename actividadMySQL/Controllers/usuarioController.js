// Importar los modelos de usuario y comentarios
const Usuario = require('../Models/usuarioModel');
const Comentario = require('../Models/comentarioModel');

const app = express();
app.use(express.json());

// Agregar usuario
app.post('/usuarios', (req, res) => {
  Usuario.create({ nombre: req.body.nombre, email: req.body.email })
    .then(usuario => {
      res.json(usuario);
    })
    .catch(error => {
      res.status(400).json({ error: 'Error al crear usuario' });
    });
});

// Buscar usuarios por email
app.get('/usuarios/email/:email', (req, res) => {
  const email = req.params.email;

  Usuario.findAll({ where: { email: email } })
    .then(usuarios => {
      res.json(usuarios);
    })
    .catch(error => {
      res.status(400).json({ error: 'Error al buscar usuarios' });
    });
});

// Buscar publicaciones por usuario
app.get('/usuarios/:usuarioId/publicaciones', (req, res) => {
  const usuarioId = req.params.usuarioId;

  Publicacion.findAll({ where: { usuarioId: usuarioId } })
    .then(publicaciones => {
      res.json(publicaciones);
    })
    .catch(error => {
      res.status(400).json({ error: 'Error al buscar publicaciones' });
    });
});

module.exports = usuarioController;