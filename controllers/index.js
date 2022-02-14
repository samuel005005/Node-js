
const Auth = require('./auth');
const Categorias = require('./categorias');
const Productos = require('./productos');
const Usuarios = require('./usuarios');



module.exports = {
    ...Auth,
    ...Categorias,
    ...Productos,
    ...Usuarios
  
}