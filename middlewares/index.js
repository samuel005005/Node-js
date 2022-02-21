
const validarCampos = require('./validar-campos');
const validarJWT = require('./validar-jwt');
const validaRoles = require('./validar-roles');
const validarArchivos = require('./validar-archivos');


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
    ...validarArchivos
}