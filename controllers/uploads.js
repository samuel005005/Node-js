const { request, response } = require('express');
const path = require('path');
const { obtenerExtensionArchivo, ExtensionNoPermitida } = require('../helpers');

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

    const { archivos } = req.files;


     /** Validar extension */
     const extensionesValidas = ['jpg','jpeg','csv','json'];
    /**
     * Si es un solo archivo
     */
     if ( !Array.isArray(archivos) ){

         const  msg =   obtenerExtensionArchivo(archivos.name, extensionesValidas);
         if( msg ){
            return res.status(400).json({ msg });
         }

        const uploadPath = `${basePath}${archivos.name}`

        archivos.mv(uploadPath, (error) => {
    
            if(error){
                return res.status(500).json({error});
            }
    
        });

        return  res.json({
            msg: "Subido correctamente"
        });

    } else {

        try {
            archivos.map( 
                (archivo) => {
                    const  msg =   obtenerExtensionArchivo(archivo.name, extensionesValidas);
                    if( msg ){ 
                        throw new ExtensionNoPermitida(msg)
                    } else {
                        const uploadPath =  `${basePath}${archivo.name}`;
    
                        archivo.mv(uploadPath, (error) => {
                            if(error){
                                throw new Error(error)
                            }
                        }); 
                    }
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

}


module.exports = {
    cargarArchivos
}