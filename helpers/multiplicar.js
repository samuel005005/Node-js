const fs = require('fs');
const  colors = require('colors');

const crearArchivo = async (base = 1, listar = true, top = 12) => {

  try {

    let salida = '';

    for (let index = 1; index <= top; index++) {
        salida +=  `${base} x ${index} = ${ base * index}\n`
    }
    if(listar){
      console.log('==================='.green);
      console.log('Tabla del :'.green, colors.blue(base));
      console.log('==================='.green);
      console.log(salida);
    }

    const nombreArchivo = `tabla-${base}.txt`;
    fs.writeFileSync(nombreArchivo,salida);

    return nombreArchivo;
  } catch (error) {
      throw error;
  }
}

module.exports = {
    crearArchivo
};