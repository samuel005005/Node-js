import express , { Application } from 'express';
import cors from "cors";
import usuariosRouter  from "../routers/usuario";
import dbConnection from './connections';


class Server {

    private app  : Application;
    private port : string;
    private path : string;

    constructor() {

        this.app = express();
        this.port = process.env.PORT || '8000';
        
        /** Main Route */
        this.path = '/api/';

        /** Database Connect **/
        this.dbConnection();
        
        /** Middlewares */
        this.middlewares();
        
        /** Route of my application */
        this.routes();

    }

    async dbConnection(){
        try {
            await dbConnection.authenticate();
            console.log("Database conected")
        } catch (error) {
            throw new Error(`Error al conectarse a la base de datos ${error}`);
        }
    }
    
    middlewares(){
        /** CORS **/
        this.app.use(cors());

         /** Read and parse of http body */
        this.app.use(express.json());
    }
    
    routes() {
        this.app.use(this.path.concat('usuarios'), usuariosRouter);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(` Server corriendo el puerto ${this.port}`);
        });
    }
}

export default Server;