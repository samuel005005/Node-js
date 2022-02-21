const { response } = require("express");

const capitalizeWords = (string) => {
    return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

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

module.exports = {
    capitalizeWords,
    obtenerExtensionArchivo,
    ExtensionNoPermitida
}