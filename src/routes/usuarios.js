const {Router} = require('express');
const router = Router();


const {createUsuario, getUsuarios, getUsuarioById, findByCredentials, message} = require('../controllers/usuario.controller');

// /api/projects/
router.post('/create',  createUsuario);
router.get('/list/', getUsuarios);
router.get('/list/user/:id', getUsuarioById);
router.post('/login', findByCredentials);

router.post('/verMessage', message);

//export default router;