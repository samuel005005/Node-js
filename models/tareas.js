require('colors');
const Tarea = require('./tarea');

/**
 * _listado:
 *      { 'uuid-1234-123213-2': {id:12, desc: sadsads, completadoEn:21321 } },
 *      { 'uuid-1234-123213-2': {id:12, desc: sadsads, completadoEn:21321 } } 
 */

class Tareas {

    _listado = {};

    constructor ( ){
        this._listado = {};
    }

    crearTarea ( desc = ''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
        
    }

    get listadoArr(){

        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const  tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    cargarTareasFromArray( tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto() {
        console.log('\n');
        this.listadoArr.forEach( ( tarea , index) => {  
            const { desc , compleadoEn } = tarea;
            const position = `${index + 1}`.green;
            const estado = (compleadoEn == null ? 'Pendiente'.red : 'Completado'.green);

            console.log(`${position} ${desc} :: ${estado}`);
        });
       
    }
    
}


module.exports = Tareas;