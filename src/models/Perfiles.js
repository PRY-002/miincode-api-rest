const Sequelize = require('sequelize');
const {sequelize} = require ('../db/connect.mysql');

/*
CREATE TABLE IF NOT EXISTS perfiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(15) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    estado BOOLEAN NOT NULL
);
*/
const Perfiles = sequelize.define('perfiles', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true        
    },
    nombre:{
        type: Sequelize.TEXT
    }, 
    descripcion:{
        type: Sequelize.TEXT
    },         
    estado:{ // Disponible ?
        type: Sequelize.BOOLEAN
    }
    
}, {
    schema: '',
    timestamps: false
    }
);