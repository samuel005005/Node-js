const express =  require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

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

        /**
         * Menejar las carga de archivoos
         */
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp'
        }));
    }

    routes() {

       this.app.use(this.path.concat('/usuarios'), require('../routes/usuarios'));
       this.app.use(this.path.concat('/auth'), require('../routes/auth'));
       this.app.use(this.path.concat('/categorias'), require('../routes/categorias'));
       this.app.use(this.path.concat('/productos'), require('../routes/productos'));
       this.app.use(this.path.concat('/buscar'), require('../routes/buscar'));
       this.app.use(this.path.concat('/uploads'), require('../routes/uploads'));
       
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running in the port ${this.port}`);
        });
    }
}

module.exports = Server;