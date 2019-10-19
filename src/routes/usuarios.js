const express = require('express');
const app = express()

const {createUsuario, getUsuarios, getUsuarioById, findByCredentials,findByEmail, message} = require('../controllers/usuario.controller');

// /api/projects/
app.post('/create',  createUsuario);
app.get('/list/', getUsuarios);
app.get('/list/user/:id', getUsuarioById);
app.get('/search/:email', findByEmail);
app.post('/login', findByCredentials);

app.get('/verMessage', message);

module.exports = app;
//export default router;