import {  DataTypes } from "sequelize";
import dbConnection from "./connections";

const Usuario =  dbConnection.define('usuarios', {
    nombre: {
        type : DataTypes.STRING
    },
    email: {
        type : DataTypes.STRING
    },
    estado: {
        type : DataTypes.BOOLEAN
    }
});

export default Usuario;