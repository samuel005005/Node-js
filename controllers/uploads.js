const { request, response } = require('express');

const { subirArchivo, ExtensionNoPermitida } = require('../helpers');


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
    const { id , coleccion } = req.params;
    
    return res.json({
        id,coleccion
    });

}


module.exports = {
    cargarArchivos,
    actualizarArchivo
}