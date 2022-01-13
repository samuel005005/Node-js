const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

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
    
    /** Validar si correo existe */
    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail){
        return res.status(400).json({
            msg: 'Ese correo ya esta registrado'
        });
    }
    /** Encriptar la contraseña */
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password , salt );

    /** Guardar en DB */
    await usuario.save();
    res.json({
        'msj':'get API - controlador',
        usuario
    });

}

const putUser = (req = request, res = response) => {

    const id = req.params.id;

    res.json({
        'msj':'get API - controlador',
        id
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