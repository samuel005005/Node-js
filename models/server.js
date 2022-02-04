const express =  require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        
        this.app = express();
        this.port = process.env.PORT;

        /** Main Route */
        this.path = '/api';

        /** Connect DB */
        this.conectarDB();

        /** Middlewares */
        this.middlewares();

        /** Route of my application */
        this.routes();
    }

    async conectarDB() {
      await dbConnection();
    }

    middlewares() {

        /** CORS */
        this.app.use(cors());

        /** Read and parse of http body */
        this.app.use(express.json());

        /** Public Directory */
        this.app.use(express.static('public'));
        
    }

    routes() {
       this.app.use(this.path.concat('/user'), require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running in the port ${this.port}`);
        });
    }
}

module.exports = Server;