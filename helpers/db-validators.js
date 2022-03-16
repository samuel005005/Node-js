const bcryptjs = require('bcryptjs');

const Producto = require('../models/producto');
const Role = require('../models/role');
const Categoria = require('../models/categoria');
const Usuario = require('../models/usuario');

const isValidRole = async ( rol = '') => {

    console.log(Usuario)
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

const existeCategoriaById = async ( id ) => {
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria) {
        throw new Error(`La categoria ${id} no existe en la DB`);
    }
}

const existeProductoById = async ( id ) => {
    const existeProducto = await Producto.findById(id);
    if(!existeProducto) {
        throw new Error(`El producto ${id} no existe en la DB`);
    }
}

const coleccionesPermitidas = async ( coleccion = '' , colecciones = [] ) => {
    const includa = colecciones.includes(coleccion);
    if (!includa){
        throw new Error(`La coleccion  ${coleccion} no es permitida, ${colecciones}`);
    }
}

module.exports = {
    isValidRole,
    existEmail,
    encriptarPassword,
    existeUsuarioById,
    existeCategoriaById,
    existeProductoById,
    coleccionesPermitidas
}