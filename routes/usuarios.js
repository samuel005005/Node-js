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
    check('id','No es un ID valido')
        .isMongoId().bail()
            .custom(existeUsuarioById),
    validarCampos
], getUserId);

router.post('/',[
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('password')
        .notEmpty().withMessage('El password es obligatorio').bail()
            .isLength({min:6}).withMessage('El password debe ser 6 o mas caracteres'),
    // check('rol','No es un rol valido').isIn('ADMIN_ROLE','USER_ROLE'),
    check('correo')
        .notEmpty()
            .withMessage('El correo es obligatorio').bail()
                .isEmail().withMessage('Correo no valido').bail()
                    .custom(existEmail),
    check('rol')
        .notEmpty().withMessage('El rol es obligatorio').bail()
            .custom( isValidRole ),
    validarCampos
], postUser);

router.put('/:id',[
    check('id')
        .isMongoId().withMessage('No es un ID valido').bail()
            .custom(existeUsuarioById),
    check('rol').custom( isValidRole ),
    validarCampos
],putUser); 

router.patch('/', patchUser);

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id')
        .isMongoId().withMessage('No es un ID valido').bail()
            .custom(existeUsuarioById),
    validarCampos
],deleteUser);

module.exports = router;