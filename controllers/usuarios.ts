 import { Request , Response } from 'express';
import Usuario from '../models/usuario';
 
 export const obtenerUsuarios =  async ( req: Request, res: Response ) => {  

    const usuarios = await Usuario.findAll();

    res.json({
        msg: " obtener Usuarios",
        usuarios
    })
 }

 export const obtenerUsuario = async ( req: Request, res: Response ) => {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if( !usuario ){
        return res.json({
            msg: `No existe usuario con el id ${id}`
        });
    }

    res.json({
        msg: "obtenerUsuario",
        usuario
    })
 }

 export const crearUsuario = ( req: Request, res: Response ) => {
    const { body } = req;
  
    res.json({
        msg: "crearUsuario",
        body
    })
 }
 
 export const actualizarUsuario = ( req: Request, res: Response ) => {

    const { id }    = req.params;
    const { body }  = req;

    res.json({
        msg: "actualizarUsuario",
        body
    })
 }
 
 export const borrarUsuario = ( req: Request, res: Response ) => {

    const { id }    = req.params;

    res.json({
        msg: "borrarUsuario",
        id
    })
 }