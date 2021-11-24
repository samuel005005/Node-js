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
                if(id == 0) continue;
                const { nombre , lng , lat} = lugares.find( lugar => lugar.id = id);
                // Guardar en db
                busquedas.agregarHistorial(nombre);
                // Clima
                const {desc, min , max ,temp} = await busquedas.climaLugar(lat, lng);
                console.clear();
                // Mostrar resultado
                console.log(`\nInformacion de la ciudad\n`.green);
                console.log('Ciudad: ',nombre.green);
                console.log('Lat: ',lat);
                console.log('Lng: ', lng);
                console.log('Temperatura: ',temp);
                console.log('Minima: ',min);
                console.log('Maxima: ',max);
                console.log('Como esta el clima:',desc.green)
                break;
            case 2 :
                console.log('\n');
                
                busquedas.historialCapitalizado.forEach((lugar, index) => {
                    const idx = `${index + 1}.`.green;
                    console.log(`${ idx } ${lugar}`);
                });
                break;
            default:
                break;
        }
        if(option !== 0) await pausa();

    } while (option !== 0);
}

main();