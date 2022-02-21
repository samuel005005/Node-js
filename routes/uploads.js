const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivos } = require('../controllers');
const { validarJWT, validarArchivos } = require('../middlewares');


const router = Router();

router.post('/', [
    validarJWT,
    validarArchivos
], cargarArchivos);



module.exports = router;