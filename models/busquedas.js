const axios = require('axios');

class Busquedas {

    history = [];

    constructor(){
        //TODO : leer DB si existe
    }

    get paramsMapbox() {
        return {
            'access_token':process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad ( lugar = '') {
     try {
        // Peticion HTTP
      
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
            params: this.paramsMapbox
        });

        const resp = await instance.get();
        console.log (`ciudad: `,resp.data);

        return []; // retornar luegares
     } catch (error) {
         return [];
     }
    }

}

module.exports = Busquedas;