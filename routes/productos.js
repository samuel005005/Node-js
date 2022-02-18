const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { existeProductoById, existeCategoriaById } = require('../helpers');
const {  obtenerProductos,actualizarProducto, crearProducto, obteneProducto, borrarProducto} = require('../controllers');

const router = Router();


/**
 * {{url}}/api/productos
 */

// Obtener todas los productos - publico
router.get('/', obtenerProductos);

// Obtener una categoria - publico
router.get('/:id',[
    check('id','No es un ID valido').isMongoId().custom(existeProductoById),
    validarCampos
],obteneProducto);

// Crear una nueva tarea - privador cual quiera con token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty().bail(),
    check('categoria')
        .notEmpty()
            .withMessage('La categoria es obligatorio').bail()
                .isMongoId().withMessage('No es un ID valido').bail()
                    .custom(existeCategoriaById).bail(),
    check('precio')
        .notEmpty().withMessage('El precio es obligatorio').bail()
            .isNumeric().withMessage('El precio debe ser numerico'),
    validarCampos
], crearProducto);

// Actualizar una nueva tarea -  privador cual quiera con token valido
router.put('/:id',[
    validarJWT,
    check('id')
        .isMongoId().withMessage('No es un ID valido').bail()
            .custom(existeProductoById),
    validarCampos
],actualizarProducto);

// Borrar una nueva tarea -  privador solo administrador
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un ID valido')
        .isMongoId().withMessage('No es un ID valido').bail()
            .custom(existeProductoById),
    validarCampos
],borrarProducto);


module.exports = router;