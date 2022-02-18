const { request, response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario } = require("../models");

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async ( termino = '' , res = response ) => {

    const esMongoId = ObjectId.isValid( termino );

    if( esMongoId ){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results : ( usuario ) ? [ usuario ] : []
        });
    } 

    const  usuario = await Usuario.find({ nombre:termino });
    return res.json({
        results : ( usuario ) ? [ usuario ] : []
    });

}

const buscar = async ( req = request , res = response ) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            await buscarUsuarios(termino, res);
            break;
        case 'categorias':
            break;  
        case 'productos':
            break;
        default:
            res.status(500).json({
                msg: `Busqueda no implementada`
            });
    }

}


module.exports = {
    buscar
}