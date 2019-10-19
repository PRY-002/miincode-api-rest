const express = require('express');
const { json } = require('express');
//import morgan from 'morgan';

//Importing routes
const codigoRoutes = require('./routes/codigos');
const usuarioRoutes = require('./routes/usuarios');
const cloudRoutes = require('./routes/cloud');

//Initialization
const app = express();

//middleware
//app.use(morgan('dev'));
app.use(json());

// Codigos
app.use('/api/codigos', codigoRoutes);
// Usuarios
app.use('/api/usuarios',usuarioRoutes);
// Cloud
app.use('/api/cloud',cloudRoutes);


module.exports = app;
