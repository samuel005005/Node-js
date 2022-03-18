
import {  Sequelize  } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = new Sequelize( process.env.DATABASE_NAME || '', process.env.USER_DB || '',process.env.PASS_DB || '',{
    host: process.env.HOST_DB || '',
    dialect:'mysql'
});

export default dbConnection;