const { response, request } = require('express');
const { encriptarPassword } = require('../helpers/db-validators');


const Usuario = require('../models/user');

const getUser = async (req = request, res = response) =>  {

    const { q,  apikey, page = 1, limite = 5, desde = 0 } = req.query;

    const query = { estado : true };
 
    const [ total ,users ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]); 
    
    res.json({
        total,
        users
    });

}


const postUser = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    
    /** Encriptar la contraseña */
    usuario.password = encriptarPassword(password);
    /** Guardar en DB */
    await usuario.save();
    res.json(usuario);

}

const putUser = async (req = request, res = response) => {

    const { id }  = req.params;
    const { _id, password, google , correo ,...properties } = req.body;

    // TODO: Validar DB

    if ( password ){
        properties.password = encriptarPassword(password);
    }

    const users = await Usuario.findByIdAndUpdate(id,properties);
    
    res.json(users);
}

const patchUser = (req = request, res = response) => {

    res.json({
        'msj':'get API - controlador'
    });

}

const deleteUser = async (req = request, res = response) => {

    const { id } = req.params;

    const users = await Usuario.findByIdAndUpdate(id, { estado : false });

    const  authenticatedUser = req.user;
    
    res.json({users,authenticatedUser});
     
}

module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}