const { request, response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require("../models");

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

    const regx = RegExp(termino,'i');

    const  usuario = await Usuario.find({ 
        $or: [{ nombre:regx },{ correo:regx }],
        $and: [{ estado:true }]
    });
    return res.json({
        results : ( usuario ) ? [ usuario ] : []
    });

}

const buscarCategoria = async ( termino = '', res =  response) => {

    const esMongoId = ObjectId.isValid( termino );

    if( esMongoId ){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results : ( categoria ) ? [ categoria ] : []
        });
    } 
    const regx = RegExp(termino,'i');
    const  categoria = await Categoria.find({ nombre:regx , estado: true});
    return res.json({
        results : ( categoria ) ? [ categoria ] : []
    });

}

const buscarProductos = async ( termino = '', res =  response) => {

    const esMongoId = ObjectId.isValid( termino );

    if( esMongoId ){

        const producto = await Producto.findById(termino);

        if( producto ){
            return res.json({
                results : ( producto ) ? [ producto ] : []
            });
        }

       const productos = await Producto.find({ categoria : ObjectId(termino)});

        return res.json({
            results : ( productos ) ? [ productos ] : []
        });
        
    }

    const regx = RegExp(termino,'i');

    const  productos = await Producto.find({
        $or : [{ nombre:regx }, { descripcion:regx }],
        $and: [{ estado: true}]
    }) .populate('categoria', 'nombre')

    return res.json({
        results : ( productos ) ? [ productos ] : []
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
            await buscarCategoria(termino, res);
            break;  
        case 'productos':
            await buscarProductos(termino, res);
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