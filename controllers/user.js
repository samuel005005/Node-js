const { response, request } = require('express');
const { encriptarPassword } = require('../helpers/db-validators');


const Usuario = require('../models/user');

const getUser = async (req = request, res = response) =>  {

    const { q, name = "No Name", apikey, page = 1, limit } = req.query;

    const users = await Usuario.find({estado:true}).exec();
    console.log(users);
    res.json({
        'msj':'get API - controlador',
        data: users
    });

}


const postUser = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    
    /** Encriptar la contraseña */
    usuario.password = encriptarPassword(password);
    /** Guardar en DB */
    await usuario.save();
    res.json({
        'msj':'get API - controlador',
        usuario
    });

}

const putUser = async (req = request, res = response) => {

    const { id }  = req.params;
    const { _id, password, google , correo ,...properties } = req.body;

    // TODO: Validar DB

    if ( password ){
        properties.password = encriptarPassword(password);
    }

    const users = await Usuario.findByIdAndUpdate(id,properties);
    
    res.json({
        'msj':'get API - controlador',
        users
    });
}

const patchUser = (req = request, res = response) => {

    res.json({
        'msj':'get API - controlador'
    });

}

const deleteUser = (req = request, res = response) => {

    res.json({
        'msj':'get API - controlador'
    });
     
}

module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}