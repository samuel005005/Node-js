const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const { googleVerify , generarJWT } = require("../helpers");
const { Usuario } = require('../models');


const login = async (req , res = response) =>  {

    const { correo, password } = req.body;
   

    try {
        // Validar si existe el email
        const usuario = await Usuario.findOne({ correo , estado : true});

        if( !usuario ){
            return res.status(400).json({
                msg: "Usuario o Password incorrecto"
            });
        }

        // Validar Si el usuario esta activo

        if( !usuario.estado ) {
            return res.status(400).json({
                msg: "Usuario o Password incorrecto - estado : false"
            });
        }
        
        // Validar la contrasena

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if( !validPassword ){
            return res.status(400).json({
                msg: "Usuario o Password incorrecto - password : false"
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );


        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            "msg":"Hable con el administrador",
        }); 
    }

}

const googleSignIn =  async ( req, res = response ) => {

    const { id_token } = req.body;

    try {

        const { correo, nombre, img }  =  await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ){

            const data = {
                nombre,
                correo,
                password : ':P',
                rol:'USER_ROLE',
                img,
                google:true
                
            }

            usuario = new Usuario( data );

            await usuario.save();

        }

        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Favor comuncarse con el administrador del sistema',   
            });   
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );
    
        res.json({
            token,
            usuario   
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error verificando el token'   
        })
    }
   
}

const renovarToken = async ( req = request, res = response) => {

    const { userLogged } = req;

            // Generar el JWT
    const token = await generarJWT( userLogged.id );

    return res.json({
        user: userLogged,
        token
    });
    
}


module.exports = {
    login,
    googleSignIn,
    renovarToken
}