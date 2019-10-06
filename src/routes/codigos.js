const express = require('express');
const app = express()

const {createCodigo, getCodigos, getCodigoById, getCodigoByIdUser} = require('../controllers/codigo.controller');

// /api/codigo/[verbo]
app.post('/create',  createCodigo);
app.get('/list', getCodigos);
app.get('/list/:id', getCodigoById);
app.get('/list/user/:usuarios_id', getCodigoByIdUser);

module.exports = app;
//export default router;