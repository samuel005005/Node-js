
const dbValidator = require('./db-validators');
const generarJWT = require('./generar-jwt');
const googleVerify = require('./google-verify');
const utils = require('./util');

module.exports = {
        generarJWT,
    ...dbValidator,
    ...googleVerify,
    ...utils
}