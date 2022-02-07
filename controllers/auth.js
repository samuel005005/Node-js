const { response } = require("express")


const login = (req , res = response) => {

    const { correo, password } = req.body;
    const Usuario = require('../models/user');

    try {

        // Validar si existe el email
        const usuario = Usuario.findOne({ correo });
        if( !usuario ){
            return res.status(400).json({
                msg: "Usuario o Password incorrecto"
            });
        }

        // Validar Si el usuario esta activo


        // Validar la contrasena


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