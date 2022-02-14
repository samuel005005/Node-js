const { request,response } = require("express")
const { Categoria, Test } = require('../models');



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

const obtenerCategorias = async ( req = request , res = response ) => {

    const { limite = 5 , desde = 0 } = req.query;
    const query = { estado : true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.json({
        total,
        categorias
    });

}

const obtenerCategoria = async ( req = request , res = response ) => {

    const { id  } = req.params;

    const categoria = await Categoria
        .findById(id)
        .populate('usuario', 'nombre');

    if( !categoria.estado ){
        return res.status(400).json({
            msg:'Categoria no disponible'
        });
    }

    res.json(categoria);
}

const actualizarCategoria = async ( req = request , res = response ) => {

    const { id  } = req.params;

    const { estado, usuario, ...data } = req.body;
    
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.userLogged._id;

    const existCategoria = await Categoria.findOne({ nombre: data.nombre });

    if( existCategoria ){
        return  res.status(400).json({
            msg:'Esta categoria ya existe'
        }); 
    }

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true }).populate('usuario','nombre');
    
    res.json(categoria);
}

const borrarCategoria = async ( req = request , res = response ) => {

    const { id  } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id,{estado : false}, { new: true }).populate('usuario','nombre');

    res.json(categoria);

}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}