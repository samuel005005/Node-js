import { Router } from "express";
import { obtenerUsuarios, obtenerUsuario, crearUsuario, actualizarUsuario, borrarUsuario } 
from '../controllers/usuarios';

const router = Router();

router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuario);
router.post('/', crearUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', borrarUsuario);

export default router;