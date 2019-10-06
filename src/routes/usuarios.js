//const {Router} = require('express');
//const router = Router();
const express = require('express');
const app = express()

const {createUsuario, getUsuarios, getUsuarioById, findByCredentials, message} = require('../controllers/usuario.controller');

// /api/projects/
app.post('/create',  createUsuario);
app.get('/list/', getUsuarios);
app.get('/list/user/:id', getUsuarioById);
app.post('/login', findByCredentials);

app.get('/verMessage', message);

module.exports = app;
//export default router;