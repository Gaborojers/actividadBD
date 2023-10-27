const Comentario = sequelize.define ('comentario', {
    id: {
        type: Sequelize.INTEGER,
        primarykey: true,
        autoIncrement: true
    },
    contenido: {
        type: Sequelize.TEXT
    },
    fechaCreacion: {
        type: Sequelize.DATE
    },
    publicacionId: {
        type: Sequelize.INTEGER,
        references: {
            model: Publicacion,
            key: 'id'
        }
    },
    usuarioId: {
        type: Sequelize.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
});