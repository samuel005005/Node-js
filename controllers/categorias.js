const { request,response } = require("express")
const { Categoria } = require('../models');

const  crearCategoria = async ( req = request , res = response ) => {

    const nombre  = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.userLogged._id,
    }
    
    const categoria = new Categoria(data);

    //Guardar en DB
    await categoria.save();

    res.json(categoria);
}


module.exports = {
    crearCategoria
}