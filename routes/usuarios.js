const { Router } = require('express');
const { check } = require('express-validator');
const { 
        getUser,
        getUserId,
        postUser, 
        putUser, 
        patchUser, 
        deleteUser 
    } = require('../controllers');
    
const { isValidRole, existEmail, existeUsuarioById } = require('../helpers');

const {
    validarCampos,
    tieneRole,
    validarJWT,
    esAdminRole
} = require('../middlewares')

const router = Router();

router.get('/', getUser);

router.get('/:id',[
    check('id','No es un ID valido').isMongoId().custom(existeUsuarioById),
    validarCampos
], getUserId);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser 6 o mas caracteres').isLength({min:6}),
    // check('rol','No es un rol valido').isIn('ADMIN_ROLE','USER_ROLE'),
    check('correo','Correo no valido').isEmail().custom(existEmail),
    check('rol').custom( isValidRole ),
    validarCampos
], postUser);

router.put('/:id',[
    check('id','No es un ID valido').isMongoId().custom(existeUsuarioById),
    check('rol').custom( isValidRole ),
    validarCampos
],putUser); 

router.patch('/', patchUser);

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un ID valido').isMongoId().custom(existeUsuarioById),
    validarCampos
],deleteUser);

module.exports = router;