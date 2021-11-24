const fs = require('fs');
const axios = require('axios');

class Busquedas {

    history = [];
    dbPath = './db/database.json';
    constructor(){
        this.leerDB();
    }

    get paramsMapbox() {
        return {
            access_token:process.env.MAPBOX_KEY,
            limit: 5,
            language: 'es'
        }
    }

    get paramsWheater(){
        return  {
            appid: process.env.OPEN_WEATHER_KEY,
            units:'metric',
            lang:'es'
        }
    }

    get historialCapitalizado(){       
       const hist = this.history.map(value => value.replace(/^\w/, (c) => c.toUpperCase()));
       return hist;
    }

    async ciudades ( lugar = '') {
     try {
        // Peticion HTTP
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
            params: this.paramsMapbox
        });

        const resp = await instance.get();
        
        return resp.data.features.map ( lugar => ({
            id: lugar.id,
            nombre: lugar.place_name,
            lng: lugar.center[0],
            lat: lugar.center[1]
        }));

     } catch (error) {
         return [];
     }

    }

    async climaLugar(lat, lng) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params:  {...this.paramsWheater, lat, lon:lng}
            });
            const resp = await instance.get();
            const { weather, main } = resp.data;
            return {
               desc : weather[0].description,
               min: main.temp_min,
               max: main.temp_max,
               temp: main.temp
            }
        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial ( lugar = ''){
        if (this.history.includes(lugar.toLowerCase())){
            return;
        }

        this.history.unshift(lugar.toLowerCase());

        // Grabar en texto
        this.guardarDB();
    }

    guardarDB (){

        const payload = {
            historial:this.history
        }

        fs.writeFileSync(this.dbPath,JSON.stringify(payload));
    }

    leerDB(){
       
        if(fs.existsSync(this.dbPath)){
            const info = fs.readFileSync(this.dbPath, { encoding:'utf-8' });
            const data  = JSON.parse(info);
            this.history = data.historial;
        }
    }

}

module.exports = Busquedas;