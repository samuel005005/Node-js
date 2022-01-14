const Role = require('../models/role');
const Usuario = require('../models/user');

const isValidRole = async ( rol = '') => {
    const existeRol = await Role.findOne({ role:rol }); 
    if(!existeRol){
        throw new Error(`El rol ${rol} registrado en la DB`);
    }
}

const existEmail = async ( correo = '') => {
        /** Validar si correo existe */
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail){
        throw new Error(`El correo ${correo} ya esta registrado`);
    }
}

module.exports = {
    isValidRole,
    existEmail
}