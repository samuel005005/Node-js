const { response } = require("express");
const Role = require('../models/role');

const esAdminRole = async ( req , res = response, next ) => {

    if( !req.userLogged ){
        res.status(500).json({
            msg:'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { rol,  nombre } = req.userLogged;

    /** Leyendo el role en la base de datos */
    const { role }  = await Role.findById(rol);

    if( role !== 'ADMIN_ROLE'){

      return  res.status(500).json({
            msg: `${ nombre } no es administrador - No tiene permiso para realizar esta accion`
        });
    }

    next();

}


module.exports = {
    esAdminRole
}