const { v4 : uuidv4 } = require('uuid');
const path = require('path');


const obtenerExtensionArchivo = (nombreArchivo = '') => {

    const nombreCortado = nombreArchivo.split('.');
    const extension = nombreCortado[ nombreCortado.length - 1];
    return extension;
 
}

class ExtensionNoPermitida extends Error {

    constructor(message) {
      super(message);
      this.name = "ExtensionNoPermitida";
    }
}


const subirArchivo = ( archivos, extensionesValidas = ['jpg','jpeg','csv','json'], carpeta = '' ) => {

   return new Promise( (resolve, reject)  => {

        const  extension =   obtenerExtensionArchivo(archivos.name, extensionesValidas);

        if( !extensionesValidas.includes(extension)) {
            return reject (new ExtensionNoPermitida(`La extension ${extension} no es permitida, validas : ${extensionesValidas}`)) ;
        }   

        const nombreTemp = `${uuidv4()}.${extension}`;
        const uploadPath = path.join(__dirname, `../uploads/`, carpeta , nombreTemp);

        archivos.mv(uploadPath, (err) => {
            if(err){
                return reject (err)
            }

            resolve(nombreTemp);
        }); 
        
    });
}


module.exports = {
    subirArchivo,
    obtenerExtensionArchivo,
    ExtensionNoPermitida
}