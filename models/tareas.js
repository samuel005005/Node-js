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


    listarTarea(){
        
    }
    
}


module.exports = Tareas;