const Role = require('../models/role');

const isValidRole = async ( rol = '') => {
    const existeRol = await Role.findOne({ role:rol }); 
    if(!existeRol){
        throw new Error(`El rol ${rol} registrado en la DB`);
    }
}

module.exports = {
    isValidRole
}