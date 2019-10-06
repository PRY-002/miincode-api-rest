//const Sequelize = require('sequelize');
//const {sequelize} = require ('../db/connect.mysql');
var db = require('../db/connect.mysql'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
/*
-- DROP TABLE miincode.usuarios;
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uid VARCHAR(50) NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(100) NOT NULL,
    nombres VARCHAR(150) NOT NULL,
    apepat VARCHAR(50) NOT NULL,
    apemat VARCHAR(50) NOT NULL,
    fec_nacimiento VARCHAR(10) NOT NULL,
    genero CHAR NOT NULL,
    dni CHAR(8) NOT NULL,
    url_foto TEXT NOT NULL,
    nro_movil CHAR(20) NOT NULL,
    fec_creacion VARCHAR(30) NOT NULL,
    fec_actualizacion  VARCHAR(30) NULL,
    estado BOOLEAN NOT NULL,
    perfiles_id INT NOT NULL,
    foreign key (perfiles_id) references perfiles(id)  
);
*/
const Usuarios = sequelize.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true        
    },
    uid: {
        type: Sequelize.TEXT
    },
    email: {
        type: Sequelize.TEXT
    },
    password: {
        type: Sequelize.TEXT
    },
    nombres: {
        type: Sequelize.TEXT
    },
    apepat: {
        type: Sequelize.TEXT
    },
    apemat: {
        type: Sequelize.TEXT
    },
    fec_nacimiento: {
        type: Sequelize.TEXT
    },
    genero: {
        type: Sequelize.TEXT
    },
    dni: {
        type: Sequelize.TEXT
    },
    url_foto: {
        type: Sequelize.TEXT
    },
    nro_movil: {
        type: Sequelize.TEXT
    },
    fec_creacion: {
        type: Sequelize.TEXT
    },
    fec_actualizacion: {
        type: Sequelize.TEXT
    },
    estado: { // Disponible ?
        type: Sequelize.BOOLEAN
    },
    perfiles_id: {
        type: Sequelize.INTEGER
    }

}, {
    schema: '',
    timestamps: false
});

module.exports = Usuarios;