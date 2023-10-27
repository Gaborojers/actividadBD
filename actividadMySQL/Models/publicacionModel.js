const Publicacion = sequelize.define ('publicacion', {
    id: {
        type: Sequelize.INTEGER,
        primarykey: true,
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
    },
    usuarioId: {
        type: Sequelize.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
});