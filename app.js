require('dotenv').config();

const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async ( ) => {
    let option;
    const busquedas = new Busquedas();
    
    do {

        option = await inquirerMenu();

        switch (option) {
            case 1:
                // Mostrar mensaje 
                const termino = await leerInput('Cuidad: ');
                // Buscar los lugares
                const lugares = await busquedas.ciudades( termino);
                // Seleccionar lugar
                const id = await listarLugares(lugares);
                const { nombre , lng , lat} = lugares.find( lugar => lugar.id = id);
                // Clima

                // Mostrar resultado
                console.log(`\nInformacion de la ciudad\n`.green);
                console.log('Ciudad: ',nombre);
                console.log('Lat: ',lat);
                console.log('Lng: ', lng);
                console.log('Temperatura: ',);
                console.log('Minima: ',);
                break;
        
            default:
                break;
        }
        if(option !== 0) await pausa();

    } while (option !== 0);
}

main();