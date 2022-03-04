const { Router } = require('express');
const { check } = require('express-validator');

const { login , googleSignIn, renovarToken} = require('../controllers');
const { validarJWT } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contrase;a es obligatoria').notEmpty(),
    validarCampos
],login);


router.post('/google',[
    check('id_token','El id token de google es necesario').notEmpty(),
    validarCampos
],googleSignIn);

router.get('/', validarJWT , renovarToken );

module.exports = router;