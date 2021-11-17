const fs = require('fs');

const crearArchivo = async (base = 1, listar = true, top = 12) => {

  try {

    let salida = '';

    for (let index = 1; index <= top; index++) {
        salida +=  `${base} x ${index} = ${ base * index}\n`
    }
    if(listar){
      console.log('===================');
      console.log('Tabla del :', base);
      console.log('===================');
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