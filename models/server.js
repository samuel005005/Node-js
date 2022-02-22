const express = require('express');
const cors = require('cors');

class Server {

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io = require('socket.io')( this.server );

        /** Main Route */
        this.path = '/api';

         /** Middlewares */
        this.middlewares();

         /** Route of my application */
        this.routes();
    }

    middlewares(){

        /** CORS */
        this.app.use(cors());

        /** Public Directory */
        this.app.use(express.static('public'));
    }

    routes(){

    }

    listen(){
        this.server.listen(this.port, () => {
            console.log(`Server is running in the port ${this.port}`);
        });
    }
}


module.exports = Server;