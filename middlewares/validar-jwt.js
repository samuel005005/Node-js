const { request, response } = require('express');
const jsonwebtoken = require('jsonwebtoken');
const Usuario = require('../models/user');

const validarJWT =  async ( req = request, res = response, next ) => {

    const token = req.header('x-token');
 
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const  { uid } = jsonwebtoken.verify(token, process.env.SECRETORPRIVATEKEY);

        const userLogged  = await Usuario.findById( uid );

        if(!userLogged){
            throw { message : 'Usuario logueado no existe en DB' };
        }
 
        if(!userLogged.estado){
            throw { message : 'Usuario logueado no existe STATUS FALSE' };
        }

        req.userLogged = userLogged;

        next();
        
    } catch (error) {
        console.error(error.message);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validarJWT
}