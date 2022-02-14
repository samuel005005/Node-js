const { request,response } = require("express")
const { Producto, Categoria } = require('../models');


const  crearProducto = async ( req = request , res = response ) => {

    const { nombre , precio, categoria, descripcion }  = req.body;

    const categoriaDB = await Categoria.findById(categoria);

    if ( !categoriaDB.estado ) {
        return res.status(400).json({
            msg: `La categoria ${categoria}, esta inactiva`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.userLogged._id,
        precio,
        categoria: categoriaDB,
        descripcion
    }
    
    const producto = new Producto(data);

    //Guardar en DB
    await producto.save();

    res.json(producto);
}

const obtenerProductos = async ( req = request , res = response ) => {

    const { limite = 5 , desde = 0 } = req.query;
    const query = { estado : true };

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.json({
        total,
        productos
    });

}

const obteneProducto = async ( req = request , res = response ) => {

    const { id  } = req.params;

    const categoria = await Producto
        .findById(id)
        .populate('usuario', 'nombre');

    if( !categoria.estado ){
        return res.status(400).json({
            msg:'Categoria no disponible'
        });
    }

    res.json(categoria);
}

const actualizarProducto = async ( req = request , res = response ) => {

    const { id  } = req.params;

    const { estado, usuario, ...data } = req.body;
    
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.userLogged._id;

    const categoria = await Producto.findByIdAndUpdate(id, data, { new: true }).populate('usuario','nombre');
    
    res.json(categoria);
}

const borrarProducto = async ( req = request , res = response ) => {

    const { id  } = req.params;

    const categoria = await Producto.findByIdAndUpdate(id,{estado : false}, { new: true }).populate('usuario','nombre');

    res.json(categoria);

}

module.exports = {
    crearProducto,
    obtenerProductos,
    obteneProducto,
    actualizarProducto,
    borrarProducto
}