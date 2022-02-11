const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos } = require('../middlewares');
const { crearCategoria } = require('../controllers');

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get('/',(req,res) => {
    res.json({
        msg:"Todo bien "
    });
});

// Obtener una categoria - publico
router.get('/:id',(req,res) => {
    res.json({
        msg:"Todo bien "
    });
});

// Crear una nueva tarea - privador cual quiera con token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria);

// Actualizar una nueva tarea -  privador cual quiera con token valido
router.put('/:id', (req, res) =>{
    res.json({
        msg:"Todo bien "
    });
});

// Borrar una nueva tarea -  privador solo administrador
router.delete('/:id', (req, res) =>{
    res.json({
        msg:"Todo bien "
    });
});

module.exports = router;