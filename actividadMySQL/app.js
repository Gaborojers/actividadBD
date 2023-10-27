const express = require('express');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('Red_Social', 'root', 'LgSc06042004', {
  host: 'localhost',
  dialect: 'mysql',
});

const Usuario = sequelize.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
});

const Publicacion = sequelize.define('publicacion', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: Sequelize.STRING
    },
    contenido: {
        type: Sequelize.TEXT
    },
    fechaCreacion: {
        type: Sequelize.DATE
    }
});

const Comentario = sequelize.define('comentario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    contenido: {
        type: Sequelize.TEXT
    },
    fechaCreacion: {
        type: Sequelize.DATE
    }
});
//Restricciones on Delete On Update 
Usuario.hasMany(Comentario, { foreignKey: 'usuarioId' });
Comentario.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Comentario.belongsTo(Publicacion, { foreignKey: 'publicacionId' });

sequelize.sync({ force: true }).then(() => {
    console.log('Base de datos y tablas creadas.');
}).catch(err => {
    console.error('Error al crear la base de datos y tablas:', err);
});

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

// Modificar contenido de la publicación
app.put('/publicaciones/:publicacionId', (req, res) => {
  const publicacionId = req.params.publicacionId;
  const nuevoContenido = req.body.contenido;

  Publicacion.update(
    { contenido: nuevoContenido },
    { where: { id: publicacionId } }
  )
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

// Borrar usuario
app.delete('/usuarios/:usuarioId', (req, res) => {
  const usuarioId = req.params.usuarioId;

  Usuario.destroy({ where: { id: usuarioId } })
    .then(() => {
      res.json({ message: 'Usuario eliminado' });
    })
    .catch(error => {
      res.status(400).json({ error: 'Error al eliminar usuario' });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
