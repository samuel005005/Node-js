const   {   inquirerMenu, 
            pausa, 
            leerInput 
        } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    
    do {
        
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // Crear Tarea
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
            break;
            case '2':
                console.log(tareas._listado);
            break;
        }
        await pausa();
    } while( opt !== '0' );
}


main();