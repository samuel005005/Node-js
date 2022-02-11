const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get('/',(req,res) => {
    res.json({
        msj:"Todo bien "
    });
});

// Obtener una categoria - publico
router.get('/:id',(req,res) => {
    res.json({
        msj:"Todo bien "
    });
});

// Crear una nueva tarea - privador cual quiera con token valido
router.post('/', (req, res) =>{
    res.json({
        msj:"Todo bien "
    });
});

// Actualizar una nueva tarea -  privador cual quiera con token valido
router.put('/:id', (req, res) =>{
    res.json({
        msj:"Todo bien "
    });
});

// Borrar una nueva tarea -  privador solo administrador
router.delete('/:id', (req, res) =>{
    res.json({
        msj:"Todo bien "
    });
});

module.exports = router;