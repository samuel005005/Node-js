require('dotenv').config();

const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async ( ) => {
    let option;
    const busquedas = new Busquedas();
    
    do {

        option = await inquirerMenu();

        switch (option) {
            case 1:
                // Mostrar mensaje 
                const lugar = await leerInput('Cuidad: ');
                await busquedas.ciudad( lugar);
                // Buscar los lugares

                // Seleccionar lugar

                // Clima

                // Mostrar resultado

                console.log(`\n Informacion de la ciudad\n`.green);
                console.log('Ciudad: ',);
                console.log('Lat: ',);
                console.log('Lng: ',);
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