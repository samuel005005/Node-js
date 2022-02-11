const { response } = require("express");
const Role = require('../models/role');

const esAdminRole = async ( req , res = response, next ) => {

    if( !req.userLogged ){
        res.status(500).json({
            msg:'Se quiere verificar el rol sin validar el token primero'
        });
    }
    const { rol,  nombre } = req.userLogged;

    if( rol !== 'ADMIN_ROLE'){

      return  res.status(500).json({
            msg: `${ nombre } no es administrador - No tiene permiso para realizar esta accion`
        });
    }

    next();

}

const tieneRole = ( ...roles ) => {
   
    return ( req , res = response , next ) => {

        if( !req.userLogged ){
            return  res.status(500).json({
                msg:'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if( !roles.includes(req.userLogged.rol) ){
            return  res.status(401).json({
                msg: `No tiene permiso para realizar esta accion`
            });
        }
        
        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}