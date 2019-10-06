const express = require('express');
const { json } = require('express');
//import morgan from 'morgan';

//Importing routes
const codigoRoutes = require('./routes/codigos');
const usuarioRoutes = require('./routes/usuarios');

//Initialization
const app = express();

//middleware
//app.use(morgan('dev'));
app.use(json());

// Codigos
app.use('/api/codigos', codigoRoutes);
// Usuarios
app.use('/api/usuarios',usuarioRoutes);


module.exports = app;
//export default app;