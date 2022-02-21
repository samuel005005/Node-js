const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivos } = require('../controllers');
const { validarJWT } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
    validarJWT
], cargarArchivos);



module.exports = router;