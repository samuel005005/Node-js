
const jsonwebtoken = require('jsonwebtoken');

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

module.exports = generarJWT;
