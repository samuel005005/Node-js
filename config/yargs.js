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


    module.exports = argv;