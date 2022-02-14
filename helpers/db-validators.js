const bcryptjs = require('bcryptjs');

const { Role, Usuario, Categoria, Producto} = require('../models');

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

const encriptarPassword = (password ) =>{
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync( password , salt );
}

const existeUsuarioById = async ( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario) {
        throw new Error(`El id ${id} no existe en la DB`);
    }
}

const existeProductoById = async ( id ) => {
    const existeCategoria = await Producto.findById(id);
    if(!existeCategoria) {
        throw new Error(`El producto ${id} no existe en la DB`);
    }
}

const existeCategoriaById = async ( id ) => {
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria) {
        throw new Error(`La categoria ${id} no existe en la DB`);
    }
}

module.exports = {
    isValidRole,
    existEmail,
    encriptarPassword,
    existeUsuarioById,
    existeCategoriaById,
    existeProductoById
}