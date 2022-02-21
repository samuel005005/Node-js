const { request, response } = require('express');
const path = require('path');
const { obtenerExtensionArchivo, ExtensionNoPermitida } = require('../helpers');
const { v4 : uuidv4 } = require('uuid');

const cargarArchivos = async (req = request, res = response) => {

    if( !req.files || Object.keys(req.files).length === 0 ){
        return res.status(400).json({
            msg: 'No hay archivos que subir'
        })
    }

    if( !req.files.archivos ){
        return res.status(400).json({
            msg: 'No hay archivos que subir'
        })
    }

    const basePath = path.join(__dirname, `../uploads/`);

    let { archivos } = req.files;


     /** Validar extension */
     const extensionesValidas = ['jpg','jpeg','csv','json'];

    /**
     * Si es un solo archivo
     */

    if ( !Array.isArray(archivos) ) {
        archivos = [ archivos ];
    }


    try {
        archivos.map( 
            (archivo) => {
                const  extension =   obtenerExtensionArchivo(archivo.name, extensionesValidas);

                if( !extensionesValidas.includes(extension)) {
                    throw new ExtensionNoPermitida(`La extension ${extension} no es permitida, validas : ${extensionesValidas}`);
                }   

                const nombreTemp = `${uuidv4()}.${extension}`;
    
                const uploadPath =  `${basePath}${nombreTemp}`;

                archivo.mv(uploadPath, (error) => {
                    if(error){
                        throw new Error(error)
                    }
                }); 
            }
            
        );  

        res.json({
            msg: "Subidos correctamente"
        });

    } catch (error) {

        if( error instanceof ExtensionNoPermitida){
            return res.status(400).json({
                msg: error.message
            });
        }else {
            res.status(500).json({
                msg: error.message
            });
        }
        
    }

}


module.exports = {
    cargarArchivos
}