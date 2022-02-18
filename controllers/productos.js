const { request,response } = require("express")
const { Producto, Categoria } = require('../models');


const  crearProducto = async ( req = request , res = response ) => {

    const { nombre, usuario, categoria,  ...body  }  = req.body;


    const productoDB = await Producto.findOne({nombre:nombre.toUpperCase()});

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El Producto ${productoDB.nombre}, ya existe`
        });
    }

    const categoriaDB = await Categoria.findById(categoria);

    if ( !categoriaDB.estado ) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, esta inactiva`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre : nombre.toUpperCase(),
        usuario: req.userLogged._id,
        categoria,
        ...body
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

    const producto = await Producto
        .findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre'); 

    if( !producto.estado ){
        return res.status(400).json({
            msg:'Producto no disponible'
        });
    }

    res.json(producto);
}

const actualizarProducto = async ( req = request , res = response ) => {

    const { id  } = req.params;

    const { estado, usuario, ...data } = req.body;
    
    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.userLogged._id;

    if(data.categoria){

        const categoriaDB = await Categoria.findById({categoria: data.categoria , estado :true});

        if ( !categoriaDB ) {
            return res.status(400).json({
                msg: `La categoria, no existe`
            });
        }
    }

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true }).populate('usuario','nombre').populate('categoria','nombre');
    
    res.json(producto);
}

const borrarProducto = async ( req = request , res = response ) => {

    const { id  } = req.params;

    const producto = await Producto.findByIdAndUpdate(id,{estado : false}, { new: true });
    res.json(producto);

}

module.exports = {
    crearProducto,
    obtenerProductos,
    obteneProducto,
    actualizarProducto,
    borrarProducto
}