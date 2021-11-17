
const {crearArchivo} = require('./helpers/multiplicar');
const argv = require('./config/yargs');

require('colors');

console.clear();

crearArchivo(argv.base, argv.listar, argv.top)
    .then(
            (archivo) => console.log(archivo.rainbow,'creado')
        )
    .catch(
            (error)  =>  console.log(error)
        );