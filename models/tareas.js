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

    borrarTarea ( id = '' ){
        if(this._listado[id]){
            delete this._listado[id];
        }
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

    listadoTemplate(tareas) {
        tareas.forEach( ( tarea , index) => {  
            const { desc , compleadoEn } = tarea;
            const position = `${index + 1}.`.green;
            const estado = (compleadoEn == null ? 'Pendiente'.red : `${compleadoEn}`.green);

            console.log(`${position} ${desc} :: ${estado}`);
        });
    }

    listadoCompleto() {
        console.log('\n');
        this.listadoTemplate(this.listadoArr);
    }

    listarPendientesCompletadas ( completadas = true ){
        console.log('\n');
        const tareas =  this.listadoArr
                            .filter( tarea => ((completadas)  
                                                    ? tarea.compleadoEn != null 
                                                    : tarea.compleadoEn == null)
                                    );
        this.listadoTemplate(tareas);
    }
}


module.exports = Tareas;