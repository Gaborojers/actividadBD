const Usuario = sequelize.define ('usuario', {
    id: {
        type: Sequelize.INTEGER,
        primarykey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
});