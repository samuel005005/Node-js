
const Auth = require('./auth');
const Categorias = require('./categorias');
const Usuarios = require('./usuarios');


module.exports = {
    ...Auth,
    ...Categorias,
    ...Usuarios
}