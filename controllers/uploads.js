const { request, response } = require('express');
const path = require('path');

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
    
    /**
     * Si es un solo archivo
     */
     if ( !Array.isArray(archivos) ){

        const uploadPath = `${basePath}${archivos.name}`

        archivos.mv(uploadPath, (error) => {
            
            if(error){
                return res.status(500).json({error});
            }
    
            return res.json({
                msg: "Subido correctamente"
            })
        });

     }

     archivos.forEach(archivo => {

        const uploadPath =  `${basePath}${archivo.name}`;

        archivo.mv(uploadPath, (error) => {
            if(error){
                return res.status(500).json({error});
            }
    
        });
     });

     return res.json({
        msg: "Subidos correctamente"
    });
   
}


module.exports = {
    cargarArchivos
}