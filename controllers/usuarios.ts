 import { Request , Response } from 'express';
 
 export const obtenerUsuarios = ( req: Request, res: Response ) => {  
    res.json({
        msg: " obtener Usuarios"
    })
 }

 export const obtenerUsuario = ( req: Request, res: Response ) => {
    const { id } = req.params;

    res.json({
        msg: "obtenerUsuario"
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