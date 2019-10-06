const {Router} = require('express');
const router = Router();


const {createUsuario, getUsuarios, getUsuarioById, findByCredentials} = require('../controllers/usuario.controller');

// /api/projects/
router.post('/create',  createUsuario);
router.get('/list/', getUsuarios);
router.get('/list/user/:id', getUsuarioById);
router.post('/login', findByCredentials);

//export default router;