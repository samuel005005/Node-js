const axios = require('axios');

class Busquedas {

    history = [];

    constructor(){
        //TODO : leer DB si existe
    }

    async ciudad ( lugar = '') {
        // peticion HTTP
        
        console.log (`ciudad: `,lugar);

        return []; // retornar luegares
    }

}

module.exports = Busquedas;