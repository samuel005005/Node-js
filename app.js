const { options } = require('yargs');
const {crearArchivo} = require('./helpers/multiplicar');
const argv = require('yargs')
    .option( 
        'base',{
            alias: 'b',
            type: 'number',
            description: 'Base para crear la tabla',
            demandOption:true
        })
    .option(
        'listar',{
            alias: 'l',
            type: 'boolean',
            description: 'listar tabla',
            demandOption:false
        })
    .option(
        'top',{
            alias: 't',
            type: 'number',
            description: 'limite para crear la tabla',
            demandOption:false
        })
    .check((argv,options) => {
        if(isNaN(argv.b)){
            throw 'La base tiene que ser un numero';
        }

        return true;
    })
    .argv;

console.clear();

// const base = 1;

console.log(argv)

crearArchivo(argv.base, argv.listar, argv.top)
    .then(
            (archivo) => console.log(archivo,'creado')
        )
    .catch(
            (error)  =>  console.log(error)
        );