const { request, response } = require('express');
const path = require('path');
const fs = require('fs');

const { subirArchivo, ExtensionNoPermitida } = require('../helpers');
const { Usuario, Producto } = require('../models');


const cargarArchivos = async (req = request, res = response) => {
 
    try {

        const { archivos } = req.files;
        const nombre = await subirArchivo(archivos, undefined, 'imgs');

        return res.json({ nombre });

    } catch (error) {
        if( error instanceof ExtensionNoPermitida){
            return res.status(400).json({
                msg: error.message
            });
        } else {
            console.log(error);
            return res.status(500).json({
                msg: "Error cargando el archivo"
            });
        }
    }

}

const actualizarArchivo = async (req = request, res = response) => {

    try {
        const { id , coleccion } = req.params;
        let modelo;
        
        switch (coleccion) {
            case 'usuarios':
                modelo = await Usuario.findById(id);
                if( !modelo ){
                    return res.json({
                        msg: `No existe un usuario con el id ${id}`
                    });
                }
                break; 
            case 'productos':
                modelo = await Producto.findById(id);
                if( !modelo ){
                    return res.json({
                        msg: `No existe un producto con el id ${id}`
                    });
                }
                break;
            default:
                return  res.status(500).json({
                    msg: `Coleccion no implementada`
                });
        }

        if( modelo.img ){
            // Borrar img servidor
            const pathImg = path.join(__dirname ,'../uploads/', coleccion, modelo.img);
            if ( fs.existsSync(pathImg) ){
                fs.unlinkSync(pathImg);
            }
        }

        const nombre = await subirArchivo(req.files.archivos, undefined, coleccion);

        modelo.img = nombre;
        await modelo.save();

        return res.json(modelo);

    } catch (error) {
        if( error instanceof ExtensionNoPermitida){
            return res.status(400).json({
                msg: error.message
            });
        } else {
            console.log(error);
            return res.status(500).json({
                msg: "Error cargando el archivo"
            });
        }
    }
}


module.exports = {
    cargarArchivos,
    actualizarArchivo
}