const { response } = require("express");
const bcryptjs = require("bcryptjs");


const login = async (req , res = response) =>  {

    const { correo, password } = req.body;
    const Usuario = require('../models/user');

    try {
        // Validar si existe el email
        const usuario = await Usuario.findOne({ correo });


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


        res.json({
            "msg":"Login"
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "msg":"Hable con el administrador",
        }); 
    }

}


module.exports = {
    login
}