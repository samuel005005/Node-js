const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers');
const { existeCategoriaById } = require('../helpers');

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categoria - publico
router.get('/:id',[
    check('id','No es un ID valido').isMongoId().custom(existeCategoriaById),
    validarCampos
],obtenerCategoria);

// Crear una nueva tarea - privador cual quiera con token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria);

// Actualizar una nueva tarea -  privador cual quiera con token valido
router.put('/:id',[
    validarJWT,
    check('id','No es un ID valido').isMongoId().custom(existeCategoriaById),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarCategoria);

// Borrar una nueva tarea -  privador solo administrador
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un ID valido').isMongoId().custom(existeCategoriaById),
    validarCampos
],borrarCategoria);

module.exports = router;