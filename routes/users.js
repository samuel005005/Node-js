const { Router } = require('express');
const { check } = require('express-validator');
const { 
        getUser, 
        postUser, 
        putUser, 
        patchUser, 
        deleteUser 
    } = require('../controllers/user');
const { isValidRole, existEmail } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getUser);

router.get('/:id', getUser);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser 6 o mas caracteres').isLength({min:6}),
    // check('rol','No es un rol valido').isIn('ADMIN_ROLE','USER_ROLE'),
    check('correo','Correo no valido').isEmail().custom(existEmail),
    check('rol').custom( isValidRole ),
    validarCampos
], postUser);

router.put('/:id' ,putUser);

router.patch('/', patchUser);

router.delete('/', deleteUser);

module.exports = router;