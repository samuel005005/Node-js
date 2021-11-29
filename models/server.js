const express =  require('express');
const cors = require('cors');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        /** Rutas Routes */
        this.userPath = '/api/user';
        /** Middlewares */
        this.middlewares();
        /** Rutas de mi aplicacion */
        this.routes();
    }

    middlewares() {

        /** CORS */
        this.app.use(cors());

        /** Lectura y parseo del body http */
        this.app.use(express.json());

        /**  Directorio publico */
        this.app.use(express.static('public'));
        
    }

    routes() {
       this.app.use(this.userPath, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;