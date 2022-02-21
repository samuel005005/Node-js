const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivos, actualizarArchivo } = require('../controllers');
const { coleccionesPermitidas } = require('../helpers');
const { validarJWT, validarArchivos, validarCampos } = require('../middlewares');


const router = Router();

router.post('/', [
    validarJWT,
    validarArchivos
], cargarArchivos);

router.put('/:coleccion/:id', [
    validarJWT,
    check('id','El id es invalido').isMongoId().bail(),
    check('coleccion').custom( coleccion => coleccionesPermitidas( coleccion, ['usuarios','productos'])),
    validarCampos
],actualizarArchivo);



module.exports = router;