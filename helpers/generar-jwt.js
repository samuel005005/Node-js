
const jsonwebtoken = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const generarJWT = ( uid = '' ) => {

    return new Promise( ( resolve , reject ) => {
        const payload  = { uid };
        jsonwebtoken.sign( payload , process.env.SECRET_OR_PRIVATEKEY, {
            expiresIn: '4h',
        }, ( err , token) => {
            if(err){
                console.log(err);
                reject('No se puedo generar el token');
            } else {
                resolve(token);
            }
        });
        
    });
}

const comprobarJWT = async ( token = '') => {

    try {

        if(token.length <10 ){
            return null;
        }

     const { uid } = jsonwebtoken.verify(token, process.env.SECRET_OR_PRIVATEKEY);
  
     const usuario = await Usuario.findById( uid );

   
     if( usuario ){

        if(!usuario.estado){
            return null;
        }
         return usuario;
     } else {
         return null;
     }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
} ;
