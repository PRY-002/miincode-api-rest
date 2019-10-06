const {Router} = require('express');
const router = Router();


const {createCodigo, getCodigos, getCodigoById, getCodigoByIdUser} = require('../controllers/codigo.controller');

// /api/codigo/[verbo]
router.post('/create',  createCodigo);
router.get('/list', getCodigos);
router.get('/list/:id', getCodigoById);
router.get('/list/user/:usuarios_id', getCodigoByIdUser);

//export default router;