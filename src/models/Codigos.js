const Sequelize = require('sequelize');
const {sequelize} = require ('../db/connect.mysql');

/*
CREATE TABLE IF NOT EXISTS codigos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarios_id INT NOT NULL,
    mensaje TEXT NOT NULL,
    ruta_url TEXT NOT NULL,
    fec_creacion VARCHAR(30) NOT NULL,
    fec_actualizacion  VARCHAR(30) NULL,
    estado BOOLEAN NOT NULL,
    foreign key (usuarios_id) references usuarios(id)
);
*/
const Codigos = sequelize.define('codigos', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuarios_id:{
        type: Sequelize.INTEGER,
        foreignKey: true
    },
    mensaje:{
        type: Sequelize.TEXT
    }, 
    ruta_url:{
        type: Sequelize.TEXT
    },
    fec_creacion:{
        type: Sequelize.TEXT
    }, 
    fec_actualizacion:{
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